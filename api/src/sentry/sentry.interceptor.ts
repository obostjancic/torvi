import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Scope } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({ scope: Scope.REQUEST })
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        Sentry.captureException(error);

        return throwError(() => error);
      }),
    );
  }
}
