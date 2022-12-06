import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import { mockSearch } from '../utils/mocks';

describe('SearchController (e2e)', () => {
  let app: INestApplication;
  let server;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  it('should create a search', async () => {
    const res = await request(server).post('/searches').send(mockSearch);

    expect(res.status).toBe(201);

    const check = await request(server).get(`/searches/${res.body.id}`);
    expect(check.status).toBe(200);
    expect(check.body).toEqual(res.body);
  });

  it('should run a search', async () => {
    const { body: search } = await request(server).post('/searches').send(mockSearch);

    const res = await request(server).post(`/searches/${search.id}/runs`);

    expect(res.status).toBe(201);
    expect(res.body.extractedResults.length).toBe(4);
    expect(res.body.refinedResults.length).toBe(1);
  });

  afterEach(async () => {
    await app.close();
  });
});
