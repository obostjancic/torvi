import { Injectable, Logger } from '@nestjs/common';
import { SearchRun } from '../search/entities/search-run.entity';
import { Search } from '../search/entities/search.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface Config {
  port: number;
  mockExtraction: boolean;
  mockRefinement: boolean;
  mockNotification: boolean;
  runScheduledSearches: boolean;
  emailAuth?: {
    user: string;
    pass: string;
  };
  db: {
    type: string;
    database: string;
    synchronize: boolean;
    entities: unknown[];
    migrations: string[];
    migrationsRun: boolean;
  };
}

@Injectable()
export class ConfigService {
  private readonly config: Config;
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ConfigService.name);

    this.config = {
      port: Number(process.env.PORT) || 3000,
      mockExtraction: this.toBoolean(process.env.MOCK_EXTRACTION),
      mockRefinement: this.toBoolean(process.env.MOCK_REFINEMENT),
      mockNotification: this.toBoolean(process.env.MOCK_NOTIFICATION),
      runScheduledSearches: this.toBoolean(process.env.RUN_SCHEDULED_SEARCHES),
      emailAuth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      db: {
        type: process.env.DB_TYPE || 'sqlite',
        database: process.env.DB_DATABASE || 'gpm',
        synchronize: true,
        entities: [Search, SearchRun],
        migrations: ['dist/**/migrations/*.{ts,js}'],
        migrationsRun: true,
      },
    };

    this.logger.log(`Using config: ${JSON.stringify(this.config, null, 2)}`);
  }

  public get(key: keyof Config): Config[keyof Config] {
    return this.config[key];
  }

  public getEmailAuth() {
    return this.config.emailAuth;
  }

  public getDbConfig() {
    return this.get('db') as TypeOrmModuleOptions;
  }

  private toBoolean(value: string): boolean {
    return value === 'true';
  }
}
