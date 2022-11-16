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
}
