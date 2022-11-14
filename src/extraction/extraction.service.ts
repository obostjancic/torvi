import { Injectable, Logger } from '@nestjs/common';
import { ExtractionConfig } from './config.entity';
import { StrategyFactory } from './strategies/strategy.factory';

@Injectable()
export class ExtractionService {
  private readonly logger: Logger = new Logger(ExtractionService.name);

  constructor(private readonly strategies: StrategyFactory) {}

  async run(config: ExtractionConfig) {
    this.logger.log('Running extraction');

    const results = await Promise.all(
      config.sources.map(async (source) => {
        return await this.strategies.get(source).run();
      }),
    );

    return results.flat();
  }
}
