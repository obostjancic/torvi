import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { NotificationChannel, NotificationChannelType } from '../config.entity';
import { SlackMessageStrategy } from './slack/slack.strategy';
import { MockSlackMessageStrategy } from './slack/slack.strategy.mock';
import { NotificationStrategy } from './strategy.interface';
import { SlackMessageConfig } from './slack/slack.interface';

@Injectable()
export class StrategyFactory {
  constructor(private readonly config: ConfigService, private readonly httpService: HttpService) {}

  public get(channel: NotificationChannel) {
    if (this.config.get('mockNotification')) {
      return this.getMockStrategy(channel);
    } else {
      return this.getStrategy(channel);
    }
  }

  private getStrategy(channel: NotificationChannel): NotificationStrategy {
    if (channel.type === NotificationChannelType.Slack) {
      return new SlackMessageStrategy(channel.config as SlackMessageConfig, this.httpService);
    }
  }

  private getMockStrategy(channel: NotificationChannel): NotificationStrategy {
    if (channel.type === NotificationChannelType.Slack) {
      return new MockSlackMessageStrategy();
    }
  }
}
