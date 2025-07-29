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
    const response = await api.post('/login', { email, password });
    return response.data;
  },


  // Lấy thông tin user hiện tại
  getProfile: async (): Promise<User> => {
    const response = await api.get<{ success: boolean; data: User }>('/profile');
    if (!response.data.success) {
      throw new Error('Không thể lấy thông tin người dùng');
    }
    return response.data.data;
  },

  // xác nhận email
  forgotPassword: async (email: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.post('/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (email: string, code: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.post('/reset-password', { email, code, newPassword });
    console.log('response', response)
    return response.data;
  },
};