/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export interface ITask {
  title: string;
  description: string;
  status: TaskStatus;
  id: string;
}

export enum TaskStatus {
  Open = 'Open',
  Done = 'Done',
  Processing = 'Processing',
}

export class Task {
  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  @IsString()
  public title: string;
}
