import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinTable,
  ManyToMany
} from 'typeorm';
import { Status } from './Status';
import { Mode } from './Mode';
import { MatchResult } from './MatchResult';
import { Player } from './Player';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  createdAt?: Date;

  @OneToOne(() => Status, (status) => status.value)
  statusId?: number;

  @OneToOne(() => Mode, (mode) => mode.value)
  modeId?: number;

  @ManyToMany(() => Player, player => player.matchs) 
  @JoinTable() 
  players!: Player[];
  
  @OneToMany(() => MatchResult, matche => matche.match)
  result!: MatchResult[];
}