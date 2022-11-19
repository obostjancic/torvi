import { EmailNotificationChannel } from './strategies/email/email.interface';
import { SlackNotificationChannel } from './strategies/slack/slack.interface';

export type NotificationChannel = SlackNotificationChannel | EmailNotificationChannel;

export type FormatOptions = {
  title?: string;
  prefix?: string;
  postfix?: string;
  date?: string;
};

export type NotificationConfig = {
  channels: NotificationChannel[];
  format?: FormatOptions;
};
