export type ExtractionResult = Record<string, any>;

export interface ExtractionStrategy<T extends ExtractionResult> {
  run: () => Promise<T[]>;
}
