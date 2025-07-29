import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Định nghĩa base URL cho API
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/admin';

// Cấu hình mặc định cho axios instance
const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Có thể thêm các header mặc định khác, ví dụ Authorization
  },
};

// Tạo instance axios
const api: AxiosInstance = axios.create(config);

// Interceptor cho request (thêm token hoặc xử lý trước khi gửi request)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Ví dụ: Thêm token vào header nếu có
    const token = localStorage.getItem('seafood_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho response (xử lý response hoặc lỗi)
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Trả về dữ liệu từ response
    return response;
  },
  (error) => {
    // Xử lý lỗi, ví dụ: nếu 401 thì logout
    if (error.response?.status === 401) {
      // Xóa thông tin đăng nhập
      localStorage.removeItem('seafood_token');
      localStorage.removeItem('seafood_user');
      // Chuyển hướng về trang đăng nhập hoặc reload
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;