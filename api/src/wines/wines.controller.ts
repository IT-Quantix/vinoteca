import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WinesService } from './wines.service';
import { CreateWineDto } from './dto/create-wine.dto';
import { UpdateWineDto } from './dto/update-wine.dto';

@Controller('/wines')
export class WinesController {
  constructor(private readonly winesService: WinesService) {}

  @Get()
  getAllWines() {
    return this.winesService.getAllWines();
  }

  @Get('/:id')
  getWineById(@Param('id') id: number) {
    return this.winesService.getWineById(id);
  }

  @Post()
  createWine(@Body() wine: CreateWineDto) {
    return this.winesService.createWine(wine);
  }

  @Delete('/:id')
  deleteWine(@Param('id') id: number) {
    return this.winesService.deleteWine(id);
  }

  @Patch('/:id')
  patchWine(@Param('id') id: number, @Body() wine: UpdateWineDto) {
    return this.winesService.updateWine(id, wine);
  }
}
