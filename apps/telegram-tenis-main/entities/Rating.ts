import {
  Column,
  Entity, OneToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Player } from './Player';


@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(()=>Player, player => player.id)
  playerId!: number;

  @Column()
  victory!:boolean;

  @Column()
  defeat!:number;
  
  @Column()
  totalMatches!:number;

  @Column()
  score!:number;

  @Column()
  winGoals!:number;

  @Column()
  defeatGoals!:number;
  @Column()
  totalGoals!:number;
}