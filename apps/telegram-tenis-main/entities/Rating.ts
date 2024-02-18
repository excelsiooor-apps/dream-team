import {
  Column,
  Entity, OneToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Player } from './Player';



@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Player, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  player!: Player;

  @Column({
    default: 0
  })
  defeat!:number;
  
  @Column({
    default: 0
  })
  victory!:number;

  @Column({
    default: 0
  })
  totalMatches!:number;

  @Column({
    default: 0
  })
  score!:number;

  @Column({
    default: 0
  })
  winGoals!:number;

  @Column({
    default: 0
  })
  defeatGoals!:number;

  @Column({
    default: 0
  })
  totalGoals!:number;
}