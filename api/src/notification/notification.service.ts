import { Injectable, Logger } from '@nestjs/common';
import { SearchRun } from '../search/entities/search-run.entity';
import { Search } from '../search/entities/search.entity';
import { NotificationChannel } from './config.entity';
import { Message, MessageService } from './message.service';
import { StrategyFactory } from './strategies/strategy.factory';

@Injectable()
export class NotificationService {
  private readonly logger: Logger = new Logger(NotificationService.name);

  constructor(private readonly strategies: StrategyFactory, private readonly messageService: MessageService) {}

  async notify(search: Search, run: SearchRun) {
    const { channels } = search.config.notification;
    try {
      const message = await this.messageService.constructMessage(search, run);

      await this.broadcastMessage(channels, message);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  private async broadcastMessage(channels: NotificationChannel[], message: Message) {
    this.logger.debug(`Running notifications: ${channels.map((c) => c.type)}`);

    await Promise.all(
      channels.map(async (channel) => {
        this.logger.debug(`Sending notification through channel: ${channel.type}`);
        return await this.strategies.get(channel).send(message);
      }),
    );
  }
}
