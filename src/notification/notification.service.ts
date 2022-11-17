import { Injectable, Logger } from '@nestjs/common';
import { SearchRun } from 'src/search/entities/search-run.entity';
import { Search } from 'src/search/entities/search.entity';
import { StrategyFactory } from './strategies/strategy.factory';

@Injectable()
export class NotificationService {
  private readonly logger: Logger = new Logger(NotificationService.name);

  constructor(private readonly strategies: StrategyFactory) {}

  async notify<T = any>(search: Search, run: SearchRun, results: T[]) {
    const { channels } = search.config.notification;
    try {
      this.logger.log(`Running notifications: ${channels.map((c) => c.type)}`);

      await Promise.all(
        channels.map(async (channel) => {
          this.logger.debug(`Sending notification through channel: ${channel.type}`);
          return await this.strategies.get(channel).run(results, { search, run });
        }),
      );
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
