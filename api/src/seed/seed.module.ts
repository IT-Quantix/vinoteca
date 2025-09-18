import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Type } from '../types/entities/type.entity';
import { Wine } from '../wines/entities/wine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Type, Wine])],
  providers: [SeedService],
})
export class SeedModule {}