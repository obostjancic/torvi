import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { Strategy } from './strategy.interface';

export class SlackMessageStrategy implements Strategy {
  private readonly logger = new Logger(SlackMessageStrategy.name);

  constructor(private readonly config: Record<string, any>, private readonly httpService: HttpService) {}

  async run(results: any[]) {
    this.logger.log('Sending slack notification');

    if (!results.length) return;

    const message = await this.constructMessage(results);
    await this.sendMessage(message);
  }

  private async constructMessage(results: any[]) {
    // TODO read config for formatting
    const text = results.map((result) => JSON.stringify(result)).join('\n');

    return {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: text,
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
