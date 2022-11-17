import { DiffOperatorOpts } from './operators/diff.operator';
import { FilterOperatorOpts } from './operators/filter.operator';
import { GroupOperatorOpts } from './operators/group.operator';

export type RefinementOperator<T = any> = GroupOperatorOpts<T> | FilterOperatorOpts<T> | DiffOperatorOpts;
export class RefinementConfig {
  operators: RefinementOperator[] = [];
}
