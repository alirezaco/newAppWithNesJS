/* eslint-disable prettier/prettier */
import { Matches, MaxLength, MinLength } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', width: 255, unique: true })
  @MaxLength(40)
  @MinLength(2)
  username: string;

  @Column({ type: 'varchar', width: 255 })
  @MaxLength(40)
  @MinLength(8)
  @Matches(/^(?=(.*[a-z | A-Z]){1,})(?=(.*[\d]){1,})(?!.*\s).{8,}/gm, {
    message: 'password pattern incorrect',
  })
  password: string;

  @Column({ type: 'varchar', width: 255 })
  @MinLength(2)
  fullName: string;

  @Column({ type: 'int', default: 0 })
  age?: number;
}
