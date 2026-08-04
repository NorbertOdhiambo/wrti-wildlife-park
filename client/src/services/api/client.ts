/**
 * API Client
 *
 * Centralized HTTP client for all API communication.
 * Handles:
 * - Request/response interceptors
 * - Error handling
 * - Retry logic
 * - Request cancellation
 * - Type safety
 */

import { ENV, TIMEOUTS } from '@/const';
import type { ApiError } from '@/types';

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  retries?: number;
  signal?: AbortSignal;
}

export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  retries?: number;
}

/**
 * ApiClient - Centralized HTTP client
 *
 * Usage:
 * ```typescript
 * const client = new ApiClient({ baseURL: 'https://api.example.com' });
 * const data = await client.get<Tree>('/trees/123');
 * ```
 */
export class ApiClient {
  private baseURL: string;
  private timeout: number;
  private retries: number;

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL || ENV.API_BASE_URL;
    this.timeout = config.timeout || TIMEOUTS.API_REQUEST;
    this.retries = config.retries || 3;
  }

  /**
   * Perform HTTP request with error handling and retries
   */
  private async request<T>(
    url: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = this.timeout,
      retries = this.retries,
      signal,
    } = config;

    const fullUrl = this.buildUrl(url);
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(fullUrl, {
          method,
          headers: this.buildHeaders(headers),
          body: body ? JSON.stringify(body) : undefined,
          signal: signal || controller.signal,
        });

        clearTimeout(timeoutId);

        // Handle non-OK responses
        if (!response.ok) {
          const error = await this.parseError(response);
          throw new ApiClientError(error.message, response.status, error);
        }

        // Parse and return response
        const data = await response.json() as T;
        return data;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // Don't retry on client errors (4xx) or if it's the last attempt
        if (
          error instanceof ApiClientError &&
          error.status >= 400 &&
          error.status < 500
        ) {
          throw error;
        }

        if (attempt < retries) {
          // Exponential backoff
          await this.delay(Math.pow(2, attempt) * 100);
        }
      }
    }

    throw lastError || new Error('Request failed after retries');
  }

  /**
   * GET request
   */
  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(url: string, body?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'POST', body });
  }

  /**
   * PUT request
   */
  async put<T>(url: string, body?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'PUT', body });
  }

  /**
   * PATCH request
   */
  async patch<T>(url: string, body?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'PATCH', body });
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }

  /**
   * Build full URL from path
   */
  private buildUrl(path: string): string {
    if (path.startsWith('http')) {
      return path;
    }
    return `${this.baseURL}${path.startsWith('/') ? path : `/${path}`}`;
  }

  /**
   * Build request headers
   */
  private buildHeaders(customHeaders: Record<string, string>): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      ...customHeaders,
    };
  }

  /**
   * Parse error response
   */
  private async parseError(response: Response): Promise<ApiError> {
    try {
      const data = await response.json() as Partial<ApiError>;
      return {
        code: data.code || `HTTP_${response.status}`,
        message: data.message || response.statusText,
        details: data.details,
      };
    } catch {
      return {
        code: `HTTP_${response.status}`,
        message: response.statusText,
      };
    }
  }

  /**
   * Delay helper for exponential backoff
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Custom error class for API errors
 */
export class ApiClientError extends Error {
  constructor(
    message: string,
    public status: number,
    public apiError: ApiError
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

/**
 * Create default API client instance
 */
export const createApiClient = (config?: Partial<ApiClientConfig>): ApiClient => {
  return new ApiClient({
    baseURL: ENV.API_BASE_URL,
    ...config,
  });
};

/**
 * Singleton instance
 */
let apiClientInstance: ApiClient | null = null;

export const getApiClient = (): ApiClient => {
  if (!apiClientInstance) {
    apiClientInstance = createApiClient();
  }
  return apiClientInstance;
};
