import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';

const mockSearch = {
  name: 'GPM Search',
  schedule: '0 */5 * * * *',
  created: '2022-11-14T15:22:29.447Z',
  updated: '2022-11-14T15:22:29.447Z',
  config: {
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
      operators: [
        {
          type: 'group',
          by: 'area',
        },
      ],
    },
    notification: {
      channels: [
        {
          type: 'slack',
          config: {
            webhook: 'https://hooks.slack.com/services/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',
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
  },
};

describe('SearchController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a search', async () => {
    const res = await request(app.getHttpServer()).post('/searches').send(mockSearch);
    expect(res.status).toBe(201);
    const check = await request(app.getHttpServer()).get(`/searches/${res.body.id}`);
    expect(check.status).toBe(200);
    expect(check.body).toEqual(res.body);
  });

  it('should run a search', async () => {
    const { body: search } = await request(app.getHttpServer()).post('/searches').send(mockSearch);

    const res = await request(app.getHttpServer()).post(`/searches/${search.id}/runs`);
    expect(res.status).toBe(201);
    expect(res.body.results.length).toBe(4);
  });
});
