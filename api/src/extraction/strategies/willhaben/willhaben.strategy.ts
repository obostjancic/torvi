import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ExtractionStrategy } from '../strategy.interface';
import { WillhabenConfig, WillhabenResult, RawWillhabenResult } from './willhaben.interface';
import { catchError, firstValueFrom } from 'rxjs';
import { parse } from 'node-html-parser';

@Injectable()
export class WillhabenStrategy implements ExtractionStrategy<WillhabenResult> {
  private readonly logger: Logger = new Logger(WillhabenStrategy.name);

  constructor(
    private readonly config: WillhabenConfig,
    private readonly httpService: HttpService,
    private readonly proxy,
  ) {}

  async run(): Promise<WillhabenResult[]> {
    const html = await this.fetch();
    const results = this.extractResultList(html);
    return results.map(this.transormResult);
  }

  private async fetch(): Promise<string> {
    this.logger.debug(`${this.config.url}, ${JSON.stringify(this.proxy)}`);

    const res = await firstValueFrom(
      this.httpService
        .get(this.config.url, {
          proxy: this.proxy,
        })
        .pipe(
          catchError((error) => {
            console.error(error.response.data);
            throw error;
          }),
        ),
    );
    console.log(res.data);
    return res.data;
  }

  private extractResultList(html: string): unknown[] {
    const scriptText = parse(html).querySelector('body > script').text;
    const json = JSON.parse(scriptText);
    const { searchResult } = json.props.pageProps;
    const list = searchResult.advertSummaryList.advertSummary;
    return list;
  }

  private transormResult(result: RawWillhabenResult): WillhabenResult {
    const attrs = toRecord(result.attributes.attribute);

    return {
      id: result.id,
      title: attrs.HEADING.values.join(' '),
      price: Number(attrs.PRICE.values.join(' ')),
      url: `https://www.willhaben.at/iad/object?adId=${result.id}`,
    };
  }
}

const toRecord = (list: any[]) => {
  return list.reduce((acc, curr) => {
    acc[curr.name] = curr;
    return acc;
  }, {});
};
