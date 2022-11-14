import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Strategy } from './strategies/strategy.interface';
import { SlackMessageStrategy } from './strategies/slack.strategy';
import { NotificationChannelType, NotificationConfig } from './config.entity';

@Injectable()
export class NotificationService {
  private readonly logger: Logger = new Logger(NotificationService.name);

  constructor(private readonly httpService: HttpService) {}

  // FIXME this should be a factory
  createStrategy(notification: any): Strategy {
    if (notification.type === NotificationChannelType.Slack) {
      return new SlackMessageStrategy(notification.config, this.httpService);
    }
  }

  async run(results: any[], config: NotificationConfig) {
    this.logger.log('Running notification');

    await Promise.all(
      config.channels.map(async (channel) => {
        return await this.createStrategy(channel).run(results);
      }),
    );
  }
}
