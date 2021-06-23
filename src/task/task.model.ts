/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export enum TaskStatus {
  Open = 'Open',
  Done = 'Done',
  Processing = 'Processing',
}

export class TaskDTO {
  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  @IsString()
  public title: string;
}
