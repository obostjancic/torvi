import { Injectable, Logger } from '@nestjs/common';
import { ExtractionStrategy } from '../strategy.interface';
import { WillhabenConfig, WillhabenResult } from './willhaben.interface';

@Injectable()
export class MockWillhabenStrategy implements ExtractionStrategy<WillhabenResult> {
  private readonly logger: Logger = new Logger(MockWillhabenStrategy.name);

  constructor(private readonly config: WillhabenConfig) {}

  async run(): Promise<WillhabenResult[]> {
    return mockData;
  }
}

const mockData = [
  {
    id: '613425507',
    title: 'PENTHOUSE-MAISONETTE mit ROOFTOP-Terrasse - MEGA Ausblick!! Möbelübernahme auf Wunsch möglich!!',
    price: 2195,
    url: 'https://www.willhaben.at/iad/object?adId=613425507',
  },
  {
    id: '622560054',
    title: 'Faire Altbauperle im 7ten',
    price: 823.99,
    url: 'https://www.willhaben.at/iad/object?adId=622560054',
  },
  {
    id: '613402919',
    title: 'Großzügige 3 Zi-Wohnung mit Balkon, Bestlage des 7. Bezirks, ruhige Nachbarschaft, Tram 5 & Bus 48A',
    price: 2060,
    url: 'https://www.willhaben.at/iad/object?adId=613402919',
  },
  {
    id: '622304343',
    title: '3-ZIMMER-MIETE IN GEPFLEGTEM ALTBAU IN BEVORZUGTER WOHNLAGE! WG-GEEIGNET!',
    price: 1200,
    url: 'https://www.willhaben.at/iad/object?adId=622304343',
  },
];
