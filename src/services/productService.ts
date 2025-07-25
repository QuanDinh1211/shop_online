import { Product } from '../types';
import api from './api';

// Các hàm gọi API
// Service để gọi các API liên quan đến sản phẩm
export const productService = {
  // Lấy danh sách sản phẩm
  getProducts: async (): Promise<Product[]> => {
    return await api.get('/products');
  },

  // Lấy chi tiết sản phẩm theo ID
  getProductById: async (id: number): Promise<Product> => {
    return await api.get(`/products/${id}`);
  },
};