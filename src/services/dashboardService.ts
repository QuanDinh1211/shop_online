import axios, { AxiosError } from "axios";
import { AdminStats, Order, Customer, ApiResponse, TodayStats } from "../types";
import api from "./api";

interface DashboardData {
  stats: AdminStats;
  recentOrders: Order[];
  recentCustomers: Customer[];
}

export const getDashboardData = async (): Promise<ApiResponse<DashboardData>> => {
  try {
    const response = await api.get<ApiResponse<DashboardData>>('/dashboard');
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.response?.data?.message || "Không thể lấy dữ liệu dashboard"
        : "Lỗi không xác định"
    );
  }
};

export const getTodayStats = async (): Promise<ApiResponse<TodayStats>> => {
  try {
    const response = await api.get<ApiResponse<TodayStats>>('/dashboard/today-stats');
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.response?.data?.message || "Không thể lấy thống kê hôm nay"
        : "Lỗi không xác định"
    );
  }
};