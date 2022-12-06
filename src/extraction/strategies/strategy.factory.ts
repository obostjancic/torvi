import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectBrowser } from 'nestjs-playwright';
import { Browser } from 'playwright';
import { ConfigService } from '../../config/config.service';
import { ExtractionSource } from '../config.entity';
import { GrillAreaSourceType } from './grill-area/grill-area.interface';
import { GrillAreaStrategy } from './grill-area/grill-area.strategy';
import { MockGrillAreaStrategy } from './grill-area/grill-area.strategy.mock';
import { JSONAPISourceType } from './json-api/json-api.interface';
import { JSONAPIStrategy } from './json-api/json-api.strategy';
import { MockJSONAPIStrategy } from './json-api/json-api.strategy.mock';
import { ExtractionResult, ExtractionStrategy } from './strategy.interface';
import { WillhabenSourceType } from './willhaben/willhaben.interface';
import { WillhabenStrategy } from './willhaben/willhaben.strategy';
import { MockWillhabenStrategy } from './willhaben/willhaben.strategy.mock';

@Injectable()
export class StrategyFactory {
  @InjectBrowser() // FIXME make this work within the strategy itself
  private readonly browser: Browser;

  constructor(private readonly config: ConfigService, private readonly httpService: HttpService) {}

  public get(source: ExtractionSource) {
    if (this.config.get('mockExtraction')) {
      return this.getMockStrategy(source);
    } else {
      return this.getStrategy(source);
    }
  }

  private getStrategy(source: ExtractionSource): ExtractionStrategy<ExtractionResult> {
    if (source.type === GrillAreaSourceType) {
      return new GrillAreaStrategy(source.config, this.browser);
    } else if (source.type === JSONAPISourceType) {
      return new JSONAPIStrategy(source.config, this.httpService);
    } else if (source.type === WillhabenSourceType) {
      return new WillhabenStrategy(source.config, this.httpService);
    }
  }

  private getMockStrategy(source: ExtractionSource): ExtractionStrategy<ExtractionResult> {
    if (source.type === GrillAreaSourceType) {
      return new MockGrillAreaStrategy(source.config);
    } else if (source.type === JSONAPISourceType) {
      return new MockJSONAPIStrategy(source.config);
    } else if (source.type === WillhabenSourceType) {
      return new MockWillhabenStrategy(source.config);
    }
  }
}
