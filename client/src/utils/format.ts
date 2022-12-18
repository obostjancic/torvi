import { format } from 'date-fns';

export const formatDate = (date: Date): string => format(date, 'dd.MM.yyyy');

export const formatJSON = (json: Record<string, any>): string => JSON.stringify(json, null, 2);
