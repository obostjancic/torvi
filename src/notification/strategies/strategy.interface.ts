import { SearchRun } from 'src/search/entities/search-run.entity';
import { Search } from 'src/search/entities/search.entity';

export interface NotificationStrategy {
  run: (results: any[], meta: { search: Search; run: SearchRun }) => Promise<void>;
}
