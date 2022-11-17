import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchRun } from 'src/search/entities/search-run.entity';
import { ExtractionModule } from '../extraction/extraction.module';
import { NotificationModule } from '../notification/notification.module';
import { RefinementModule } from '../refinement/refinement.module';
import { SearchRunService } from './services/search-run.service';
import { SearchScheduleService } from './services/search-schedule.service';
import { SearchController } from './search.controller';
import { Search } from './entities/search.entity';
import { SearchService } from './services/search.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService, SearchRunService, SearchScheduleService],
  imports: [TypeOrmModule.forFeature([Search, SearchRun]), ExtractionModule, NotificationModule, RefinementModule],
})
export class SearchModule {}
