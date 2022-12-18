import { MailerModule } from '@nestjs-modules/mailer';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { StrategyFactory } from './strategies/strategy.factory';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { MessageService } from './message.service';

@Module({
  imports: [
    HttpModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: 'SendinBlue',
          auth: configService.getEmailAuth(),
        },
        defaults: {
          from: '"Corno" <no-reply@corno.com>',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [NotificationService, StrategyFactory, MessageService],
  exports: [NotificationService],
})
export class NotificationModule {}
