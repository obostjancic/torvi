import { ExtractionResult } from '../strategy.interface';

export const GrillAreaSourceType = 'grill-area';

export type GrillAreaConfig = {
  from: Date;
  to: Date;
  areas: number[];
};

export type GrillAreaSource = {
  type: typeof GrillAreaSourceType;
  config: GrillAreaConfig;
};

export type GrillAreaResult = ExtractionResult & {
  area: number;
  day: Date;
};
