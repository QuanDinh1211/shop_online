

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  email?: string;
  paymentMethod: 'cash' | 'card' | 'bank';
  notes?: string;
}

export interface Order {
  id: number;
  order_code: string;
  items: CartItem[];
  customer: CustomerInfo;
  total: number;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  totalProducts: number;
  totalCustomers: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
}

export interface Product {
  id?: number | null | undefined;
  name: string;
  category_id?: number | null;
  unitId?: number | null;
  category?: string | number | null;
  price: number;
  unit?: string | number | null;
  description: string;
  image: string;
  inStock: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id?: number ;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Unit {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  status: 'active' | 'inactive';
  totalOrders: number;
  totalSpent: number;
  orders?: Order[];
  createdAt: string;
  updatedAt: string;
}

export interface TodayStats {
  todayOrders?: number;
  todayRevenue?: number;
  todayCustomers?: number;
  lowStockProducts?: number;
  overdueOrders?: number;
}