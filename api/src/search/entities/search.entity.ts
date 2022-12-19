import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { ExtractionConfig } from '../../extraction/config.entity';
import { NotificationConfig } from '../../notification/config.entity';
import { RefinementConfig } from '../../refinement/config.entity';
import { SearchRun } from './search-run.entity';

type JSONSchema = Record<string, any>;
export class SearchConfig {
  extraction: ExtractionConfig;
  input?: JSONSchema;
  refinement: RefinementConfig;
  output?: JSONSchema;
  notification: NotificationConfig;
}

@Entity()
export class Search {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @DeleteDateColumn()
  deleted?: Date;

  @Column()
  schedule: string;

  @Column({ default: true })
  enabled: boolean;

  @Column({ type: 'simple-json' })
  config: SearchConfig;

  @OneToMany(() => SearchRun, (run) => run.search, { cascade: true })
  runs: SearchRun[];
}
