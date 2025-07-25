import { Product, Category } from '../types';
import api from './api';

// Các hàm gọi API
// Service để gọi các API liên quan đến sản phẩm
export const productService = {
  // Lấy danh sách sản phẩm
  getProducts: async (categoryId?: number): Promise<Product[]> => {
    const url = categoryId ? `/products?categoryId=${categoryId}` : '/products';
    const response = await api.get<{ success: boolean; data: Product[] }>(url);
    if (!response.data.success) {
      throw new Error('Không thể lấy danh sách sản phẩm');
    }
    return response.data.data;
  },

  // Lấy chi tiết sản phẩm theo ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get<{ success: boolean; data: Product }>(`/products/${id}`);
    if (!response.data.success) {
      throw new Error('Không thể lấy thông tin sản phẩm');
    }
    return response.data.data;
  },

  // Lấy danh sách categories
  getCategories: async (): Promise<string[]> => {
    const response = await api.get<{ success: boolean; data: Category[] }>('/categories');
    if (!response.data.success) {
      throw new Error('Không thể lấy danh sách danh mục');
    }
    return response.data.data.map(category => category.name);
  },
};