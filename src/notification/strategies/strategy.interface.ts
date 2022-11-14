export interface Strategy {
  run: (results: any[]) => Promise<void>;
}
