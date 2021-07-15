/* eslint-disable prettier/prettier */
import { TaskDTO, TaskStatus } from '../task/task.model';
import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createAndSave(newTask: TaskDTO) {
    const { title, description } = newTask;

    const task = new Task();
    task.title = title;
    task.description = description;

    return await task.save();
  }
  async update(
    id: string,
    newTask: { title?: string; description?: string; status?: TaskStatus },
  ): Promise<any> {
    const task = await this.findOne(id);

    const { title, description, status } = newTask;

    task.description = description || task.description;
    task.title = title || task.title;
    task.status = status || task.status;

    return await task.save();
  }
}
