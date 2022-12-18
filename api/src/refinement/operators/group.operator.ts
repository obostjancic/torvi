import { groupBy } from '../../extraction/strategies/grill-area/grill-area.utils';

export const GroupOperatorType = 'group';

export type GroupOperatorOpts<T> = {
  type: typeof GroupOperatorType;
  by: keyof T;
};

export type GroupOperator<T> = (results: T[], opts: GroupOperatorOpts<T>) => T[];

export const group: GroupOperator<any> = (results, opts) => {
  if (!results.length) {
    return [];
  }

  const otherKeys = Object.keys(results[0]).filter((key) => key !== opts.by && key !== 'id');
  const groupedArr = Object.values(groupBy(results, opts.by));

  return groupedArr.map((group: unknown[]) => {
    return group.reduce(
      (acc: any, curr) => {
        otherKeys.forEach((key: any) => {
          const pluralKey = `${key}s`;
          acc[pluralKey] = acc[pluralKey] || [];
          acc[pluralKey].push(curr[key]);
        });
        return acc;
      },
      { [opts.by]: group[0][opts.by] },
    );
  });
};
