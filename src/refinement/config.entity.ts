export enum RefinementOperatorType {
  Persist = 'persist',
  Group = 'group',
  Filter = 'filter',
}

export class RefinementOperator {
  type: RefinementOperatorType;
}

export class RefinementConfig {
  operators: RefinementOperator[] = [];
}
