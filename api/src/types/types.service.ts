import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from './entities/type.entity';
import { Repository } from 'typeorm';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type)
    private readonly typesRepository: Repository<Type>,
  ) {}

  async getAllTypes() {
    const types = await this.typesRepository.find({
      relations: ['wines'],
    });
    
    return {
      message: 'Tipos obtenidos exitosamente',
      data: types,
      statusCode: 200,
    };
  }

  async getTypeById(id: number) {
    const type = await this.findTypeById(id);

    return {
      message: 'Tipo obtenido exitosamente',
      data: type,
      statusCode: 200,
    };
  }

  async createType(typeDto: CreateTypeDto) {
    const existingType = await this.typesRepository.findOne({
      where: { name: typeDto.name },
    });

    if (existingType) {
      throw new BadRequestException(`Ya existe un tipo con el nombre '${typeDto.name}'`);
    }

    const newType = this.typesRepository.create(typeDto);
    const savedType = await this.typesRepository.save(newType);

    // Recargar el tipo con las relaciones si es necesario
    const typeWithRelations = await this.typesRepository.findOne({
      where: { id: savedType.id },
      relations: ['wines'],
    });

    return {
      message: 'Tipo creado exitosamente',
      data: typeWithRelations,
      statusCode: 201,
    };
  }

  async deleteType(id: number) {
    const type = await this.findTypeById(id);
    
    if (type.wines && type.wines.length > 0) {
      throw new BadRequestException(`No se puede eliminar el tipo con ID ${id} porque tiene vinos asociados`);
    }

    await this.typesRepository.remove(type);
    
    return {
      message: `Tipo con ID ${id} eliminado correctamente`,
      statusCode: 200,
    };
  }

  async updateType(id: number, updateTypeDto: UpdateTypeDto) {
    const type = await this.findTypeById(id);

    if (updateTypeDto.name) {
      const existingType = await this.typesRepository.findOne({
        where: { name: updateTypeDto.name },
      });

      if (existingType && existingType.id !== id) {
        throw new BadRequestException(`Ya existe un tipo con el nombre '${updateTypeDto.name}'`);
      }
    }

    const updatedType = this.typesRepository.merge(type, updateTypeDto);
    const savedType = await this.typesRepository.save(updatedType);

    // Recargar el tipo con las relaciones actualizadas
    const typeWithRelations = await this.typesRepository.findOne({
      where: { id: savedType.id },
      relations: ['wines'],
    });

    return {
      message: 'Tipo actualizado exitosamente',
      data: typeWithRelations,
      statusCode: 200,
    };
  }

  // Método interno para obtener el tipo sin la estructura de respuesta
  private async findTypeById(id: number): Promise<Type> {
    const type = await this.typesRepository.findOne({
      where: { id },
      relations: ['wines'],
    });

    if (!type) {
      throw new NotFoundException(`Tipo con ID ${id} no encontrado`);
    }

    return type;
  }
}