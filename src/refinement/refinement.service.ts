import { Injectable, Logger } from '@nestjs/common';
import { RefinementConfig } from './config.entity';

@Injectable()
export class RefinementService {
  private readonly logger: Logger = new Logger(RefinementService.name);

  run(results: any[], config: RefinementConfig) {
    this.logger.log('Running refinement', config);

    return results;
  }
}
