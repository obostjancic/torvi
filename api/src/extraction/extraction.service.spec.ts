import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getBrowserToken } from 'nestjs-playwright';
import { ConfigService } from '../config/config.service';
import { ExtractionService } from './extraction.service';
import { StrategyFactory } from './strategies/strategy.factory';

// TODO: write some tests here
describe('ExtractionService', () => {
  let service: ExtractionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExtractionService,
        StrategyFactory,
        ConfigService,
        { provide: HttpService, useValue: {} },
        { provide: getBrowserToken(), useValue: {} },
      ],
    }).compile();

    service = module.get<ExtractionService>(ExtractionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
