import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Wine } from './entities/wine.entity';
import { Type } from '../types/entities/type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWineDto } from './dto/create-wine.dto';
import { UpdateWineDto } from './dto/update-wine.dto';

@Injectable()
export class WinesService {
  constructor(
    @InjectRepository(Wine)
    private readonly winesRepository: Repository<Wine>,
    @InjectRepository(Type)
    private readonly typesRepository: Repository<Type>,
  ) {}

  async getAllWines() {
    const wines = await this.winesRepository.find({
      relations: ['type'],
    });

    return {
      message: 'Vinos obtenidos exitosamente',
      data: wines,
      statusCode: 200,
    };
  }

  async getWineById(id: number) {
    const wine = await this.findWineById(id);

    return {
      message: 'Vino obtenido exitosamente',
      data: wine,
      statusCode: 200,
    };
  }

  async createWine(wineDto: CreateWineDto) {
    const type = await this.typesRepository.findOne({
      where: { id: wineDto.type_id },
    });

    if (!type) {
      throw new BadRequestException(
        `Tipo con ID ${wineDto.type_id} no encontrado`,
      );
    }

    const newWine = this.winesRepository.create({
      ...wineDto,
      type: type,
    });

    const savedWine = await this.winesRepository.save(newWine);

    const wineWithRelations = await this.winesRepository.findOne({
      where: { id: savedWine.id },
      relations: ['type'],
    });

    return {
      message: 'Vino creado exitosamente',
      data: wineWithRelations,
      statusCode: 201,
    };
  }

  async deleteWine(id: number) {
    const wine = await this.findWineById(id);

    await this.winesRepository.remove(wine);

    return {
      message: `Vino con ID ${id} eliminado correctamente`,
      statusCode: 200,
    };
  }

  async updateWine(id: number, updateWineDto: UpdateWineDto) {
    const wine = await this.findWineById(id);

    // verificar el tipo si se está actualizando el type_id
    if (updateWineDto.type_id !== undefined) {
      const type = await this.typesRepository.findOne({
        where: { id: updateWineDto.type_id },
      });

      if (!type) {
        throw new BadRequestException(
          `Tipo con ID ${updateWineDto.type_id} no encontrado`,
        );
      }
      wine.type = type;
    }

    // actualizar solo campos enviados
    Object.keys(updateWineDto).forEach((key) => {
      if (key !== 'type_id' && updateWineDto[key] !== undefined) {
        wine[key] = updateWineDto[key];
      }
    });

    wine.updatedAt = new Date();
    const updatedWine = await this.winesRepository.save(wine);

    return {
      message: 'Vino actualizado exitosamente',
      data: updatedWine,
      statusCode: 200,
    };
  }

  private async findWineById(id: number): Promise<Wine> {
    const wine = await this.winesRepository.findOne({
      where: { id },
      relations: ['type'],
    });

    if (!wine) {
      throw new NotFoundException(`Vino con ID ${id} no encontrado`);
    }

    return wine;
  }
}
