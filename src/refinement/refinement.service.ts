import { Injectable, Logger } from '@nestjs/common';
import { SearchRun } from '../search/entities/search-run.entity';
import { Search } from '../search/entities/search.entity';
import { OperatorFactory } from './operators/operator.factory';

@Injectable()
export class RefinementService {
  private readonly logger: Logger = new Logger(RefinementService.name);

  constructor(private readonly operators: OperatorFactory) {}

  async refine(search: Search, run: SearchRun) {
    const { operators } = search.config.refinement;
    let results = run.results;
    try {
      this.logger.log(`Running refinement: ${operators.map((o) => o.type)}`);

      for (const operator of operators) {
        this.logger.debug(`Applying operator: ${operator.type}`);
        results = await this.operators.apply(operator, run, results);
        this.logger.debug(`After operator: ${operator.type}`);
      }

      return results;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
