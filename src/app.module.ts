import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';

import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtractionModule } from './extraction/extraction.module';
import { NotificationModule } from './notification/notification.module';
import { RefinementModule } from './refinement/refinement.module';
import { Search } from './search/search.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'gpm.db',
      entities: [Search],
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
