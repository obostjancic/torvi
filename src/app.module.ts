import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';

import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtractionModule } from './extraction/extraction.module';
import { NotificationModule } from './notification/notification.module';
import { RefinementModule } from './refinement/refinement.module';
import { SearchRun } from './search/entities/search-run.entity';
import { Search } from './search/entities/search.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'gpm.db',
      entities: [Search, SearchRun],
      synchronize: true,
      migrations: ['dist/**/migrations/*.{ts,js}'],
      migrationsRun: true,
    }),
    ScheduleModule.forRoot(),
    SearchModule,
    RefinementModule,
    ExtractionModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
