import { Injectable } from '@nestjs/common';
import { InjectPage } from 'nestjs-playwright';
import { Page } from 'playwright';
import { ExtractionSource, ExtractionSourceType } from '../config.entity';
import { GrillAreaStrategy } from './grill-area/grill-area.strategy';
import { MockGrillAreaStrategy } from './grill-area/grill-area.strategy.mock';
import { ExtractionStrategy } from './strategy.interface';

@Injectable()
export class StrategyFactory {
  @InjectPage() // FIXME make this work within the strategy itself
  private readonly page: Page;

  public get(source: ExtractionSource): ExtractionStrategy<any> {
    const mock = true;
    if (mock) {
      if (source.type === ExtractionSourceType.GrillArea) {
        return new MockGrillAreaStrategy(source.config);
      }
    } else {
      if (source.type === ExtractionSourceType.GrillArea) {
        return new GrillAreaStrategy(source.config, this.page);
      }
    }
  }
}
