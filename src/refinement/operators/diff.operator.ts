import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { SearchRun } from '../../search/entities/search-run.entity';
import { IsNull, Not, Repository } from 'typeorm';

export const DiffOperatorType = 'diff';

export type DiffOperatorOpts = {
  type: typeof DiffOperatorType;
};

export type DiffOperator<T> = (results: T[], opts: DiffOperatorOpts) => T[];

@Injectable()
export class DiffOperatorImpl<T> {
  constructor(private readonly searchRunRepo: Repository<SearchRun>) {}

  public async run(run, results): Promise<T[]> {
    const lastRun = await this.searchRunRepo.findOne({
      where: { search: run.search, id: Not(run.id), extractedResults: Not(IsNull()) },
      order: { created: 'DESC' },
    });

    return diffs(lastRun?.extractedResults ?? [], results);
  }
}

// TODO write test
export const diffs = (arr1, arr2) => {
  const lastRunMap = toHashMap(arr1);
  const thisRunMap = toHashMap(arr2);

  const diffResults = [];

  for (const [key, value] of lastRunMap) {
    if (!thisRunMap.has(key)) {
      diffResults.push({ ...value, _diff: 'removed' });
    }
  }

  for (const [key, value] of thisRunMap) {
    if (!lastRunMap.has(key)) {
      diffResults.push({ ...value, _diff: 'added' });
    }
  }

  return diffResults;
};

const toHashMap = (results: any[] = []) => {
  return new Map<string, any>(
    results.map((r: any) => {
      const hashed = createHash('md5').update(JSON.stringify(r)).digest('hex');
      return [hashed, r];
    }) as any,
  );
};
