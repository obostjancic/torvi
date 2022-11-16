import { Injectable, Logger } from '@nestjs/common';
import { ExtractionStrategy } from '../strategy.interface';
import { JSONAPIConfig, JSONAPIResult } from './json-api.interface';

@Injectable()
export class MockJSONAPIStrategy implements ExtractionStrategy<JSONAPIResult> {
  private readonly logger: Logger = new Logger(MockJSONAPIStrategy.name);

  constructor(private readonly config: JSONAPIConfig) {}

  async run(): Promise<JSONAPIResult[]> {
    return [];
  }
}
