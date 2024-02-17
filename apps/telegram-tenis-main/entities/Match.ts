import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
  ManyToMany
} from 'typeorm';
import { MatchResult } from './MatchResult';
import { Player } from './Player';
import { StatusType } from '../types/StatusType';
import { ModeType } from '../types/ModeType';

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

  @Column({
    type: 'enum',
    enum: ModeType,
    default: ModeType.OneToOne,
  })
  mode?: ModeType;

  @ManyToMany(() => Player, player => player.matchs) 
  @JoinTable() 
  players!: Player[];
  
  @OneToMany(() => MatchResult, matche => matche.match)
  result!: MatchResult[];
}