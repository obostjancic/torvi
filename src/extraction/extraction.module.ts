import { Module } from '@nestjs/common';
import { StrategyFactory } from './strategies/strategy.factory';
import { ExtractionService } from './extraction.service';
import { PlaywrightModule } from 'nestjs-playwright';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    ConfigModule,
    // FIXME: try to pull this into the strategy itself
    PlaywrightModule.forRoot({
      headless: true,
      channel: 'chrome',
      isGlobal: true,
    }),
  ],
  providers: [ExtractionService, StrategyFactory],
  exports: [ExtractionService],
})
export class ExtractionModule {}
