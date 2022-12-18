import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';

import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigService } from './config/config.service';
import { ExtractionModule } from './extraction/extraction.module';
import { NotificationModule } from './notification/notification.module';
import { RefinementModule } from './refinement/refinement.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => configService.getDbConfig(),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'dist'),
    }),
    ScheduleModule.forRoot(),
    SearchModule,
    RefinementModule,
    ExtractionModule,
    NotificationModule,
  ],
  // controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
