export enum RefinementOperatorType {
  Persist = 'persist',
}

export class RefiementOperator {
  type: RefinementOperatorType;
}

export class RefinementConfig {
  operators: RefiementOperator[] = [];
}
