import { Module } from '@nestjs/common';
import { RefinementService } from './refinement.service';
import { OperatorFactory } from './operators/operator.factory';
import { Search } from '../search/search.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Search])],
  providers: [RefinementService, OperatorFactory],
  exports: [RefinementService],
})
export class RefinementModule {}
