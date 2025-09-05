export interface Wine {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: WineCategory;
  vineyard: string;
  year: number;
  alcoholContent: number;
  rating: number;
}

export enum WineCategory {
  TINTO = 'tinto',
  BLANCO = 'blanco',
  ROSADO = 'rosado',
  ESPUMANTE = 'espumante'
}

export interface CartItem {
  wine: Wine;
  quantity: number;
}

export interface PaymentData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface FilterOptions {
  category?: WineCategory;
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
}