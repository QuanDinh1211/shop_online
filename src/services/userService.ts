import api from './api';
import { User } from '../types';

export const userService = {
  // Đăng nhập
  login: async (email: string, password: string): Promise<{
    success: boolean;
    message: string;
    data?: {
      user: User;
      token: string;
    };
  }> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // Đăng ký
  register: async (name: string, email: string, password: string): Promise<{
    success: boolean;
    message: string;
    data?: {
      user: User;
      token: string;
    };
  }> => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  // Lấy thông tin user hiện tại
  getProfile: async (): Promise<User> => {
    const response = await api.get<{ success: boolean; data: User }>('/auth/profile');
    if (!response.data.success) {
      throw new Error('Không thể lấy thông tin người dùng');
    }
    return response.data.data;
  },
};