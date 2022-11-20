import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SearchRun } from '../search/entities/search-run.entity';
import { OperatorFactory } from './operators/operator.factory';
import { RefinementService } from './refinement.service';

const mockRepo = () => ({
  findOne: jest.fn(),
});

describe('RefinementService', () => {
  let service: RefinementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefinementService, OperatorFactory, { provide: getRepositoryToken(SearchRun), useValue: mockRepo }],
    }).compile();

    service = module.get<RefinementService>(RefinementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
