import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { StatusType } from '../types/StatusType';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({
    type: 'enum',
    enum: StatusType,
    default: StatusType.Pending,
  })
  value!: StatusType;
}