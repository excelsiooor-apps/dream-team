import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany
} from 'typeorm';
import { Game, } from './Game';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username?: string;

  @Column()
  TelegramId!: number;

  @ManyToMany(() => Game)
  @JoinTable()
  games?: Game[];

  @Column()
  victory?:number;
  @Column()
  defeats?: number
  
  calculateCountGame(): number {
    return (this.victory || 0) + (this.defeats || 0);
  }
  calculateWinningPercentage(): number {
    const totalGames = (this.victory || 0) + (this.defeats || 0);
    return totalGames > 0 ? ((this.victory || 0) / totalGames) * 100 : 0;
  }
}