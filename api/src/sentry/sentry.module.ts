import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { SentryInterceptor } from './sentry.interceptor';

export const SENTRY_OPTIONS = 'SENTRY_OPTIONS';

@Module({
  imports: [ConfigModule],
})
export class SentryModule {
  static forRoot() {
    const options = {
      // TODO: use config module
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      debug: true,
    };

    Sentry.init(options);

    return {
      module: SentryModule,
      providers: [
        {
          provide: SENTRY_OPTIONS,
          useValue: options,
        },

        {
          provide: APP_INTERCEPTOR,
          useClass: SentryInterceptor,
        },
      ],
    };
  }
}
