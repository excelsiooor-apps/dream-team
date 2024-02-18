import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Match } from './Match';
import { Rating } from './Rating';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username?: string;

  @Column()
  TelegramId!: number;  

  @ManyToMany(() => Match)
  matchs!: Match[];

  @OneToOne(() => Rating, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  rating!: Rating;
}