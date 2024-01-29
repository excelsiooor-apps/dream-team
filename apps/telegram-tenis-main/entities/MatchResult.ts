import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne

} from 'typeorm';
import { Match } from './Matche';

@Entity()
export class MatchResult {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Match, matche => matche.result)
  match!: Match;

  @Column()
  isWinner!:boolean;

  @Column()
  winSet!:number;

  @Column()
  defSet!:number;
}