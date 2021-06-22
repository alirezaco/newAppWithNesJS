/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  createAndSave(title, description) {
    const task = new Task();
    task.title = title;
    task.description = description;
    return this.manager.save(task);
  }
}
