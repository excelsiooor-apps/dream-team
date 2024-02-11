import { ModeType } from './../types/ModeType';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class Mode {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: ModeType,
    default: ModeType.OneToOne,
  })
  value?: number;
}