import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSearchDto } from '../dto/create-search.dto';
import { UpdateSearchDto } from '../dto/update-search.dto';
import { SearchRunService } from './search-run.service';
import { SearchScheduleService } from './search-schedule.service';
import { Search } from '../entities/search.entity';

@Injectable()
export class SearchService {
  private readonly logger: Logger = new Logger(SearchService.name);

  constructor(
    @InjectRepository(Search)
    private readonly searchRepo: Repository<Search>,
    private readonly scheduleService: SearchScheduleService,
    private readonly searchRunService: SearchRunService,
  ) {
    this.findAll().then((searches) => {
      this.scheduleService.scheduleSearches(searches);
    });
  }

  async createSearchRun(id: number) {
    const search = await this.findOne(id);
    return await this.searchRunService.run(search);
  }

  create(createSearchDto: CreateSearchDto) {
    return this.searchRepo.save(createSearchDto);
  }

  findAll() {
    return this.searchRepo.find();
  }

  async findOne(id: number): Promise<Search> {
    return this.searchRepo.findOne({ where: { id } });
  }

  async update(id: number, updateSearchDto: UpdateSearchDto) {
    await this.searchRepo.update(id, updateSearchDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.searchRepo.softDelete(id);
  }
}
