import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { ExtractionService } from '../../extraction/extraction.service';
import { NotificationService } from '../../notification/notification.service';
import { RefinementService } from '../../refinement/refinement.service';
import { Search } from '../search.entity';

@Injectable()
export class SearchScheduleService {
  private readonly logger: Logger = new Logger(SearchScheduleService.name);

  constructor(
    private readonly extractionService: ExtractionService,
    private readonly refinementService: RefinementService,
    private readonly notificationService: NotificationService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  public async scheduleSearches(searches: Search[]) {
    this.logger.log(`Found ${searches.length} searches to schedule`);

    searches.forEach((search) => {
      this.logger.log(`Scheduling search ${search.id} ${search.name} ${search.schedule}`);

      const job = new CronJob(search.schedule, () => {
        this.createSearchInstance(search);
      });
      this.schedulerRegistry.addCronJob('search-' + search.id, job);

      job.start();
    });
  }

  async createSearchInstance(search: Search) {
    const results = await this.extractionService.run(search.config.extraction);
    const refined = await this.refinementService.run(results, search.config.refinement);
    const notified = await this.notificationService.run(refined, search.config.notification);

    return notified;
  }
}
