import { DiffOperatorOpts } from './operators/diff.operator';
import { FilterOperatorOpts } from './operators/filter.operator';
import { GroupOperatorOpts } from './operators/group.operator';
import { SortOperatorOpts } from './operators/sort.operator';

export type RefinementOperator<T = any> =
  | GroupOperatorOpts<T>
  | FilterOperatorOpts<T>
  | DiffOperatorOpts
  | SortOperatorOpts<T>;
export class RefinementConfig {
  operators: RefinementOperator[] = [];
}
