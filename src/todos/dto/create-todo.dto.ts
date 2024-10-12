import { IsNotEmpty, IsString, IsOptional, Length, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}