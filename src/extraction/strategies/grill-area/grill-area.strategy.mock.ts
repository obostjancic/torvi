import { Injectable, Logger } from '@nestjs/common';
import { ExtractionStrategy } from '../strategy.interface';

interface GrillAreaResult {
  area: number;
  day: Date;
}

@Injectable()
export class MockGrillAreaStrategy implements ExtractionStrategy<GrillAreaResult> {
  private readonly logger: Logger = new Logger(MockGrillAreaStrategy.name);

  constructor(private readonly config: Record<string, any>) {}

  async run() {
    this.logger.log('Fetching mock data');
    try {
      const from = new Date(this.config.from);
      const to = new Date(this.config.to);

      const areas = mockData;

      const flatData = areas
        .map((area) =>
          area.days.map((day) => ({
            area: area.id,
            day,
          })),
        )
        .flat();

      const filteredData = flatData.filter(
        ({ area, day }) => day >= from && day <= to && this.config.areas.includes(area),
      );

      return filteredData;
    } catch (e) {
      console.log('Error fetching grill areas', e);
      return [];
    }
  }
}

export const mockData = [
  {
    id: 0,
    days: [
      new Date('2022-10-10T22:00:00.000Z'),
      new Date('2022-10-11T22:00:00.000Z'),
      new Date('2022-10-18T22:00:00.000Z'),
      new Date('2022-10-19T22:00:00.000Z'),
      new Date('2022-10-23T22:00:00.000Z'),
    ],
  },
  {
    id: 1,
    days: [
      new Date('2022-10-09T22:00:00.000Z'),
      new Date('2022-10-10T22:00:00.000Z'),
      new Date('2022-10-11T22:00:00.000Z'),
      new Date('2022-10-12T22:00:00.000Z'),
      new Date('2022-10-16T22:00:00.000Z'),
      new Date('2022-10-17T22:00:00.000Z'),
      new Date('2022-10-18T22:00:00.000Z'),
      new Date('2022-10-19T22:00:00.000Z'),
      new Date('2022-10-23T22:00:00.000Z'),
      new Date('2022-10-24T22:00:00.000Z'),
      new Date('2022-10-26T22:00:00.000Z'),
      new Date('2022-10-27T22:00:00.000Z'),
    ],
  },
  {
    id: 2,
    days: [
      new Date('2022-10-03T22:00:00.000Z'),
      new Date('2022-10-09T22:00:00.000Z'),
      new Date('2022-10-10T22:00:00.000Z'),
      new Date('2022-10-11T22:00:00.000Z'),
      new Date('2022-10-12T22:00:00.000Z'),
      new Date('2022-10-16T22:00:00.000Z'),
      new Date('2022-10-17T22:00:00.000Z'),
      new Date('2022-10-18T22:00:00.000Z'),
      new Date('2022-10-19T22:00:00.000Z'),
      new Date('2022-10-23T22:00:00.000Z'),
      new Date('2022-10-24T22:00:00.000Z'),
      new Date('2022-10-26T22:00:00.000Z'),
      new Date('2022-10-29T22:00:00.000Z'),
    ],
  },
  {
    id: 3,
    days: [
      new Date('2022-10-02T22:00:00.000Z'),
      new Date('2022-10-03T22:00:00.000Z'),
      new Date('2022-10-04T22:00:00.000Z'),
      new Date('2022-10-09T22:00:00.000Z'),
      new Date('2022-10-10T22:00:00.000Z'),
      new Date('2022-10-11T22:00:00.000Z'),
      new Date('2022-10-12T22:00:00.000Z'),
      new Date('2022-10-16T22:00:00.000Z'),
      new Date('2022-10-17T22:00:00.000Z'),
      new Date('2022-10-18T22:00:00.000Z'),
      new Date('2022-10-19T22:00:00.000Z'),
      new Date('2022-10-23T22:00:00.000Z'),
      new Date('2022-10-26T22:00:00.000Z'),
    ],
  },
  {
    id: 4,
    days: [
      new Date('2022-10-04T22:00:00.000Z'),
      new Date('2022-10-09T22:00:00.000Z'),
      new Date('2022-10-10T22:00:00.000Z'),
      new Date('2022-10-11T22:00:00.000Z'),
      new Date('2022-10-16T22:00:00.000Z'),
      new Date('2022-10-17T22:00:00.000Z'),
      new Date('2022-10-18T22:00:00.000Z'),
      new Date('2022-10-19T22:00:00.000Z'),
      new Date('2022-10-23T22:00:00.000Z'),
      new Date('2022-10-24T22:00:00.000Z'),
      new Date('2022-10-26T22:00:00.000Z'),
      new Date('2022-10-27T22:00:00.000Z'),
    ],
  },
  {
    id: 6,
    days: [
      new Date('2022-10-02T22:00:00.000Z'),
      new Date('2022-10-04T22:00:00.000Z'),
      new Date('2022-10-05T22:00:00.000Z'),
      new Date('2022-10-09T22:00:00.000Z'),
      new Date('2022-10-10T22:00:00.000Z'),
      new Date('2022-10-11T22:00:00.000Z'),
      new Date('2022-10-16T22:00:00.000Z'),
      new Date('2022-10-17T22:00:00.000Z'),
      new Date('2022-10-18T22:00:00.000Z'),
      new Date('2022-10-19T22:00:00.000Z'),
      new Date('2022-10-23T22:00:00.000Z'),
      new Date('2022-10-24T22:00:00.000Z'),
      new Date('2022-10-26T22:00:00.000Z'),
      new Date('2022-10-27T22:00:00.000Z'),
      new Date('2022-10-29T22:00:00.000Z'),
      new Date('2022-10-30T23:00:00.000Z'),
    ],
  },
  {
    id: 8,
    days: [
      new Date('2022-10-02T22:00:00.000Z'),
      new Date('2022-10-03T22:00:00.000Z'),
      new Date('2022-10-04T22:00:00.000Z'),
      new Date('2022-10-09T22:00:00.000Z'),
      new Date('2022-10-10T22:00:00.000Z'),
      new Date('2022-10-11T22:00:00.000Z'),
      new Date('2022-10-16T22:00:00.000Z'),
      new Date('2022-10-17T22:00:00.000Z'),
      new Date('2022-10-18T22:00:00.000Z'),
      new Date('2022-10-19T22:00:00.000Z'),
      new Date('2022-10-20T22:00:00.000Z'),
      new Date('2022-10-22T22:00:00.000Z'),
      new Date('2022-10-23T22:00:00.000Z'),
      new Date('2022-10-24T22:00:00.000Z'),
      new Date('2022-10-25T22:00:00.000Z'),
      new Date('2022-10-26T22:00:00.000Z'),
      new Date('2022-10-27T22:00:00.000Z'),
      new Date('2022-10-29T22:00:00.000Z'),
      new Date('2022-10-30T23:00:00.000Z'),
    ],
  },
  {
    id: 9,
    days: [
      new Date('2022-10-11T22:00:00.000Z'),
      new Date('2022-10-16T22:00:00.000Z'),
      new Date('2022-10-17T22:00:00.000Z'),
      new Date('2022-10-18T22:00:00.000Z'),
      new Date('2022-10-19T22:00:00.000Z'),
      new Date('2022-10-23T22:00:00.000Z'),
      new Date('2022-10-26T22:00:00.000Z'),
    ],
  },
  {
    id: 10,
    days: [
      new Date('2022-10-02T22:00:00.000Z'),
      new Date('2022-10-04T22:00:00.000Z'),
      new Date('2022-10-09T22:00:00.000Z'),
      new Date('2022-10-10T22:00:00.000Z'),
      new Date('2022-10-11T22:00:00.000Z'),
      new Date('2022-10-12T22:00:00.000Z'),
      new Date('2022-10-16T22:00:00.000Z'),
      new Date('2022-10-17T22:00:00.000Z'),
      new Date('2022-10-18T22:00:00.000Z'),
      new Date('2022-10-19T22:00:00.000Z'),
      new Date('2022-10-23T22:00:00.000Z'),
      new Date('2022-10-26T22:00:00.000Z'),
      new Date('2022-10-27T22:00:00.000Z'),
      new Date('2022-10-29T22:00:00.000Z'),
      new Date('2022-10-30T23:00:00.000Z'),
    ],
  },
  {
    id: 11,
    days: [
      new Date('2022-10-04T22:00:00.000Z'),
      new Date('2022-10-09T22:00:00.000Z'),
      new Date('2022-10-10T22:00:00.000Z'),
      new Date('2022-10-11T22:00:00.000Z'),
      new Date('2022-10-12T22:00:00.000Z'),
      new Date('2022-10-16T22:00:00.000Z'),
      new Date('2022-10-17T22:00:00.000Z'),
      new Date('2022-10-18T22:00:00.000Z'),
      new Date('2022-10-19T22:00:00.000Z'),
      new Date('2022-10-23T22:00:00.000Z'),
      new Date('2022-10-30T23:00:00.000Z'),
    ],
  },
  {
    id: 12,
    days: [
      new Date('2022-10-04T22:00:00.000Z'),
      new Date('2022-10-09T22:00:00.000Z'),
      new Date('2022-10-11T22:00:00.000Z'),
      new Date('2022-10-16T22:00:00.000Z'),
      new Date('2022-10-17T22:00:00.000Z'),
      new Date('2022-10-18T22:00:00.000Z'),
      new Date('2022-10-19T22:00:00.000Z'),
      new Date('2022-10-23T22:00:00.000Z'),
      new Date('2022-10-24T22:00:00.000Z'),
      new Date('2022-10-26T22:00:00.000Z'),
      new Date('2022-10-27T22:00:00.000Z'),
    ],
  },
  {
    id: 13,
    days: [
      new Date('2022-10-02T22:00:00.000Z'),
      new Date('2022-10-03T22:00:00.000Z'),
      new Date('2022-10-04T22:00:00.000Z'),
      new Date('2022-10-05T22:00:00.000Z'),
      new Date('2022-10-09T22:00:00.000Z'),
      new Date('2022-10-10T22:00:00.000Z'),
      new Date('2022-10-11T22:00:00.000Z'),
      new Date('2022-10-12T22:00:00.000Z'),
      new Date('2022-10-17T22:00:00.000Z'),
      new Date('2022-10-18T22:00:00.000Z'),
      new Date('2022-10-19T22:00:00.000Z'),
      new Date('2022-10-23T22:00:00.000Z'),
      new Date('2022-10-24T22:00:00.000Z'),
      new Date('2022-10-25T22:00:00.000Z'),
      new Date('2022-10-26T22:00:00.000Z'),
      new Date('2022-10-27T22:00:00.000Z'),
    ],
  },
  {
    id: 14,
    days: [
      new Date('2022-10-05T22:00:00.000Z'),
      new Date('2022-10-09T22:00:00.000Z'),
      new Date('2022-10-10T22:00:00.000Z'),
      new Date('2022-10-11T22:00:00.000Z'),
      new Date('2022-10-12T22:00:00.000Z'),
      new Date('2022-10-16T22:00:00.000Z'),
      new Date('2022-10-17T22:00:00.000Z'),
      new Date('2022-10-18T22:00:00.000Z'),
      new Date('2022-10-19T22:00:00.000Z'),
      new Date('2022-10-20T22:00:00.000Z'),
      new Date('2022-10-23T22:00:00.000Z'),
      new Date('2022-10-24T22:00:00.000Z'),
      new Date('2022-10-26T22:00:00.000Z'),
      new Date('2022-10-27T22:00:00.000Z'),
      new Date('2022-10-28T22:00:00.000Z'),
      new Date('2022-10-29T22:00:00.000Z'),
    ],
  },
  {
    id: 15,
    days: [
      new Date('2022-10-02T22:00:00.000Z'),
      new Date('2022-10-03T22:00:00.000Z'),
      new Date('2022-10-04T22:00:00.000Z'),
      new Date('2022-10-05T22:00:00.000Z'),
      new Date('2022-10-09T22:00:00.000Z'),
      new Date('2022-10-10T22:00:00.000Z'),
      new Date('2022-10-11T22:00:00.000Z'),
      new Date('2022-10-12T22:00:00.000Z'),
      new Date('2022-10-16T22:00:00.000Z'),
      new Date('2022-10-17T22:00:00.000Z'),
      new Date('2022-10-18T22:00:00.000Z'),
      new Date('2022-10-19T22:00:00.000Z'),
      new Date('2022-10-20T22:00:00.000Z'),
      new Date('2022-10-23T22:00:00.000Z'),
      new Date('2022-10-24T22:00:00.000Z'),
      new Date('2022-10-26T22:00:00.000Z'),
      new Date('2022-10-27T22:00:00.000Z'),
      new Date('2022-10-28T22:00:00.000Z'),
      new Date('2022-10-29T22:00:00.000Z'),
      new Date('2022-10-30T23:00:00.000Z'),
    ],
  },
  {
    id: 16,
    days: [
      new Date('2022-10-02T22:00:00.000Z'),
      new Date('2022-10-03T22:00:00.000Z'),
      new Date('2022-10-04T22:00:00.000Z'),
      new Date('2022-10-05T22:00:00.000Z'),
      new Date('2022-10-09T22:00:00.000Z'),
      new Date('2022-10-10T22:00:00.000Z'),
      new Date('2022-10-11T22:00:00.000Z'),
      new Date('2022-10-12T22:00:00.000Z'),
      new Date('2022-10-16T22:00:00.000Z'),
      new Date('2022-10-17T22:00:00.000Z'),
      new Date('2022-10-18T22:00:00.000Z'),
      new Date('2022-10-19T22:00:00.000Z'),
      new Date('2022-10-20T22:00:00.000Z'),
      new Date('2022-10-23T22:00:00.000Z'),
      new Date('2022-10-24T22:00:00.000Z'),
      new Date('2022-10-26T22:00:00.000Z'),
      new Date('2022-10-27T22:00:00.000Z'),
      new Date('2022-10-29T22:00:00.000Z'),
      new Date('2022-10-30T23:00:00.000Z'),
    ],
  },
];
