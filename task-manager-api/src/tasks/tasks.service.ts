import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);
    if (!task) throw new NotFoundException(`Task with ID "${id}" not found`);
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const newTask: Task = {
      id: uuid(),
      title,
      description: description !== undefined ? description : '',
      status: TaskStatus.OPEN,
      createdAt: new Date(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    task.updatedAt = new Date();
    return task;
  }

  deleteTask(id: string): Task {
    const itemForDeletion = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== itemForDeletion.id);
    return itemForDeletion;
  }
}
