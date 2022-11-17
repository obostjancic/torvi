import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { NotificationStrategy } from '../strategy.interface';
import { SlackConfig } from './slack.interface';

export class SlackMessageStrategy implements NotificationStrategy {
  private readonly MAX_MESSAGE_LENGTH = 3000;

  private readonly logger = new Logger(SlackMessageStrategy.name);

  constructor(
    private readonly config: SlackConfig,
    private readonly httpService: HttpService,
    private formatter: (result: any) => string,
  ) {}

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

    await firstValueFrom(
      this.httpService.post(this.config.webhook, message).pipe(
        catchError((error) => {
          console.error(error.response.data);
          throw error;
        }),
      ),
    );
  }
}
