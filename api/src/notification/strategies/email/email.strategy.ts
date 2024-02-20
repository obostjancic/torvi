import { MailerService } from '@nestjs-modules/mailer';
import { Logger } from '@nestjs/common';
import { Message } from '../../message.service';
import { NotificationStrategy } from '../strategy.interface';
import { EmailConfig } from './email.interface';

export class EmailStrategy implements NotificationStrategy {
  private readonly logger = new Logger(EmailStrategy.name);

  constructor(private readonly config: EmailConfig, private readonly mailerService: MailerService) {}

  async send(message: Message) {
    this.logger.log('Sending email notification');

    await this.sendEmail(message);
  }

  private async sendEmail(message: Message) {
    if (!message) {
      throw new Error('Email message is empty');
    }
    try {
      await this.mailerService.sendMail({
        to: this.config.to,
        subject: message.title,
        text: [message.prefix, ...message.results.extracted, message.postfix].join('\n'),
      });
    } catch (e) {
      this.logger.error(e);
    }
  }
}
