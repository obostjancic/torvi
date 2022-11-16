import { Injectable, Logger } from '@nestjs/common';
import { RefinementConfig } from './config.entity';
import { OperatorFactory } from './operators/operator.factory';

@Injectable()
export class RefinementService {
  private readonly logger: Logger = new Logger(RefinementService.name);

  constructor(private readonly operators: OperatorFactory) {}

  async run(results: any[], config: RefinementConfig) {
    try {
      this.logger.log(`Running refinement: ${config.operators.map((o) => o.type)}`);

      await config.operators.forEach(async (operatorConfig) => {
        this.logger.debug(`Applying operator: ${operatorConfig.type}`);
        results = await this.operators.apply(results, operatorConfig);
      });

      return results;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
