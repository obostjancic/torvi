import { TransformFnParams } from 'class-transformer';
import { ExtractionConfig } from '../../extraction/config.entity';
import { NotificationConfig } from '../../notification/config.entity';
import { SearchConfig } from '../entities/search.entity';

export class SearchConfigTransformer {
  public static transform(value: TransformFnParams) {
    const { value: config } = value;
    config.extraction = this.validateExtraction(config.extraction);
    config.refinement = this.validateRefinement(config.refinement);
    config.notification = this.validateNotification(config.notification);

    return config;
  }

  private static validateExtraction(config: ExtractionConfig) {
    const { sources } = config;
    if (!sources && !Array.isArray(sources)) {
      throw new Error('Extraction config must have sources');
    }
    for (const source of sources) {
      if (!source.type) {
        throw new Error('Extraction source must have a type');
      }
    }

    return config;
  }

  private static validateRefinement(config: SearchConfig) {
    return config;
  }

  private static validateNotification(config: NotificationConfig) {
    const defaultFormat = {
      title: 'Search results',
      prefix: 'Here are your results:',
      postfix: '',
      date: 'dd.MM.yyyy',
    };

    config.format = { ...defaultFormat, ...config.format };
    return config;
  }
}
