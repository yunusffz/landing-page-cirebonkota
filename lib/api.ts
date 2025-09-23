import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { toast } from 'sonner';

// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const API_TIMEOUT = 10000; // 10 seconds
// Response interceptor for error handling
const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

const responseErrorInterceptor = async (error: unknown) => {
  // Handle common error cases
  if (error && typeof error === 'object' && 'response' in error) {
    const { status, data } = error.response as {
      status: number;
      data: unknown;
    };

    switch (status) {
      case 403:
        // Forbidden
        toast.error(
          'Access forbidden. You do not have permission to perform this action.'
        );
        break;
      case 404:
        // Not found
        toast.error(
          'Resource not found. Please check your request and try again.'
        );
        break;
      case 422:
        let validationMessage = 'Validation error occurred';
        if (
          typeof data === 'object' &&
          data !== null &&
          'message' in data &&
          typeof (data as { message?: unknown }).message === 'string'
        ) {
          validationMessage = (data as { message: string }).message;
        }
        toast.error(validationMessage);
        break;
      case 500:
        // Server error
        toast.error('Server error occurred. Please try again later.');
        break;
      default:
        // Other HTTP errors
        let errorMessage: string;
        if (
          typeof data === 'object' &&
          data !== null &&
          'message' in data &&
          typeof (data as { message?: unknown }).message === 'string'
        ) {
          errorMessage = (data as { message: string }).message;
        } else {
          errorMessage = `HTTP Error: ${status}`;
        }
        toast.error(errorMessage);
    }
  } else if (error && typeof error === 'object' && 'request' in error) {
    // Network error
    toast.error(
      'Network error. Please check your internet connection and try again.'
    );
  } else {
    // Other error
    toast.error(
      error instanceof Error ? error.message : 'An unexpected error occurred'
    );
  }

  return Promise.reject(error);
};

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors
apiClient.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
);

// API service class
export class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = apiClient;
  }

  // Generic GET request
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  // Generic POST request
  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  // Generic PUT request
  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  // Generic PATCH request
  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  // Generic DELETE request
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  // Upload file
  async uploadFile<T>(
    url: string,
    file: File,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post<T>(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export the raw axios instance for advanced usage
export { apiClient };

// Export types
export type { AxiosInstance, AxiosRequestConfig, AxiosResponse };
