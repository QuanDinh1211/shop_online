import axios, { AxiosError } from "axios";
import { Customer, ApiResponse } from "../types";
import api from "./api";

// Lấy danh sách khách hàng với tìm kiếm
export const getAllCustomers = async (filters: {
  keySearch?: string;
  status?: string;
}): Promise<ApiResponse<Customer[]>> => {
  try {
    const params = new URLSearchParams();
    if (filters.keySearch) {
      params.append('keySearch', filters.keySearch);
    }
    if (filters.status) {
      params.append('status', filters.status);
    }
    const response = await api.get<ApiResponse<Customer[]>>(`/customers?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.response?.data?.message || "Không thể lấy danh sách khách hàng"
        : "Lỗi không xác định"
    );
  }
};

// Lấy chi tiết khách hàng theo ID
export const getCustomerById = async (id: number): Promise<ApiResponse<Customer>> => {
  try {
    const response = await api.get<ApiResponse<Customer>>(`/customers/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.response?.data?.message || "Không thể lấy thông tin khách hàng"
        : "Lỗi không xác định"
    );
  }
};

// Xuất danh sách khách hàng ra Excel
export const exportCustomers = async (filters: {
  keySearch?: string;
  status?: string;
}): Promise<Blob> => {
  try {
    const params = new URLSearchParams();
    if (filters.keySearch) {
      params.append('keySearch', filters.keySearch);
    }
    if (filters.status) {
      params.append('status', filters.status);
    }
    const response = await api.get(`/customers/export?${params.toString()}`, {
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