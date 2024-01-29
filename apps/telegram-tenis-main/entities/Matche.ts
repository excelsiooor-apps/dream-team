import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne
} from 'typeorm';
import { Status } from './Status';
import { Mode } from './Mode';

@Entity()
export class Matche {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  createdAt?: Date;

  @OneToOne(() => Status, (status) => status.value)
  statusId?: number;

  @OneToOne(() => Mode, (mode) => mode.value)
  modeId?: number;
}