import { Injectable } from '@nestjs/common';
import { groupBy } from 'src/extraction/strategies/grill-area/grill-area.utils';
import { RefinementOperatorType } from '../config.entity';

@Injectable()
export class OperatorFactory {
  public apply(results, operator) {
    if (operator.type === RefinementOperatorType.Group) {
      return this.group(results, operator.by);
    } else if (operator.type === RefinementOperatorType.Filter) {
      return this.filter(results, operator.by, operator.value);
    } else if (operator.type === RefinementOperatorType.Persist) {
      return results;
    }
  }

  private group(results: any[], by: string) {
    const otherKeys = Object.keys(results[0]).filter((key) => key !== by);
    const groupedArr = Object.values(groupBy(results, by));

    return groupedArr.map((group: any[]) => {
      return group.reduce(
        (acc, curr) => {
          otherKeys.forEach((key) => {
            const pluralKey = `${key}s`;
            acc[pluralKey] = acc[pluralKey] || [];
            acc[pluralKey].push(curr[key]);
          });
          return acc;
        },
        { [by]: group[0][by] },
      );
    });
  }

  private filter(results: any[], by: string, value: string) {
    return results.filter((result) => result[by] === value);
  }
}
