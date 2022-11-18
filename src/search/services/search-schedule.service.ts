import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { ConfigService } from '../../config/config.service';
import { SearchRunService } from './search-run.service';
import { Search } from '../entities/search.entity';

@Injectable()
export class SearchScheduleService {
  private readonly logger: Logger = new Logger(SearchScheduleService.name);

  constructor(
    private readonly searchRunService: SearchRunService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly config: ConfigService,
  ) {}

  public async scheduleSearches(searches: Search[]) {
    if (!this.config.get('runScheduledSearches')) return;

    this.logger.log(`Found ${searches.length} searches to schedule`);

    searches.forEach((search) => {
      this.logger.log(`Scheduling search ${search.id} ${search.name} ${search.schedule}`);

      const job = new CronJob(search.schedule, () => {
        this.searchRunService.run(search);
      });
      this.schedulerRegistry.addCronJob('search-' + search.id, job);

      job.start();
    });
  }
}
