import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Search } from '../../search/search.entity';

export const PersistOperatorType = 'persist';

export type PersistrOperatorOpts = {
  type: typeof PersistOperatorType;
};

export type PersistOperator<T> = (results: T[], opts: PersistrOperatorOpts) => T[];

@Injectable()
export class PersistOperatorImpl<T> {
  constructor(private readonly searchRepo: Repository<Search>) {}

  public async run(results, operator): Promise<T[]> {
    console.log('PersistOperator.run()');
    return results;
  }
}
