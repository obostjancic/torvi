import { ExtractionResult } from '../strategy.interface';

export const JSONAPISourceType = 'json-api';

export type JSONAPIConfig = {
  url: string;
  headers?: Record<string, string>;
  options?: {
    params?: Record<string, string>;
  };
};

export type JSONAPISource = {
  type: typeof JSONAPISourceType;
  config: JSONAPIConfig;
};

export type JSONAPIResult = ExtractionResult;
