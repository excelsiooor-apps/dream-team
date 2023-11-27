import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Game } from './Game';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name?: string;
  @OneToMany(() => Game, (game: any) => game)
  games?: Game[];
}