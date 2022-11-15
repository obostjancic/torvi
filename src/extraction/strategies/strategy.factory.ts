import { Injectable } from '@nestjs/common';
import { InjectPage } from 'nestjs-playwright';
import { Page } from 'playwright';
import { ConfigService } from '../../config/config.service';
import { ExtractionSource, ExtractionSourceType } from '../config.entity';
import { GrillAreaConfig } from './grill-area/grill-area.interface';
import { GrillAreaStrategy } from './grill-area/grill-area.strategy';
import { MockGrillAreaStrategy } from './grill-area/grill-area.strategy.mock';
import { ExtractionResult, ExtractionStrategy } from './strategy.interface';

@Injectable()
export class StrategyFactory {
  @InjectPage() // FIXME make this work within the strategy itself
  private readonly page: Page;

  constructor(private readonly config: ConfigService) {}

  public get(source: ExtractionSource) {
    if (this.config.get('mockExtraction')) {
      return this.getMockStrategy(source);
    } else {
      return this.getStrategy(source);
    }
  }

  private getStrategy(source: ExtractionSource): ExtractionStrategy<ExtractionResult> {
    if (source.type === ExtractionSourceType.GrillArea) {
      return new GrillAreaStrategy(source.config as GrillAreaConfig, this.page);
    }
  }

  private getMockStrategy(source: ExtractionSource): ExtractionStrategy<ExtractionResult> {
    if (source.type === ExtractionSourceType.GrillArea) {
      return new MockGrillAreaStrategy(source.config as GrillAreaConfig);
    }
  }
}
