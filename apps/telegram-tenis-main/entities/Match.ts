import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinTable,
  ManyToMany
} from 'typeorm';
import { Mode } from './Mode';
import { MatchResult } from './MatchResult';
import { Player } from './Player';
import { StatusType } from '../types/StatusType';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  createdAt?: Date;

  @Column({
    type: 'enum',
    enum: StatusType,
    default: StatusType.Pending,
  })
  status!: StatusType;

  @OneToOne(() => Mode, (mode) => mode.value)
  modeId?: number;

  @ManyToMany(() => Player, player => player.matchs) 
  @JoinTable() 
  players!: Player[];
  
  @OneToMany(() => MatchResult, matche => matche.match)
  result!: MatchResult[];
}