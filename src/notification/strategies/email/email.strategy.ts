import { MailerService } from '@nestjs-modules/mailer';
import { Logger } from '@nestjs/common';
import { NotificationStrategy } from '../strategy.interface';
import { EmailConfig } from './email.interface';

export class EmailStrategy implements NotificationStrategy {
  private readonly MAX_MESSAGE_LENGTH = 3000;

  private readonly logger = new Logger(EmailStrategy.name);

  constructor(private readonly config: EmailConfig, private readonly mailerService: MailerService) {}

  async run(results: any[], formatter: (result: any) => string = (result) => JSON.stringify(result)) {
    this.logger.log('Sending email notification');

    if (!results.length) {
      this.logger.warn('No results to send');
      return;
    }

    const message = await this.constructMessage(results, formatter);
    await this.sendEmail(message);
  }

  private async constructMessage(results: any[], formatter: (result: any) => string) {
    // TODO read config for formatting
    const text = results.map((result) => formatter(result)).join('\n');

    if (text.length >= this.MAX_MESSAGE_LENGTH) {
      this.logger.warn(`Message is too long (${text.length}), truncating`);
    }
    return text.slice(0, this.MAX_MESSAGE_LENGTH);
  }

  private async sendEmail(message: string) {
    if (!message) throw new Error('Email message is empty');
    try {
      await this.mailerService.sendMail({
        to: this.config.to,
        subject: 'Results for search: Search name',
        text: message,
      });
    } catch (e) {
      this.logger.error(e);
    }
  }
}
