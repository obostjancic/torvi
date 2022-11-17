import { Injectable, Logger } from '@nestjs/common';
import { ExtractionStrategy } from '../strategy.interface';
import { ElementHandle } from '@playwright/test';
import { Page } from 'playwright';
import {
  datesForMonth,
  getMonthNamesInInterval,
  mergeResults,
  splitIntoNumAndLocation,
  text,
  toDate,
  toString,
} from 'src/extraction/strategies/grill-area/grill-area.utils';
import { GrillAreaConfig, GrillAreaResult } from './grill-area.interface';
import { format } from 'date-fns';
import { sleep } from 'src/common/common.utils';

// FIXME clean all of this up

@Injectable()
export class GrillAreaStrategy implements ExtractionStrategy<GrillAreaResult> {
  private readonly logger: Logger = new Logger(GrillAreaStrategy.name);

  constructor(private readonly config: GrillAreaConfig, private readonly page: Page) {}

  async run(): Promise<GrillAreaResult[]> {
    try {
      const from = new Date(this.config.from);
      const to = new Date(this.config.to);

      const areas = await this.fetchCurrentState(from, to);

      const flatData = areas
        .map((area) =>
          area.days.map((day) => ({
            id: area.id,
            area: area.id,
            day,
          })),
        )
        .flat();

      const filteredData = flatData
        .filter(({ id, day }) => day >= from && day <= to && this.config.areas.includes(id))
        .map(({ id, day, area }) => ({ id, day: format(day, 'yyyy-MM-dd'), area }));

      return filteredData.map((res) => JSON.parse(JSON.stringify(res)));
    } catch (e) {
      console.log('Error fetching grill areas', e);
      throw e;
    }
  }

  public async fetchCurrentState(from, to) {
    this.logger.log('Fetching https://mein.wien.gv.at/grillplatz');
    const results = [];

    for (const month of getMonthNamesInInterval(from, to)) {
      const { from, to } = datesForMonth(month);
      const areaResults = await this.checkAllAreas(from, to);
      results.push(areaResults);
    }
    const result = results.flat();
    return mergeResults(result) as any[];
  }

  private async checkAllAreas(from: Date, to: Date) {
    const grillPlatzReserveUrl = 'https://mein.wien.gv.at/grillplatz/internet/Startseite.aspx';
    await this.page.goto(grillPlatzReserveUrl, {
      waitUntil: 'networkidle',
    });

    // select any area
    await sleep();
    const anyAreaButtonId = '#btngroupBottom_cmdIrgendeinGrillplatz_input';
    const anyArea = await this.page.$(anyAreaButtonId);
    await anyArea.click();
    await this.page.waitForLoadState('networkidle');

    // fill start date
    await sleep();
    const startDateId = '#Groupofcontrols1_txtDatumVon_input';
    const startDateElement = await this.page.$(startDateId);
    await fillDate(startDateElement, from);

    // fill end date
    const endDateId = '#Groupofcontrols1_txtDatumBis_input';
    const endDateElement = await this.page.$(endDateId);
    await fillDate(endDateElement, to);

    //  proceed
    await sleep();
    const proceedButtonId = '#grp1_cmdWeiter_input';
    const proceedButton = await this.page.$(proceedButtonId);
    await proceedButton.click();
    await this.page.waitForLoadState('networkidle');

    const areaResults = await this.collectAreaResults();

    this.logger.log(`Found ${areaResults.length} results for interval: ${toString(from)} - ${toString(to)}`);

    return areaResults;
  }

  private async collectAreaResults() {
    await sleep();
    const areaOpts = await this.page.$$('#GroupGrillplatz_cboGrillplatz_input > option');
    await sleep();

    const results = [];
    for (const areaOptIdx of areaOpts.map((_, i) => i)) {
      if (areaOptIdx > 2) continue;
      // console.log(`Checking areas ${areaOptIdx + 1}/${areaOpts.length}`);

      // switch to area
      await sleep();
      await this.page.waitForLoadState('networkidle');
      await sleep();

      // select area in dropdown
      const areaDropdownId = '#GroupGrillplatz_cboGrillplatz_input';
      const areaDropdown = await this.page.$(areaDropdownId);
      await areaDropdown.scrollIntoViewIfNeeded();
      await areaDropdown.click();
      await areaDropdown.selectOption({ index: areaOptIdx });

      // click on confirm button
      const confirmButtonId = '#GroupGrillplatz_cmdGrillplatz_input';
      const confirmButton = await this.page.$(confirmButtonId);
      await confirmButton.click();

      await this.page.waitForLoadState('networkidle');

      await sleep();
      // get name of area
      const selectedArea = await text(
        this.page.$("#GroupGrillplatz_cboGrillplatz_input > option[selected='selected']"),
      );
      await sleep();

      // extract available dates from calendar
      const calenderTable = await this.page.$('#GroupKalender_calH');
      const days = await calenderTable.$$("tbody > tr > td > a[style*='color:Black']");

      const daysStr = await Promise.all(days.map(async (day) => toDate(await day.getAttribute('title'))));

      const { areaNumber } = splitIntoNumAndLocation(selectedArea);

      results.push({
        id: Number(areaNumber),
        days: daysStr,
      });
    }

    return results;
  }
}

export const fillDate = async (dateElement: ElementHandle, targetDate: Date) => {
  await dateElement.scrollIntoViewIfNeeded();
  await dateElement.click();
  await dateElement.fill('');
  await dateElement.type(toString(targetDate));
  await dateElement.press('Enter', { delay: 100 });
};
