import { IsNumber, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateWineDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsString()
  vol_alcohol: string;

  @IsString()
  brand: string;

  @IsNumber()
  year: number;

  @IsNumber()
  type_id: number;
}
