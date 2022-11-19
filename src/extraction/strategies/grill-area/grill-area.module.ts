import { Module } from '@nestjs/common';
import { PlaywrightModule } from 'nestjs-playwright';
import { GrillAreaStrategy } from './grill-area.strategy';
import { MockGrillAreaStrategy } from './grill-area.strategy.mock';

@Module({
  imports: [
    // FIXME: try to pull this into the strategy itself
    PlaywrightModule.forRoot({
      headless: false,
      channel: 'chrome',
      isGlobal: false,
    }),
  ],
  providers: [GrillAreaStrategy, MockGrillAreaStrategy],
  exports: [GrillAreaStrategy, MockGrillAreaStrategy],
})
export class ExtractionModule {}
