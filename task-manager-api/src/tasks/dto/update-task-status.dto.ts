import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskStatusDto {
    @IsNotEmpty({ message: 'Status is required' })
    @IsEnum(TaskStatus)
    status: TaskStatus;
}
