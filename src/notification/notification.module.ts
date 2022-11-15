import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { StrategyFactory } from './strategies/strategy.factory';

@Module({
  imports: [HttpModule],
  providers: [NotificationService, StrategyFactory],
  exports: [NotificationService],
})
export class NotificationModule {}
