import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { ITask, Task, TaskStatus } from './task.model';
import { isIn } from 'class-validator';

@Injectable()
export class TaskService {
  private tasks: ITask[] = [];

  getAll(): ITask[] {
    return this.tasks;
  }

  getById(id: string): ITask {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) throw new NotFoundException(`task with ${id} not found`);

    return found;
  }

  create(newTask: Task): { message: string; task?: ITask } {
    const { title, description } = newTask;

    const task: ITask = {
      title,
      description,
      id: uuid(),
      status: TaskStatus.Open,
    };

    this.tasks.push(task);

    return { message: 'Created new Task!', task: task };
  }

  removeTask(id: string): { message: string } {
    this.getById(id);

    this.tasks.splice(
      this.tasks.findIndex((task) => id === task.id),
      1,
    );

    return { message: 'Removed' };
  }

  update(id: string, newTAsk: Task): { message: string; task: ITask } {
    const { title, description } = newTAsk;

    const oldTask: ITask = this.getById(id);

    oldTask.title = title ? title : oldTask.title;
    oldTask.description = description ? description : oldTask.description;

    this.tasks.splice(
      this.tasks.findIndex((task) => task.id === id),
      1,
      oldTask,
    );

    return { message: 'updated', task: oldTask };
  }

  UpdateStatus(id: string, newStatus: TaskStatus) {
    const oldTask = this.getById(id);

    if (
      !isIn(newStatus, [
        TaskStatus.Open,
        TaskStatus.Done,
        TaskStatus.Processing,
      ])
    )
      throw new BadRequestException();

    oldTask.status = newStatus;

    this.tasks.splice(
      this.tasks.findIndex((task) => task.id === id),
      1,
      oldTask,
    );

    return { message: 'status updated', task: oldTask };
  }
}
