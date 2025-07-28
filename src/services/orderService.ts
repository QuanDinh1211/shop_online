import { CreateOrderPayload, Order } from '../types';
import api from './api';

export const orderService = {
  createOrder: async (orderData: CreateOrderPayload) => {
    const response = await api.post('/orders/direct', orderData);
    return response.data;
  },

  getOrdersByUser: async () => {
    const response = await api.get("/orders/get-by-user");
    return response.data;
  },
};