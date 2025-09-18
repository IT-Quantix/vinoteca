import { 
  IsNumber, 
  IsString, 
  IsOptional, 
  Min, 
  Max, 
  Length, 
  IsPositive 
} from 'class-validator';

export class UpdateWineDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser un valor positivo' })
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  vol_alcohol?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El año debe ser un número' })
  @Min(1000, { message: 'El año debe ser mayor a 1000' })
  @Max(new Date().getFullYear() + 1, { message: 'El año no puede ser futuro' })
  year?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El type_id debe ser un número' })
  @IsPositive({ message: 'El type_id debe ser un valor positivo' })
  type_id?: number;
}