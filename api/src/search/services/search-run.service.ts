import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Validator } from 'jsonschema';
import { Repository } from 'typeorm';
import { ExtractionService } from '../../extraction/extraction.service';
import { NotificationService } from '../../notification/notification.service';
import { RefinementService } from '../../refinement/refinement.service';
import { SearchRun } from '../entities/search-run.entity';
import { Search } from '../entities/search.entity';

type Results = any;

@Injectable()
export class SearchRunService {
  private readonly logger: Logger = new Logger(SearchRunService.name);
  private readonly validator = new Validator();

  @InjectRepository(SearchRun)
  private readonly searchRunRepo: Repository<SearchRun>;

  constructor(
    private readonly extractionService: ExtractionService,
    private readonly refinementService: RefinementService,
    private readonly notificationService: NotificationService,
  ) {}

  async run(search: Search) {
    this.logger.log(`Running search: ${search.id}`);

    const run = await this.startRun(search);

    run.extractedResults = await this.extractionService.extract(search);
    this.validateSchema(run.extractedResults, search.config.input?.schema);
    await this.searchRunRepo.save(run);

    run.refinedResults = await this.refinementService.refine(search, run);
    this.validateSchema(run.refinedResults, search.config.output?.schema);

    await this.notificationService.notify(search, run);

    await this.endRun(run);

    return run;
  }

  private async startRun(search: Search) {
    const run = this.searchRunRepo.create({ search: search.id });
    return this.searchRunRepo.save(run);
  }

  private async endRun(run: SearchRun) {
    return this.searchRunRepo.update(run.id, {});
  }

  private validateSchema(results: Results, schema: any) {
    if (!schema) {
      return;
    }
    try {
      this.validator.validate(results, schema, { throwAll: true });
    } catch (e) {
      this.logger.error(e.errors.map((e: any) => e.toString()));
      throw e;
    }
  }
}
