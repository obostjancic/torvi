export enum ExtractionSourceType {
  GrillArea = 'grill-area',
}

export class ExtractionSource {
  id: number;
  name: string;
  type: ExtractionSourceType;
  config: Record<string, any>;
}

export class ExtractionConfig {
  sources: ExtractionSource[];
}
