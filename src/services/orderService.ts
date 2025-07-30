import axios, { AxiosError } from "axios";
import { Order, ApiResponse } from "../types";
import api from "./api";

// Lấy danh sách đơn hàng với tìm kiếm
export const getAllOrders = async (filters: {
  keySearch?: string;
  status?: string;
}): Promise<ApiResponse<Order[]>> => {
  try {
    const params = new URLSearchParams();
    if (filters.keySearch) params.append('keySearch', filters.keySearch);
    if (filters.status) params.append('status', filters.status);
    const response = await api.get<ApiResponse<Order[]>>(`/orders?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.response?.data?.message || "Không thể lấy danh sách đơn hàng"
        : "Lỗi không xác định"
    );
  }
};

// Lấy đơn hàng theo ID
export const getOrderById = async (id: number): Promise<ApiResponse<Order>> => {
  try {
    const response = await api.get<ApiResponse<Order>>(`/orders/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.response?.data?.message || "Không thể lấy thông tin đơn hàng"
        : "Lỗi không xác định"
    );
  }
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (
  id: number,
  status: Order["status"]
): Promise<ApiResponse<Order>> => {
  try {
    const response = await api.put<ApiResponse<Order>>(`/orders/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.log('Update order status error:', error);
    throw new Error(
      error instanceof AxiosError
        ? error.response?.data?.message || "Không thể cập nhật trạng thái đơn hàng"
        : "Lỗi không xác định"
    );
  }
};

// Xuất danh sách đơn hàng ra Excel
export const exportOrders = async (filters: {
  keySearch?: string;
  status?: string;
}): Promise<Blob> => {
  try {
    const params = new URLSearchParams();
    if (filters.keySearch) params.append('keySearch', filters.keySearch);
    if (filters.status) params.append('status', filters.status);
    const response = await api.get(`/orders/excel?${params.toString()}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.response?.data?.message || "Không thể xuất file Excel"
        : "Lỗi không xác định"
    );
  }
};