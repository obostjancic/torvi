import { Logger } from '@nestjs/common';
import { NotificationStrategy } from '../strategy.interface';

export class MockSlackMessageStrategy implements NotificationStrategy {
  private readonly MAX_MESSAGE_LENGTH = 3000;

  private readonly logger = new Logger(MockSlackMessageStrategy.name);

  constructor(private formatter: (result: any) => string) {}

  async run(results, { search, run }) {
    this.logger.log('Sending slack notification');

    if (!results.length) {
      this.logger.warn('No results to send');
      return;
    }

    const message = await this.constructMessage(results);
    await this.sendMessage(message);
  }

  private async constructMessage(results: any[]) {
    // TODO read config for formatting
    const text = results.map((result) => this.formatter(result)).join('\n');

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
