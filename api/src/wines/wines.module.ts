import { Module } from '@nestjs/common';
import { WinesController } from './wines.controller';
import { WinesService } from './wines.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wine } from './entities/wine.entity';
import { Type } from 'src/types/entities/type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Wine, Type])],
  controllers: [WinesController],
  providers: [WinesService],
})
export class WinesModule {}
