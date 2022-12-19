import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ExtractionStrategy } from '../strategy.interface';
import { JSONAPIConfig, JSONAPIResult } from './json-api.interface';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class JSONAPIStrategy implements ExtractionStrategy<JSONAPIResult> {
  private readonly logger: Logger = new Logger(JSONAPIStrategy.name);

  constructor(
    private readonly config: JSONAPIConfig,
    private readonly httpService: HttpService,
    private readonly proxy,
  ) {}

  async run(): Promise<JSONAPIResult[]> {
    return this.fetch();
  }

  private async fetch(): Promise<JSONAPIResult[]> {
    this.logger.debug(`Fetching from ${this.config.url}`);
    const res = await firstValueFrom(
      this.httpService.get(this.config.url, { proxy: this.proxy, ...this.config.options }).pipe(
        catchError((error) => {
          console.error(error.response.data);
          throw error;
        }),
      ),
    );

    return res.data;
  }
}
