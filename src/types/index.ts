export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  unit: string;
  category: {
    id: number;
    name: string;
  };
  inStock: boolean;
}

export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
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

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface CreateOrderPayload {
  name: string;
  phone: string;
  address: string;
  items: OrderItem[];
  notes?: string;
  paymentMethod?: string;
}
