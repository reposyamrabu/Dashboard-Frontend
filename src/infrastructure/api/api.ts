import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from '../config/api';
import type { ApiResponse, ApiError } from '@/shared/types/api';

// Create axios instance with base configuration
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  // Response interceptor for handling errors
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      return response;
    },
    async error => {
      const originalRequest = error.config;

      // Handle 401 Unauthorized
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Attempt to refresh token
          const refreshToken = localStorage.getItem('refresh_token');
          if (refreshToken) {
            const response = await axios.post(
              `${API_CONFIG.BASE_URL}/auth/refresh`,
              {
                refreshToken,
              }
            );

            const { token } = response.data.data;
            localStorage.setItem('auth_token', token);

            // Retry original request
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem('auth_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      // Transform error to ApiError format
      const apiError: ApiError = {
        message:
          error.response?.data?.message ||
          error.message ||
          'An unexpected error occurred',
        code: error.response?.data?.code || error.code,
        status: error.response?.status,
        details: error.response?.data?.errors || error.response?.data?.details,
      };

      return Promise.reject(apiError);
    }
  );

  return instance;
};

export const apiClient = createApiInstance();

export class ApiService {
  static async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await apiClient.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  static async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await apiClient.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  static async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await apiClient.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  static async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await apiClient.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  static async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await apiClient.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  // File upload method
  static async upload<T>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: progressEvent => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    };

    const response = await apiClient.post<ApiResponse<T>>(
      url,
      formData,
      config
    );
    return response.data;
  }

  // Download file method
  static async download(url: string, filename?: string): Promise<void> {
    const response = await apiClient.get(url, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }
}

// Legacy export for backward compatibility
export const api = apiClient;
export default apiClient;
