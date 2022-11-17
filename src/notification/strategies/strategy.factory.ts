import { MailerService } from '@nestjs-modules/mailer';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { NotificationChannel } from '../config.entity';
import { EmailNotificationChannelType } from './email/email.interface';
import { EmailStrategy } from './email/email.strategy';
import { SlackNotificationChannelType } from './slack/slack.interface';
import { SlackMessageStrategy } from './slack/slack.strategy';
import { MockSlackMessageStrategy } from './slack/slack.strategy.mock';
import { NotificationStrategy } from './strategy.interface';

@Injectable()
export class StrategyFactory {
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    private mailerService: MailerService,
  ) {}

  public get(channel: NotificationChannel) {
    if (this.config.get('mockNotification')) {
      return this.getMockStrategy(channel);
    } else {
      return this.getStrategy(channel);
    }
  }

  private getStrategy(channel: NotificationChannel): NotificationStrategy {
    if (channel.type === SlackNotificationChannelType) {
      return new SlackMessageStrategy(channel.config, this.httpService, formatter);
    } else if (channel.type === EmailNotificationChannelType) {
      return new EmailStrategy(channel.config, this.mailerService, formatter);
    }
  }

  private getMockStrategy(channel: NotificationChannel): NotificationStrategy {
    if (channel.type === SlackNotificationChannelType) {
      return new MockSlackMessageStrategy(formatter);
    } else if (channel.type === EmailNotificationChannelType) {
      return { run: () => Promise.resolve() };
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
