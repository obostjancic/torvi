import { Test, TestingModule } from '@nestjs/testing';
import { RefinementService } from './refinement.service';

describe('RefinementService', () => {
  let service: RefinementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefinementService],
    }).compile();

    service = module.get<RefinementService>(RefinementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
