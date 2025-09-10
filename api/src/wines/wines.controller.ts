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
  winesService: WinesService;

  constructor(winesService: WinesService) {
    this.winesService = winesService;
  }

  @Get()
  getAllWines() {
    return this.winesService.getAllWines();
  }

  @Get('/:id')
  getWineById(@Param('id') id: string) {
    return this.winesService.getWineById(id);
  }

  @Post()
  createWine(@Body() wine: CreateWineDto) {
    return this.winesService.createWine(wine);
  }

  @Delete()
  deleteWine() {
    return this.winesService.deleteWine();
  }

  @Patch()
  patchWine(@Body() wine: UpdateWineDto) {
    return this.winesService.updateWine(wine);
  }
}
