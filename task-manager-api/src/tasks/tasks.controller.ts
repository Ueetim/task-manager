import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    // get all tasks
    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    // get single task
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    // create task
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    // update task status
    @Patch('/:id/status')
    @UsePipes(ValidationPipe)
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    ): Task {
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status);
    }

    // delete task
    @Delete('/:id')
    deleteTask(@Param('id') id: string): Task {
        return this.tasksService.deleteTask(id);
    }
}
