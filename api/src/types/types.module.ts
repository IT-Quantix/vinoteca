import { Module } from '@nestjs/common';
import { TypesController } from './types.controller';
import { TypesService } from './types.service';
import { Type } from './entities/type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Type])],
  controllers: [TypesController],
  providers: [TypesService]
})
export class TypesModule {}
