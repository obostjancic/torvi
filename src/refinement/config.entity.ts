import { FilterOperatorOpts } from './operators/filter.operator';
import { GroupOperatorOpts } from './operators/group.operator';
import { PersistrOperatorOpts } from './operators/persist.operator';

export type RefinementOperator<T = any> = GroupOperatorOpts<T> | FilterOperatorOpts<T> | PersistrOperatorOpts;
export class RefinementConfig {
  operators: RefinementOperator[] = [];
}
