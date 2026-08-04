/**
 * Base Repository
 *
 * Abstract base class for all repositories.
 * Provides common data access patterns and error handling.
 */

import type { ApiError } from '@/types';
import { ApiClient } from '../api/client';

export abstract class BaseRepository {
  protected client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Handle API errors and transform them to domain errors
   */
  protected handleError(error: unknown): ApiError {
    if (error instanceof Error) {
      return {
        code: 'UNKNOWN_ERROR',
        message: error.message,
      };
    }
    return {
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred',
    };
  }

  /**
   * Validate required parameters
   */
  protected validateRequired<T extends Record<string, unknown>>(
    params: T,
    requiredFields: (keyof T)[]
  ): void {
    const missing = requiredFields.filter(field => !params[field]);
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }
  }
}
