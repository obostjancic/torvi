export const SortOperatorType = 'srt';

export type SortOperatorOpts<T> = {
  by?: keyof T;
  direction?: 'asc' | 'desc';
  type: typeof SortOperatorType;
};

export type SortOperator<T> = (results: T[], opts?: Omit<SortOperatorOpts<T>, 'type'>) => T[];

export const sort: SortOperator<any> = (results, opts = { by: 'id', direction: 'asc' }) => {
  return results.sort((a, b) => {
    if (a[opts.by] < b[opts.by]) {
      return opts.direction === 'asc' ? -1 : 1;
    }
    if (a[opts.by] > b[opts.by]) {
      return opts.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};
