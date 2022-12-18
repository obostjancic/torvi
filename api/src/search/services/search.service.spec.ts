import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Search } from '../entities/search.entity';
import { SearchRunService } from './search-run.service';
import { SearchScheduleService } from './search-schedule.service';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        { provide: getRepositoryToken(Search), useValue: { find: jest.fn().mockResolvedValue([]) } },
        { provide: SearchScheduleService, useValue: { scheduleSearches: jest.fn() } },
        { provide: SearchRunService, useValue: {} },
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
