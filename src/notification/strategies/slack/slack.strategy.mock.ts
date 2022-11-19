import { Logger } from '@nestjs/common';
import { Message } from '../../message.service';
import { NotificationStrategy } from '../strategy.interface';
import { SlackMessageStrategy } from './slack.strategy';

export class MockSlackMessageStrategy implements NotificationStrategy {
  private readonly MAX_MESSAGE_LENGTH = 3000;

  private readonly logger = new Logger(SlackMessageStrategy.name);

  async send(message: Message) {
    await this.sendMessage(this.constructMessage(message));
  }

  private async constructMessage(message: Message) {
    // TODO read config for formatting
    const text = [message.title, '\n', message.prefix, ...message.results.extracted, message.postfix].join('\n');

    if (text.length >= this.MAX_MESSAGE_LENGTH) {
      this.logger.warn(`Message is too long (${text.length}), truncating`);
    }

    return {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: text.slice(0, this.MAX_MESSAGE_LENGTH),
          },
        },
      ],
    };
  }
  private async sendMessage(message: any) {
    if (!message) throw new Error('Slack message is empty');
    this.logger.log(`Sending slack message: ${JSON.stringify(message)}`);
  }
}
