import { format, parse } from 'date-fns';
import { de } from 'date-fns/locale';
// TODO: clean up
export type AreaResult = {
  numOfDaysAvailable: number;
  days: Date[];
  location: string;
  areaNumber: string;
};

export const toDate = (dayStr: string) => {
  const parsedDay = parse(dayStr, 'dd. LLLL', 0, { locale: de });
  parsedDay.setFullYear(2022);

  return parsedDay;
};

export const splitIntoNumAndLocation = (str: string) => {
  const [areaNumber, location] = str.split('(');
  return {
    areaNumber: Number(areaNumber.slice(6).trim()),
    location: location.trim().replace(')', ''),
  };
};

export const numOfDaysAvailable = (str: string) => {
  const extractedDays = str
    .split('möglich')[0]
    .match(/\d+|\./g)
    .join('');

  if (extractedDays.includes('2022')) {
    return 1;
  }
  return Number(extractedDays);
};

export const text = async (promise) => promise.then((el) => el?.innerText());

export const toString = (date: Date) => format(date, 'dd.MM.yyyy', { locale: de });

export const groupBy = <T>(array: T[], key: keyof T) => {
  return array.reduce((acc, item) => {
    (acc[item[key]] = acc[item[key]] || []).push(item);
    return acc;
  }, {} as any);
};

export const mergeResults = (results: any[][]) => {
  const grouped: Record<string, any[]> = groupBy(results.flat(), 'id');

  return Object.values(grouped).map((areaResults): any => ({
    id: areaResults[0].id,
    days: areaResults.reduce((acc, curr) => [...acc, ...curr.days], []),
  }));
};

export const datesForMonth = (month: string) => {
  const intervalMap = {
    june: {
      from: new Date('06-01-2022'),
      to: new Date('06-30-2022'),
    },
    july: {
      from: new Date('07-01-2022'),
      to: new Date('07-31-2022'),
    },
    august: {
      from: new Date('08-01-2022'),
      to: new Date('08-31-2022'),
    },
    september: {
      from: new Date('09-01-2022'),
      to: new Date('09-30-2022'),
    },
    october: {
      from: new Date('10-01-2022'),
      to: new Date('10-31-2022'),
    },
    november: {
      from: new Date('11-01-2022'),
      to: new Date('11-30-2022'),
    },
    december: {
      from: new Date('12-01-2022'),
      to: new Date('12-31-2022'),
    },
    january: {
      from: new Date('01-01-2023'),
      to: new Date('01-31-2023'),
    },
  };

  return intervalMap[month];
};

export const shortDate = (date: Date) => {
  return padLeft(format(new Date(date), 'EEE - dd.MMM '), 13);
};

export const firstDays = (dates: Date[]) => {
  return dates.slice(0, 3).map(shortDate);
};

export const padLeft = (str: string, length = 6, pad = ' '): string => {
  return str.length >= length ? str : padLeft(pad + str, length, pad);
};

export const getMonthNamesInInterval = (start: Date, end: Date) => {
  const months: string[] = [];
  const date = new Date(start);
  while (date <= end) {
    months.push(date.toLocaleString('default', { month: 'long' }).toLowerCase());
    date.setMonth(date.getMonth() + 1);
  }
  return months;
};

export const filterInterval = (from: Date, to: Date, day: Date) => {
  return day >= from && day <= to;
};

export const filterWeekdays = (weekdays: string[], day: Date) => {
  if (weekdays?.length && !weekdays.includes(format(day, 'eeee').toLowerCase())) {
    return false;
  }
  return true;
};
