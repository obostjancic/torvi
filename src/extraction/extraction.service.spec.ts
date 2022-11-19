import { Test, TestingModule } from '@nestjs/testing';
import { ExtractionService } from './extraction.service';

// TODO: write some tests here
describe('ExtractionService', () => {
  let service: ExtractionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtractionService],
    }).compile();

    service = module.get<ExtractionService>(ExtractionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
