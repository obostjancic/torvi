import { Test, TestingModule } from '@nestjs/testing';
import { StrategyFactory } from './strategies/strategy.factory';
import { NotificationService } from './notification.service';
import { MessageService } from './message.service';
import { ConfigService } from '../config/config.service';
import { HttpService } from '@nestjs/axios';
import { MailerService } from '@nestjs-modules/mailer';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        StrategyFactory,
        MessageService,
        ConfigService,
        { provide: HttpService, useValue: {} },
        { provide: MailerService, useValue: {} },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
