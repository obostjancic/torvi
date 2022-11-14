import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ExtractionModule } from '../extraction/extraction.module';
import { NotificationModule } from '../notification/notification.module';
import { RefinementModule } from '../refinement/refinement.module';
import { Search } from './search.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchScheduleService } from './search-schedule/search-schedule.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService, SearchScheduleService],
  imports: [TypeOrmModule.forFeature([Search]), ExtractionModule, NotificationModule, RefinementModule],
})
export class SearchModule {}
