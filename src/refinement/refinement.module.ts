import { Module } from '@nestjs/common';
import { RefinementService } from './refinement.service';
import { OperatorFactory } from './operators/operator.factory';

@Module({
  providers: [RefinementService, OperatorFactory],
  exports: [RefinementService],
})
export class RefinementModule {}
