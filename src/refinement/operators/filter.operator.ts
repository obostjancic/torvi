export const FilterOperatorType = 'filter';

export type FilterOperatorOpts<T> = {
  by: keyof T;
  value: T[keyof T];
  type: typeof FilterOperatorType;
};

export type FilterOperator<T> = (results: T[], opts: FilterOperatorOpts<T>) => T[];

export const filter: FilterOperator<any> = (results, opts) => {
  return results.filter((result) => result[opts.by] === opts.value);
};
