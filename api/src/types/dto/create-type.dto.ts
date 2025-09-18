import { IsNumber, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  name: string;
}