import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWineDto } from './dto/create-wine.dto';
import { UpdateWineDto } from './dto/update-wine.dto';

@Injectable()
export class WinesService {
  getAllWines() {
    return "wines";
  }

  getWineById(id: string) {
    /* if(!wineFound){
      return new NotFoundException(`Wine with id ${id} not found.`);
    } */
    return 'id: ' + id;
  }

  createWine(wine: CreateWineDto) {
    return wine;
  }

  deleteWine() {
    return 'Borrar vino';
  }

  updateWine(wine: UpdateWineDto) {
    return wine;
  }
}
