import { Test, TestingModule } from '@nestjs/testing';
import { SearchScheduleService } from './search-schedule.service';

describe('SearchScheduleService', () => {
  let service: SearchScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchScheduleService],
    }).compile();

    service = module.get<SearchScheduleService>(SearchScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
