import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchRun } from 'src/search/entities/search-run.entity';
import { Repository } from 'typeorm';
import { RefinementOperator } from '../config.entity';
import { DiffOperatorImpl, DiffOperatorType } from './diff.operator';
import { filter, FilterOperatorType } from './filter.operator';
import { group, GroupOperatorType } from './group.operator';

@Injectable()
export class OperatorFactory {
  @InjectRepository(SearchRun)
  private readonly searchRunRepo: Repository<SearchRun>;

  public async apply(operator: RefinementOperator, run: SearchRun, results: any[]) {
    if (operator.type === GroupOperatorType) {
      return group(results, operator);
    } else if (operator.type === FilterOperatorType) {
      return filter(results, operator);
    } else if (operator.type === DiffOperatorType) {
      return await new DiffOperatorImpl(this.searchRunRepo).run(run, results);
    }
  }
}
