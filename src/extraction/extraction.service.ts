import { Injectable, Logger } from '@nestjs/common';
import { Search } from '../search/entities/search.entity';
import { StrategyFactory } from './strategies/strategy.factory';

@Injectable()
export class ExtractionService {
  private readonly logger: Logger = new Logger(ExtractionService.name);

  constructor(private readonly strategies: StrategyFactory) {}

  async extract(search: Search) {
    const { sources } = search.config.extraction;
    try {
      this.logger.log(`Running extraction: ${sources.map((s) => s.type)}`);

      const results = await Promise.all(
        sources.map(async (source) => {
          this.logger.debug(`Extracting from source: ${source.type}`);
          return await this.strategies.get(source).run();
        }),
      );

      return results.flat();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
