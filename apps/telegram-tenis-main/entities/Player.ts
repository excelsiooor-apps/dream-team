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

  @ManyToMany(()=>Match , match => match.players)
  matchs!: Match[];

  @OneToOne(() => Rating, rating => rating.id, { cascade: true }) // Один пользователь имеет один профиль
  @JoinColumn()
  rating!: Rating;
}