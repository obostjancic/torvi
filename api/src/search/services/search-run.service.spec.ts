import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExtractionService } from '../../extraction/extraction.service';
import { NotificationService } from '../../notification/notification.service';
import { RefinementService } from '../../refinement/refinement.service';
import { SearchRun } from '../entities/search-run.entity';
import { SearchRunService } from './search-run.service';

describe('SearchRunService', () => {
  let service: SearchRunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchRunService,
        { provide: getRepositoryToken(SearchRun), useValue: {} },
        { provide: ExtractionService, useValue: {} },
        { provide: RefinementService, useValue: {} },
        { provide: NotificationService, useValue: {} },
      ],
    }).compile();

    service = module.get<SearchRunService>(SearchRunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
