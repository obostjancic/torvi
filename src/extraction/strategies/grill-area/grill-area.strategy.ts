import { Injectable, Logger } from '@nestjs/common';
import { ExtractionStrategy } from '../strategy.interface';
import { ElementHandle } from '@playwright/test';
import { Page } from 'playwright';
import { datesForMonth, mergeResults, splitIntoNumAndLocation, text, toDate, toString } from 'src/common/utils';

// FIXME clean all of this up

interface GrillAreaResult {
  area: number;
  day: Date;
}

type Area = any;

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const getMonthNamesInInterval = (start: Date, end: Date) => {
  const months: string[] = [];
  const date = new Date(start);
  while (date <= end) {
    months.push(date.toLocaleString('default', { month: 'long' }).toLowerCase());
    date.setMonth(date.getMonth() + 1);
  }
  return months;
};

@Injectable()
export class GrillAreaStrategy implements ExtractionStrategy<GrillAreaResult> {
  private readonly logger: Logger = new Logger(GrillAreaStrategy.name);

  constructor(private readonly config: Record<string, any>, private readonly page: Page) {}

  async run() {
    try {
      const from = new Date(this.config.from);
      const to = new Date(this.config.to);

      const areas = await this.fetchCurrentState(from, to);

      const flatData = areas
        .map((area) =>
          area.days.map((day) => ({
            area: area.id,
            day,
          })),
        )
        .flat();

      const filteredData = flatData.filter(
        ({ area, day }) => day >= from && day <= to && this.config.areas.includes(area),
      );

      return filteredData;
    } catch (e) {
      console.log('Error fetching grill areas', e);
      return [];
    }
  }

  public async fetchCurrentState(from, to) {
    this.logger.log('Fetching real');
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
    await this.page.goto('https://mein.wien.gv.at/grillplatz/internet/Startseite.aspx', {
      waitUntil: 'networkidle',
    });

    await selectAnyArea(this.page);
    await fillStartDate(this.page, from);
    await fillEndDate(this.page, to);
    await proceed(this.page);

    const areaResults = await this.collectAreaResults();

    this.logger.log(`Found ${areaResults.length} results for interval: ${toString(from)} - ${toString(to)}`);

    return areaResults;
  }

  private async collectAreaResults() {
    await sleep();
    const areaOpts = await this.page.$$('#GroupGrillplatz_cboGrillplatz_input > option');
    await sleep();
    const results: Area[] = [];
    for (const areaOptIdx of areaOpts.map((_, i) => i)) {
      // console.log(`Checking areas ${areaOptIdx + 1}/${areaOpts.length}`);
      await sleep();
      await switchToArea(this.page, areaOptIdx);
      results.push(await this.checkArea());
    }
    return results;
  }

  checkArea = async (): Promise<Area> => {
    await sleep();
    const selectedArea = await text(this.page.$("#GroupGrillplatz_cboGrillplatz_input > option[selected='selected']"));
    await sleep();
    // const areaSummary = await text(this.page.$('#GroupKalender_lblH'));

    const daysStr = await extractAvailableDays(this.page);
    const { areaNumber } = splitIntoNumAndLocation(selectedArea);

    return {
      id: Number(areaNumber),
      days: daysStr,
    };
  };
}

export const selectAnyArea = async (page: Page) => {
  await sleep();
  const anyArea = await page.$('#btngroupBottom_cmdIrgendeinGrillplatz_input');
  await anyArea.click();
  await page.waitForLoadState('networkidle');
};

export const fillStartDate = async (page: Page, targetDate: Date) => {
  await sleep();
  const startDateElement = await page.$('#Groupofcontrols1_txtDatumVon_input');
  await fillDate(startDateElement, targetDate);
};

export const fillEndDate = async (page: Page, targetDate: Date) => {
  const endDateElement = await page.$('#Groupofcontrols1_txtDatumBis_input');
  await fillDate(endDateElement, targetDate);
};

export const fillDate = async (dateElement: ElementHandle, targetDate: Date) => {
  await dateElement.scrollIntoViewIfNeeded();
  await dateElement.click();
  await dateElement.fill('');
  await dateElement.type(toString(targetDate));
  await dateElement.press('Enter', { delay: 100 });
};

export const proceed = async (page: Page) => {
  await sleep();
  const weiter = await page.$('#grp1_cmdWeiter_input');
  await weiter.click();
  await page.waitForLoadState('networkidle');
};

export const switchToArea = async (page: Page, index: number) => {
  await sleep();
  await page.waitForLoadState('networkidle');
  await sleep();

  const dropdown = await page.$('#GroupGrillplatz_cboGrillplatz_input');
  await dropdown.scrollIntoViewIfNeeded();
  await dropdown.click();
  await dropdown.selectOption({ index });

  const confirm = await page.$('#GroupGrillplatz_cmdGrillplatz_input');
  await confirm.click();

  await page.waitForLoadState('networkidle');
};

export const extractAvailableDays = async (page: Page) => {
  const calenderTable = await page.$('#GroupKalender_calH');
  const days = await calenderTable.$$("tbody > tr > td > a[style*='color:Black']");

  const daysStr = await Promise.all(days.map(async (day) => toDate(await day.getAttribute('title'))));

  return daysStr;
};
