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
