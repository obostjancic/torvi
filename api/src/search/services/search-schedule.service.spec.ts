import { SchedulerRegistry } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../../config/config.service';
import { SearchRunService } from './search-run.service';
import { SearchScheduleService } from './search-schedule.service';

describe('SearchScheduleService', () => {
  let service: SearchScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchScheduleService, SchedulerRegistry, ConfigService, { provide: SearchRunService, useValue: {} }],
    }).compile();

    service = module.get<SearchScheduleService>(SearchScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
