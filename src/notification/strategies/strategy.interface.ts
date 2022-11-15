export interface NotificationStrategy {
  run: (results: any[], formatter?: (result: any) => string) => Promise<void>;
}
