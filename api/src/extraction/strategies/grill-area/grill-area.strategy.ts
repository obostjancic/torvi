import { Injectable, Logger } from '@nestjs/common';
import { ElementHandle } from '@playwright/test';
import { format } from 'date-fns';
import { Browser, Page } from 'playwright';
import { retry, sleep } from '../../../common/common.utils';
import { ExtractionStrategy } from '../strategy.interface';
import { GrillAreaConfig, GrillAreaResult } from './grill-area.interface';
import {
  datesForMonth,
  getMonthNamesInInterval,
  splitIntoNumAndLocation,
  text,
  toDate,
  toString,
  filterInterval,
  filterWeekdays,
} from './grill-area.utils';

@Injectable()
export class GrillAreaStrategy implements ExtractionStrategy<GrillAreaResult> {
  private readonly logger: Logger = new Logger(GrillAreaStrategy.name);

  constructor(private readonly config: GrillAreaConfig, private readonly browser: Browser) {}

  async run(): Promise<GrillAreaResult[]> {
    try {
      this.normalizeConfig();

      const areas = await retry(() => {
        return this.fetchCurrentState();
      });

      return areas
        .flat()
        .filter(({ day }) => {
          return filterInterval(this.config.from, this.config.to, day) && filterWeekdays(this.config.weekdays, day);
        })
        .map(({ id, day, area }) => JSON.parse(JSON.stringify({ id, day: format(day, 'yyyy-MM-dd'), area })));
    } catch (e) {
      this.logger.log('Error fetching grill areas', e);
      throw e;
    }
  }

  private normalizeConfig() {
    this.config.from = new Date(this.config.from);
    this.config.to = new Date(this.config.to);
  }

  private async fetchCurrentState() {
    const page = await this.browser.newPage();
    try {
      this.logger.log('Fetching https://mein.wien.gv.at/grillplatz');
      const results = [];
      const { from, to } = this.config;

      for (const month of getMonthNamesInInterval(from, to)) {
        const areaResults = await this.checkAreas(page, month);
        results.push(areaResults);
      }

      return results.flat();
    } catch (e) {
      this.logger.log('Error fetching grill areas', e);
      throw e;
    } finally {
      page.close();
    }
  }

  private async checkAreas(page: Page, month: string) {
    const { from, to } = datesForMonth(month);
    const grillPlatzReserveUrl = 'https://mein.wien.gv.at/grillplatz/internet/Startseite.aspx';
    await page.goto(grillPlatzReserveUrl, {
      waitUntil: 'networkidle',
    });

    // select areas
    await sleep();
    const rows = await page.$$('#BuchbareGrillplaetze_grpGrid_gdResult > tbody > tr');
    rows.shift();
    for (const area of rows) {
      const areaRow = await area.$$('td');
      const areaCheckbox = await areaRow[0].$('input');
      const areaNumber = Number(await areaRow[1].innerText());
      if (this.config.areas.includes(areaNumber)) {
        await areaCheckbox.click();
      }
    }

    await sleep();
    const selectAreasButtonId = '#btngroupBottom_cmdSelectGrillplatz_input';
    const selectAreas = await page.$(selectAreasButtonId);
    await selectAreas.click();
    await page.waitForLoadState('networkidle');

    // fill start date
    await sleep();
    const startDateId = '#Groupofcontrols1_txtDatumVon_input';
    const startDateElement = await page.$(startDateId);
    await fillDate(startDateElement, from);

    // fill end date
    const endDateId = '#Groupofcontrols1_txtDatumBis_input';
    const endDateElement = await page.$(endDateId);
    await fillDate(endDateElement, to);

    //  proceed
    await sleep();
    const proceedButtonId = '#grp1_cmdWeiter_input';
    const proceedButton = await page.$(proceedButtonId);
    await proceedButton.click();
    await page.waitForLoadState('networkidle');

    const areaResults = await this.collectAreaResults(page);

    this.logger.log(`Found ${areaResults.length} results for interval: ${toString(from)} - ${toString(to)}`);

    return areaResults;
  }

  private async collectAreaResults(page: Page) {
    await sleep();
    const areaOpts = await page.$$('#GroupGrillplatz_cboGrillplatz_input > option');
    await sleep();

    let results = [];
    for (const areaOptIdx of areaOpts.map((_, i) => i)) {
      // switch to area
      await sleep();
      await page.waitForLoadState('networkidle');
      await sleep();

      // select area in dropdown
      const areaDropdownId = '#GroupGrillplatz_cboGrillplatz_input';
      const areaDropdown = await page.$(areaDropdownId);
      await areaDropdown.scrollIntoViewIfNeeded();
      await areaDropdown.click();
      await areaDropdown.selectOption({ index: areaOptIdx });

      // click on confirm button
      const confirmButtonId = '#GroupGrillplatz_cmdGrillplatz_input';
      const confirmButton = await page.$(confirmButtonId);
      await confirmButton.click();

      await page.waitForLoadState('networkidle');

      await sleep();
      // get name of area
      const selectedArea = await text(page.$("#GroupGrillplatz_cboGrillplatz_input > option[selected='selected']"));
      await sleep();

      // extract available dates from calendar
      const calenderTable = await page.$('#GroupKalender_calH');
      const days = await calenderTable.$$("tbody > tr > td > a[style*='color:Black']");

      const { areaNumber } = splitIntoNumAndLocation(selectedArea);

      const daysArr = await Promise.all(
        days.map(async (day) => {
          const date = toDate(await day.getAttribute('title'));
          return { id: areaNumber, day: date, area: areaNumber };
        }),
      );

      results = results.concat(daysArr);
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
