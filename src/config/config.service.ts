import { Injectable, Logger } from '@nestjs/common';
import { Config } from './config.interface';

// istanbul ignore next
@Injectable()
export class ConfigService {
  private readonly config: Config;
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ConfigService.name);

    this.config = {
      port: Number(process.env.PORT),
      mockExtraction: this.toBoolean(process.env.MOCK_EXTRACTION),
      mockRefinement: this.toBoolean(process.env.MOCK_REFINEMENT),
      mockNotification: this.toBoolean(process.env.MOCK_NOTIFICATION),
      runScheduledSearches: this.toBoolean(process.env.RUN_SCHEDULED_SEARCHES),
    };

    this.logger.log(`Using config: ${JSON.stringify(this.config, null, 2)}`);
  }

  public get(key: keyof Config): Config[keyof Config] {
    return this.config[key];
  }

  private toBoolean(value: string): boolean {
    return value === 'true';
  }
}
