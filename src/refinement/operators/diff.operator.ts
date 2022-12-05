import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { SearchRun } from '../../search/entities/search-run.entity';
import { IsNull, Not, Repository } from 'typeorm';

export const DiffOperatorType = 'diff';

export type DiffOperatorOpts = {
  type: typeof DiffOperatorType;
  run: SearchRun;
  by?: string;
};

export type DiffOperator<T> = (results: T[], opts: DiffOperatorOpts) => T[];

@Injectable()
export class DiffOperatorImpl<T> {
  constructor(private readonly searchRunRepo: Repository<SearchRun>) {}

  public async run(results, opts: DiffOperatorOpts): Promise<T[]> {
    const lastRun = await this.searchRunRepo.findOne({
      where: { search: opts.run.search, id: Not(opts.run.id), extractedResults: Not(IsNull()) },
      order: { created: 'DESC' },
    });

    return diffs(lastRun?.extractedResults ?? [], results, opts.by);
  }
}

// TODO write test
export const diffs = (arr1, arr2, by = 'id') => {
  if (arr1[0]?.[by] === undefined || arr2[0]?.[by] === undefined) {
    return mapDiffs(toHashMap(arr1), toHashMap(arr2));
  }

  return mapDiffs(toKeyMap(arr1, by), toKeyMap(arr2, by));
};

const toKeyMap = (results: unknown[] = [], by: string): Map<string, unknown> => {
  const map = new Map();

  for (const result of results) {
    map.set(result[by], result);
  }

  return map;
};

const toHashMap = (results: unknown[] = []): Map<string, unknown> => {
  return new Map<string, unknown>(
    results.map((r: any) => {
      const hashed = createHash('md5').update(JSON.stringify(r)).digest('hex');
      return [hashed, r];
    }) as any,
  );
};

const mapDiffs = (map1: Map<string, any>, map2: Map<string, any>) => {
  const diffResults = [];

  for (const [key, value] of map1) {
    if (!map2.has(key)) {
      diffResults.push({ ...value, _diff: 'removed' });
    }
  }

  for (const [key, value] of map2) {
    if (!map1.has(key)) {
      diffResults.push({ ...value, _diff: 'added' });
    }
  }

  return diffResults;
};
