import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { ConfigService } from 'src/config/config.service';
import { ExtractionService } from '../../extraction/extraction.service';
import { NotificationService } from '../../notification/notification.service';
import { RefinementService } from '../../refinement/refinement.service';
import { Search } from '../search.entity';
import { Validator } from 'jsonschema';

@Injectable()
export class SearchScheduleService {
  private readonly logger: Logger = new Logger(SearchScheduleService.name);
  private readonly validator = new Validator();
  constructor(
    private readonly extractionService: ExtractionService,
    private readonly refinementService: RefinementService,
    private readonly notificationService: NotificationService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly config: ConfigService,
  ) {}

  public async scheduleSearches(searches: Search[]) {
    if (!this.config.get('runScheduledSearches')) return;

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
    this.validateSchema(results, search.config.input.schema);
    const refined = await this.refinementService.run(results, search.config.refinement);
    this.validateSchema(refined, search.config.output.schema);
    const notified = await this.notificationService.run(refined, search.config.notification);

    return notified;
  }

  private validateSchema(data: any, schema: any) {
    try {
      this.validator.validate(data, schema, { throwAll: true });
    } catch (e) {
      this.logger.error(e.errors.map((e: any) => e.toString()));
      throw e;
    }
  }
}
