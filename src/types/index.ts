export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  unit: string;
  category: string;
  inStock: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
  paymentMethod: 'cash' | 'card' | 'bank';
  notes?: string;
}

