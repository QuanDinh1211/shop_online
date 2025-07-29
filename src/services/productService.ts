import axios, { AxiosError } from "axios";
import { Product, Category } from "../types";
import api from "./api";



// Lấy tất cả sản phẩm
export const getAllProducts = async (): Promise<any> => {
  try {
    const response = await api.get<any>("/products");
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.response?.data?.message || "Không thể lấy danh sách sản phẩm"
        : "Lỗi không xác định"
    );
  }
};

// Lấy sản phẩm theo ID
export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.response?.data?.message || "Không thể lấy sản phẩm"
        : "Lỗi không xác định"
    );
  }
};

// Tạo sản phẩm mới
export const createProduct = async (
  productData: Product
): Promise<{ success: boolean; message: string, data: Product | null }> => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    console.log('error', error)
    throw new Error(
      error instanceof AxiosError
        ? error.response?.data?.message || "Không thể tạo sản phẩm"
        : "Lỗi không xác định"
    );
  }
};

// Cập nhật sản phẩm
export const updateProduct = async (
  id: number | null | undefined,
  productData: Partial<Product>
): Promise<{ success: boolean; message: string, data: Product | null }> => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.response?.data?.message || "Không thể cập nhật sản phẩm"
        : "Lỗi không xác định"
    );
  }
};

// Xóa sản phẩm
export const deleteProduct = async (id: number | null | undefined): Promise<void> => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.response?.data?.message || "Không thể xóa sản phẩm"
        : "Lỗi không xác định"
    );
  }
};

// Lấy tất cả danh mục
export const getAllCategories = async (): Promise<any> => {
  try {
    const response = await api.get<any>("/categories");
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.response?.data?.message || "Không thể lấy danh sách danh mục"
        : "Lỗi không xác định"
    );
  }
};

// Lấy tất cả đơn vị
export const getAllUnits = async (): Promise<any> => {
  try {
    const response = await api.get<any>("/units");
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.response?.data?.message || "Không thể lấy danh sách đơn vị"
        : "Lỗi không xác định"
    );
  }
};