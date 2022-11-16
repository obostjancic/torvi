import { EmailNotificationChannel } from './strategies/email/email.interface';
import { SlackNotificationChannel } from './strategies/slack/slack.interface';

export type NotificationChannel = SlackNotificationChannel | EmailNotificationChannel;

export type NotificationConfig = {
  channels: NotificationChannel[];
};
