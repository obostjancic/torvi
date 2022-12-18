import { Injectable, Logger } from '@nestjs/common';
import { ExtractionStrategy } from '../strategy.interface';
import { JSONAPIConfig, JSONAPIResult } from './json-api.interface';

@Injectable()
export class MockJSONAPIStrategy implements ExtractionStrategy<JSONAPIResult> {
  private readonly logger: Logger = new Logger(MockJSONAPIStrategy.name);

  constructor(private readonly config: JSONAPIConfig) {}

  async run(): Promise<JSONAPIResult[]> {
    return mockData;
  }
}

const mockData = [
  {
    price: '$16.99',
    name: 'Founders All Day IPA',
    rating: {
      average: 4.411243509154233,
      reviews: 453,
    },
    image: 'https://www.totalwine.com/media/sys_master/twmmedia/h00/h94/11891416367134.png',
    id: 1,
  },
  {
    price: '$13.99',
    name: 'Blue Moon Belgian White Belgian-Style Wheat Ale',
    rating: {
      average: 4.775260833383482,
      reviews: 305,
    },
    image: 'https://www.totalwine.com/media/sys_master/twmmedia/he8/h67/11931543830558.png',
    id: 2,
  },
  {
    price: '$16.99',
    name: 'Guinness Extra Stout',
    rating: {
      average: 3.9785961474594638,
      reviews: 119,
    },
    image: 'https://www.totalwine.com/media/sys_master/twmmedia/h50/h90/11996630056990.png',
    id: 3,
  },
  {
    price: '$8.99',
    name: 'Guinness Extra Stout',
    rating: {
      average: 3.5135460961961718,
      reviews: 199,
    },
    image: 'https://www.totalwine.com/media/sys_master/twmmedia/h35/he7/11996577726494.png',
    id: 4,
  },
  {
    price: '$15.49',
    name: 'Sierra Nevada Pale Ale',
    rating: {
      average: 4.266364643483868,
      reviews: 414,
    },
    image: 'https://www.totalwine.com/media/sys_master/twmmedia/h19/h43/11735160193054.png',
    id: 5,
  },
];
