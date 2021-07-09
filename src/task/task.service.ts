import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TaskDTO, TaskStatus } from './task.model';
import { isIn } from 'class-validator';
import { TaskRepository } from '../model/task.repository';
import { Task } from '../model/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private TaskRepo: TaskRepository,
  ) {}

  async getAll(): Promise<Task[]> {
    return await this.TaskRepo.find();
  }

  async getById(id: string): Promise<Task> {
    const found = await this.TaskRepo.findOne(id);

    if (!found) throw new NotFoundException(`task with ${id} not found`);

    return found;
  }

  async create(newTask: TaskDTO): Promise<{ message: string; task?: Task }> {
    const task = await this.TaskRepo.createAndSave(newTask);

    return { message: 'Created new Task!', task: task };
  }

  async removeTask(id: string): Promise<{ message: string }> {
    await this.getById(id);

    await this.TaskRepo.delete(id);

    return { message: 'Removed' };
  }

  async update(
    id: string,
    newTAsk: TaskDTO,
  ): Promise<{ message: string; task: Task }> {
    const task = await this.TaskRepo.update(id, newTAsk);

    return { message: 'updated', task };
  }

  async UpdateStatus(id: string, newStatus: TaskStatus) {
    await this.getById(id);

    if (
      !isIn(newStatus, [
        TaskStatus.Open,
        TaskStatus.Done,
        TaskStatus.Processing,
      ])
    )
      throw new BadRequestException('status incorrect!');

    const task = await this.TaskRepo.update(id, { status: newStatus });

    return { message: 'status updated', task };
  }
}
