import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateTypeDto {
  @IsOptional()
  @IsString()
  name?: string;
}