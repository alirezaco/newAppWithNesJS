import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ITask, Task, TaskStatus } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAll(): ITask[] {
    return this.taskService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): ITask {
    return this.taskService.getById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() task: Task) {
    return this.taskService.create(task);
  }

  @Delete(':id')
  removeTask(@Param('id') id: string) {
    return this.taskService.removeTask(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() task: Task) {
    return this.taskService.update(id, task);
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body('status') status: TaskStatus) {
    return this.taskService.UpdateStatus(id, status);
  }
}
