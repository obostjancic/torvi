import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ExtractionConfig } from '../extraction/config.entity';
import { NotificationConfig } from '../notification/config.entity';
import { RefinementConfig } from '../refinement/config.entity';

export class SearchConfig {
  extraction: ExtractionConfig;
  refinement: RefinementConfig;
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

  @Column()
  schedule: string;

  @Column({ type: 'simple-json' })
  config: SearchConfig;
}
