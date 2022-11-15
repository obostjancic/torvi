export type ExtractionResult = {
  id: number;
};

export interface ExtractionStrategy<T extends ExtractionResult> {
  run: () => Promise<T[]>;
}
