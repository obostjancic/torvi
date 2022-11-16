import { Injectable } from '@nestjs/common';
import { filter, FilterOperatorType } from './filter.operator';
import { group, GroupOperatorType } from './group.operator';
import { PersistOperatorImpl, PersistOperatorType } from './persist.operator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Search } from '../../search/search.entity';
import { RefinementOperator } from '../config.entity';

@Injectable()
export class OperatorFactory {
  @InjectRepository(Search)
  private readonly searchRepo: Repository<Search>;

  public async apply(results, operator: RefinementOperator) {
    if (operator.type === GroupOperatorType) {
      return group(results, operator);
    } else if (operator.type === FilterOperatorType) {
      return filter(results, operator);
    } else if (operator.type === PersistOperatorType) {
      return new PersistOperatorImpl(this.searchRepo).run(results, operator);
    }
  }
}
