export enum NotificationChannelType {
  Email = 'email',
  Slack = 'slack',
}

export class NotificationChannel {
  type: NotificationChannelType;
  config: Record<string, any>;
}

export class NotificationConfig {
  channels: NotificationChannel[];
}
