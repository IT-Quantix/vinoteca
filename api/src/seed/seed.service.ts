import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from '../types/entities/type.entity';
import { Wine } from '../wines/entities/wine.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
    @InjectRepository(Wine)
    private readonly wineRepository: Repository<Wine>,
  ) {}

  async onModuleInit() {
    //si ya existen datos para no duplicarlos
    const existingTypes = await this.typeRepository.count();
    const existingWines = await this.wineRepository.count();

    if (existingTypes === 0 && existingWines === 0) {
      await this.seedData();
      console.log('Datos iniciales cargados exitosamente');
    }
  }

  private async seedData() {
    // Crear tipos primero
    const types = await this.createTypes();
    
    // Luego crear vinos
    await this.createWines(types);
  }

  private async createTypes(): Promise<Type[]> {
    const typeData = [
      { name: 'Tinto' },
      { name: 'Blanco' },
      { name: 'Rosado' },
      { name: 'Espumante' },
    ];

    const types: Type[] = [];
    for (const type of typeData) {
      const newType = this.typeRepository.create(type);
      types.push(await this.typeRepository.save(newType));
    }

    return types;
  }

  private async createWines(types: Type[]) {
    // Mapear nombres de tipos a IDs
    const typeMap = {};
    types.forEach(type => {
      typeMap[type.name] = type.id;
    });

    const wineData = [
      {
        name: 'Cabernet Sauvignon Reserva',
        price: 35000,
        description: 'Un vino tinto robusto con notas de cassis y cedro, perfecto para carnes rojas.',
        vol_alcohol: 14.5,
        brand: 'Bodega Santa Rita',
        year: 2019,
        type_id: typeMap['Tinto'],
      },
      {
        name: 'Chardonnay Premium',
        price: 1950,
        description: 'Chardonnay elegante con notas de frutas tropicales y un toque de roble francés.',
        vol_alcohol: 13.5,
        brand: 'Viña Concha y Toro',
        year: 2021,
        type_id: typeMap['Blanco'],
      },
      {
        name: 'Malbec Gran Reserva',
        price: 68500,
        description: 'Malbec intenso con aromas de frutas negras y especias, ideal para ocasiones especiales.',
        vol_alcohol: 15.0,
        brand: 'Bodega Catena Zapata',
        year: 2018,
        type_id: typeMap['Tinto'],
      },
      {
        name: 'Rosé de Provence',
        price: 1750,
        description: 'Rosado fresco y delicado con notas florales y cítricas, perfecto para el verano.',
        vol_alcohol: 12.5,
        brand: 'Château Minuty',
        year: 2022,
        type_id: typeMap['Rosado'],
      },
      {
        name: 'Champagne Brut',
        price: 170000,
        description: 'Champagne elegante con burbujas finas y notas de manzana verde y brioche.',
        vol_alcohol: 12.0,
        brand: 'Moët & Chandon',
        year: 2020,
        type_id: typeMap['Espumante'],
      },
      {
        name: 'Sauvignon Blanc',
        price: 1650,
        description: 'Sauvignon Blanc fresco con notas herbáceas y cítricas, ideal como aperitivo.',
        vol_alcohol: 13.0,
        brand: 'Cloudy Bay',
        year: 2022,
        type_id: typeMap['Blanco'],
      },
      {
        name: 'Pinot Noir Elegance',
        price: 2450,
        description: 'Pinot Noir sedoso con aromas de cereza y tierra húmeda, de cuerpo medio.',
        vol_alcohol: 13.5,
        brand: 'Domaine de la Côte',
        year: 2020,
        type_id: typeMap['Tinto'],
      },
      {
        name: 'Cava Brut Nature',
        price: 1280,
        description: 'Cava español sin dosaje, puro y mineral con burbujas persistentes.',
        vol_alcohol: 11.5,
        brand: 'Freixenet',
        year: 2021,
        type_id: typeMap['Espumante'],
      },
      {
        name: 'Tempranillo Crianza',
        price: 2100,
        description: 'Tempranillo crianza con 12 meses en barrica, notas de vainilla y frutos rojos.',
        vol_alcohol: 14.0,
        brand: 'Marqués de Riscal',
        year: 2019,
        type_id: typeMap['Tinto'],
      },
      {
        name: 'Rosé Sparkling',
        price: 15610,
        description: 'Espumante rosado con notas de fresas y frambuesas, elegante y festivo.',
        vol_alcohol: 12.5,
        brand: 'Dom Pérignon',
        year: 2021,
        type_id: typeMap['Espumante'],
      },
      {
        name: 'Gewürztraminer',
        price: 1850,
        description: 'Vino blanco aromático con notas florales y especiadas, muy expresivo.',
        vol_alcohol: 13.5,
        brand: 'Trimbach',
        year: 2021,
        type_id: typeMap['Blanco'],
      },
      {
        name: 'Sangiovese Riserva',
        price: 2750,
        description: 'Sangiovese toscano envejecido, con taninos elegantes y notas de cereza madura.',
        vol_alcohol: 14.5,
        brand: 'Castello Banfi',
        year: 2018,
        type_id: typeMap['Tinto'],
      },
    ];

    for (const wine of wineData) {
      const newWine = this.wineRepository.create(wine);
      await this.wineRepository.save(newWine);
    }
  }
}