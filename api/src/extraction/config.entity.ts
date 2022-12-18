import { GrillAreaSource } from './strategies/grill-area/grill-area.interface';
import { JSONAPISource } from './strategies/json-api/json-api.interface';
import { WillhabenSource } from './strategies/willhaben/willhaben.interface';

export interface ExtractionSourceInterface {
  id: string;
  name: string;
  config: Record<string, any>;
}

export type ExtractionSource = GrillAreaSource | JSONAPISource | WillhabenSource;

export type ExtractionConfig = {
  sources: ExtractionSource[];
};
