import { Injectable, Logger } from '@nestjs/common';
import { StrategyFactory } from './strategies/strategy.factory';
import { NotificationConfig } from './config.entity';

@Injectable()
export class NotificationService {
  private readonly logger: Logger = new Logger(NotificationService.name);

  constructor(private readonly strategies: StrategyFactory) {}

  async run(results: any[], config: NotificationConfig) {
    try {
      this.logger.log(`Running notifications: ${config.channels.map((c) => c.type)}`);

      await Promise.all(
        config.channels.map(async (channel) => {
          this.logger.debug(`Sending notification through channel: ${channel.type}`);
          return await this.strategies.get(channel).run(results, formatter);
        }),
      );
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}

const formatter = (result: any) => {
  return Object.entries(result)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: ${value.join(', ')}`;
      } else if (typeof value === 'object') {
        return formatter(value);
      }
      return `${key}: ${value}`;
    })
    .join(', ');
};
