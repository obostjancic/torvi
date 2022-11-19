import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Search } from './search.entity';

@Entity()
export class SearchRun {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Search, (search) => search.runs)
  @JoinColumn()
  search: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ type: 'simple-json', nullable: true })
  extractedResults?: unknown[];

  @Column({ type: 'simple-json', nullable: true })
  refinedResults?: unknown[];
}
