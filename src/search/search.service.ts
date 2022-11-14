import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { SearchScheduleService } from './search-schedule/search-schedule.service';
import { Search } from './search.entity';

@Injectable()
export class SearchService {
  private readonly logger: Logger = new Logger(SearchService.name);

  constructor(
    @InjectRepository(Search)
    private readonly searchRepo: Repository<Search>,
    private readonly scheduleService: SearchScheduleService,
  ) {
    this.findAll().then((searches) => {
      this.scheduleService.scheduleSearches(searches);
    });
  }

  async createSearchInstance(id: number) {
    const search = await this.findOne(id);
    return await this.scheduleService.createSearchInstance(search);
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

  update(id: number, updateSearchDto: UpdateSearchDto) {
    return this.searchRepo.update(id, updateSearchDto);
  }

  remove(id: number) {
    return this.searchRepo.delete(id);
  }
}
