import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Get()
  getAllTypes() {
    return this.typesService.getAllTypes();
  }

  @Get('/:id')
  getTypeById(@Param('id') id: number) {
    return this.typesService.getTypeById(id);
  }

  @Post()
  createType(@Body() wine: CreateTypeDto) {
    return this.typesService.createType(wine);
  }

  @Delete('/:id')
  deleteType(@Param('id') id: number) {
    return this.typesService.deleteType(id);
  }

  @Patch('/:id')
  patchType(@Param('id') id: number, @Body() wine: UpdateTypeDto) {
    return this.typesService.updateType(id, wine);
  }
}
