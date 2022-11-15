import { ExtractionResult } from '../strategy.interface';

export type GrillAreaConfig = {
  from: Date;
  to: Date;
  areas: number[];
};

export interface GrillAreaResult extends ExtractionResult {
  day: Date;
}
