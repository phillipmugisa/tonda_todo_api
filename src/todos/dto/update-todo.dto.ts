import { IsString, IsOptional, IsBoolean, Length } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @Length(1, 255)
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
