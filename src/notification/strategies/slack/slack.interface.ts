export const SlackNotificationChannelType = 'slack';

export type SlackConfig = {
  webhook: string;
};

export type SlackNotificationChannel = {
  type: typeof SlackNotificationChannelType;
  config: SlackConfig;
};
