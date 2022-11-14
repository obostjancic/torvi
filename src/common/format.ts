import { format } from 'date-fns';

export const formatDate = (date: Date = new Date()) => format(date, 'dd.MM.yyyy');

export const formatDatetime = (date: Date = new Date()) => format(date, 'dd.MM.yyyy HH:mm');

export const formatDay = (day: any) => {
  return {
    ...day,
    date: formatDate(day.date),
    createdAt: formatDate(day.createdAt),
    updatedAt: formatDate(day.updatedAt),
  };
};
