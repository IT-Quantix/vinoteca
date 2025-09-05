import { Wine, WineCategory } from '../models/wine.interface';

export const WINES_DATA: Wine[] = [
  {
    id: 1,
    name: 'Cabernet Sauvignon Reserva',
    price: 35000,
    image: 'assets/img/vinos/Cabernet_Sauvignon_Reserva.jpg',
    description: 'Un vino tinto robusto con notas de cassis y cedro, perfecto para carnes rojas.',
    category: WineCategory.TINTO,
    vineyard: 'Bodega Santa Rita',
    year: 2019,
    alcoholContent: 14.5,
    rating: 4.5
  },
  {
    id: 2,
    name: 'Chardonnay Premium',
    price: 1950,
    image: 'assets/img/vinos/chardonay.jpg',
    description: 'Chardonnay elegante con notas de frutas tropicales y un toque de roble francés.',
    category: WineCategory.BLANCO,
    vineyard: 'Viña Concha y Toro',
    year: 2021,
    alcoholContent: 13.5,
    rating: 4.2
  },
  {
    id: 3,
    name: 'Malbec Gran Reserva',
    price: 68500,
    image: 'assets/img/vinos/malbec_gran_reserva.jpg',
    description: 'Malbec intenso con aromas de frutas negras y especias, ideal para ocasiones especiales.',
    category: WineCategory.TINTO,
    vineyard: 'Bodega Catena Zapata',
    year: 2018,
    alcoholContent: 15.0,
    rating: 4.8
  },
  {
    id: 4,
    name: 'Rosé de Provence',
    price: 1750,
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg',
    description: 'Rosado fresco y delicado con notas florales y cítricas, perfecto para el verano.',
    category: WineCategory.ROSADO,
    vineyard: 'Château Minuty',
    year: 2022,
    alcoholContent: 12.5,
    rating: 4.0
  },
  {
    id: 5,
    name: 'Champagne Brut',
    price: 170000,
    image: 'assets/img/vinos/champagne_brut.jpg',
    description: 'Champagne elegante con burbujas finas y notas de manzana verde y brioche.',
    category: WineCategory.ESPUMANTE,
    vineyard: 'Moët & Chandon',
    year: 2020,
    alcoholContent: 12.0,
    rating: 4.7
  },
  {
    id: 6,
    name: 'Sauvignon Blanc',
    price: 1650,
    image: 'https://images.pexels.com/photos/2647973/pexels-photo-2647973.jpeg',
    description: 'Sauvignon Blanc fresco con notas herbáceas y cítricas, ideal como aperitivo.',
    category: WineCategory.BLANCO,
    vineyard: 'Cloudy Bay',
    year: 2022,
    alcoholContent: 13.0,
    rating: 4.1
  },
  {
    id: 7,
    name: 'Pinot Noir Elegance',
    price: 2450,
    image: 'https://images.pexels.com/photos/774455/pexels-photo-774455.jpeg',
    description: 'Pinot Noir sedoso con aromas de cereza y tierra húmeda, de cuerpo medio.',
    category: WineCategory.TINTO,
    vineyard: 'Domaine de la Côte',
    year: 2020,
    alcoholContent: 13.5,
    rating: 4.3
  },
  {
    id: 8,
    name: 'Cava Brut Nature',
    price: 1280,
    image: 'https://images.pexels.com/photos/1408978/pexels-photo-1408978.jpeg',
    description: 'Cava español sin dosaje, puro y mineral con burbujas persistentes.',
    category: WineCategory.ESPUMANTE,
    vineyard: 'Freixenet',
    year: 2021,
    alcoholContent: 11.5,
    rating: 3.9
  },
  {
    id: 9,
    name: 'Tempranillo Crianza',
    price: 2100,
    image: 'https://images.pexels.com/photos/1649696/pexels-photo-1649696.jpeg',
    description: 'Tempranillo crianza con 12 meses en barrica, notas de vainilla y frutos rojos.',
    category: WineCategory.TINTO,
    vineyard: 'Marqués de Riscal',
    year: 2019,
    alcoholContent: 14.0,
    rating: 4.4
  },
  {
    id: 10,
    name: 'Rosé Sparkling',
    price: 15610,
    image: 'assets/img/vinos/rose_sparkling.jpg',
    description: 'Espumante rosado con notas de fresas y frambuesas, elegante y festivo.',
    category: WineCategory.ESPUMANTE,
    vineyard: 'Dom Pérignon',
    year: 2021,
    alcoholContent: 12.5,
    rating: 4.6
  },
  {
    id: 11,
    name: 'Gewürztraminer',
    price: 1850,
    image: 'https://images.pexels.com/photos/2647977/pexels-photo-2647977.jpeg',
    description: 'Vino blanco aromático con notas florales y especiadas, muy expresivo.',
    category: WineCategory.BLANCO,
    vineyard: 'Trimbach',
    year: 2021,
    alcoholContent: 13.5,
    rating: 4.2
  },
  {
    id: 12,
    name: 'Sangiovese Riserva',
    price: 2750,
    image: 'https://images.pexels.com/photos/434311/pexels-photo-434311.jpeg',
    description: 'Sangiovese toscano envejecido, con taninos elegantes y notas de cereza madura.',
    category: WineCategory.TINTO,
    vineyard: 'Castello Banfi',
    year: 2018,
    alcoholContent: 14.5,
    rating: 4.5
  }
];
