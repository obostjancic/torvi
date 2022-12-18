import axios, { AxiosInstance } from 'axios';

export interface Search {
  id: number;
  name: string;
  schedule: string;
  created: Date;
  updated: Date;
  config: Record<string, any>;
  enabled: boolean;
}

export class SearchApi {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8080/api',
    });
  }

  public async getSearches(): Promise<Search[]> {
    const response = await this.instance.get('/searches');
    return response.data.map(deserialize);
  }

  public async updateSearch(id: number, search: Partial<Search>): Promise<Search> {
    const response = await this.instance.patch(`/searches/${id}`, search);
    return deserialize(response.data);
  }

  public async deleteSearch(id: number): Promise<void> {
    await this.instance.delete(`/searches/${id}`);
  }
}

const deserialize = (data: Record<string, any>): Search => {
  return {
    id: data.id,
    name: data.name,
    schedule: data.schedule,
    created: new Date(data.created),
    updated: new Date(data.updated),
    config: data.config,
    enabled: data.enabled,
  };
};
