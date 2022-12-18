export const EmailNotificationChannelType = 'email';

export type EmailConfig = {
  to: string;
};

export type EmailNotificationChannel = {
  type: typeof EmailNotificationChannelType;
  config: EmailConfig;
};
