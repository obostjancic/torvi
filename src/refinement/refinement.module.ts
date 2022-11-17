import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchRun } from 'src/search/entities/search-run.entity';
import { Search } from '../search/entities/search.entity';
import { OperatorFactory } from './operators/operator.factory';
import { RefinementService } from './refinement.service';

@Module({
  imports: [TypeOrmModule.forFeature([Search, SearchRun])],
  providers: [RefinementService, OperatorFactory],
  exports: [RefinementService],
})
export class RefinementModule {}
