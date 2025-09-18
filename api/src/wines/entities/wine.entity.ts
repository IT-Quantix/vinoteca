import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsNumber, IsString, IsOptional, IsDecimal } from 'class-validator';
import { Type } from 'src/types/entities/type.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'wines' })
export class Wine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  @IsString()
  name: string;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @Column({ type: 'text' })
  @IsString()
  description: string;

  @Column({
    name: 'vol_alcohol',
    type: 'decimal',
    precision: 4,
    scale: 1,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  @IsNumber({ maxDecimalPlaces: 1 })
  vol_alcohol: number;

  @Column({ type: 'varchar', length: 50 })
  @IsString()
  brand: string;

  @Column({ type: 'int' })
  @IsNumber()
  year: number;

  @Column({ name: 'type_id', type: 'int' })
  @IsNumber()
  @Exclude() 
  type_id: number;

  @ManyToOne(() => Type, (type) => type.wines)
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}