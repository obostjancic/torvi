import { GrillAreaSource } from './strategies/grill-area/grill-area.interface';
import { JSONAPISource } from './strategies/json-api/json-api.interface';

export interface ExtractionSourceInterface {
  id: string;
  name: string;
  config: Record<string, any>;
}

export type ExtractionSource = GrillAreaSource | JSONAPISource;

export type ExtractionConfig = {
  sources: ExtractionSource[];
};
