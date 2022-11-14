export interface ExtractionStrategy<T> {
  run: () => Promise<T[]>;
}
