export const WillhabenSourceType = 'willhaben';

export type WillhabenConfig = {
  url: string;
};

export type WillhabenSource = {
  type: typeof WillhabenSourceType;
  config: WillhabenConfig;
};

export type WillhabenResult = {
  id: string;
  title: string;
  price: number;
  url: string;
};

// Generated by https://quicktype.io

export interface RawWillhabenResult {
  id: string;
  description: string;
  attributes: { attribute: { name: string; values: string[] }[] };
}