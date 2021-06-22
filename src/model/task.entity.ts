/* eslint-disable prettier/prettier */
import { TaskStatus } from 'src/task/task.model';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '200' })
  title: string;

  @Column({ type: 'varchar', length: '200' })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.Open,
  })
  status: TaskStatus;
}
