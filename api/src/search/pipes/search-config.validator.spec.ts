import { SearchConfigTransformer } from './search-config.validator';
import { TransformFnParams } from 'class-transformer';

const mockConfig = {
  extraction: {
    sources: [
      {
        name: 'GPM Search',
        type: 'grill-area',
        config: {
          from: '12-01-2022',
          to: '12-31-2022',
          areas: [0, 1],
        },
      },
    ],
  },
  refinement: {
    operators: [],
  },
  notification: {
    channels: [
      {
        type: 'slack',
        config: {
          webhook: 'hook',
        },
      },
      {
        type: 'email',
        config: {
          to: 'ognjen.bostjancic@gmail.com',
        },
      },
    ],
    format: {
      title: 'Grill search',
      prefix: "Here's what changed:",
      postfix: 'You can find out more at ...',
      date: 'dd.MM.yyyy',
    },
  },
};

const mockFnParams = (config) => ({ value: config } as TransformFnParams);

describe('SearchConfigTransformer', () => {
  it('should call validate that the config contains extraction, refienement', () => {
    const config = SearchConfigTransformer.transform(mockFnParams(mockConfig));
    expect(config).toEqual(mockConfig);
  });
});
