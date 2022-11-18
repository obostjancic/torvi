import { Injectable } from '@nestjs/common';
import { SearchRun } from '../search/entities/search-run.entity';
import { Search } from '../search/entities/search.entity';

export type Message = {
  title: string;
  prefix: string;
  results: string[];
  postfix: string;
};

@Injectable()
export class MessageService {
  public async constructMessage(results: any[], search: Search, run: SearchRun): Promise<Message> {
    const { title, prefix, postfix } = search.config.notification.format;
    const message = {
      title,
      prefix,
      results: results.map((result) => formatter(result)),
      postfix,
    };
    return message;
  }

  private formatter(result: any): string {
    const { title, url, description } = result;
    return `${title} - ${url} - ${description}`;
  }
}

const formatter = (result: any) => {
  return Object.entries(result)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: ${value.join(', ')}`;
      } else if (typeof value === 'object') {
        return formatter(value);
      }
      return `${key}: ${value}`;
    })
    .join(', ');
};
