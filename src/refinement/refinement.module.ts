import { Module } from '@nestjs/common';
import { RefinementService } from './refinement.service';

@Module({
  providers: [RefinementService],
  exports: [RefinementService],
})
export class RefinementModule {}
