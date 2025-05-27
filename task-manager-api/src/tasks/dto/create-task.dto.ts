import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty({ message: 'Title is required' })
    title: string;

    @IsOptional()
    @IsString({ message: 'Description must be a valid string' })
    description?: string;
}
