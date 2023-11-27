import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { User } from './User';
import { Status } from './Status';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  RegistrationId?:number
  @ManyToMany(() => User)
  @JoinTable()
  teamMembers?: User[];
  @ManyToOne(() => Status, (status) => status.games)
  status?: Status;
}