import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { Match } from './Match';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username?: string;

  @Column()
  TelegramId!: number;  

  @ManyToMany(()=>Match , match => match.players)
  matchs!: Match[]
}