import { Injectable, Logger } from '@nestjs/common';
import { Search } from 'src/search/entities/search.entity';
import { StrategyFactory } from './strategies/strategy.factory';
import { v4 } from 'uuid';
import { SearchRun } from 'src/search/entities/search-run.entity';

@Injectable()
export class ExtractionService {
  private readonly logger: Logger = new Logger(ExtractionService.name);

  constructor(private readonly strategies: StrategyFactory) {}

  async extract(search: Search, run: SearchRun) {
    const { sources } = search.config.extraction;
    try {
      this.logger.log(`Running extraction: ${sources.map((s) => s.type)}`);

      const results = await Promise.all(
        sources.map(async (source) => {
          this.logger.debug(`Extracting from source: ${source.type}`);
          return await this.strategies.get(source).run();
        }),
      );

      run.results = results.flat();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  private assignId(result: any) {
    return { ...result, id: v4() };
  }
}
