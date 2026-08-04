/**
 * Query Provider
 *
 * TanStack Query (React Query) provider configuration.
 * Handles server state management, caching, and synchronization.
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { CACHE_CONFIG } from '@/const';

/**
 * Create query client with optimized configuration
 */
const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: CACHE_CONFIG.TREES_STALE_TIME,
        gcTime: 1000 * 60 * 10, // 10 minutes
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 1,
      },
    },
  });
};

/**
 * Singleton instance
 */
let queryClient: QueryClient | null = null;

export const getQueryClient = (): QueryClient => {
  if (!queryClient) {
    queryClient = createQueryClient();
  }
  return queryClient;
};

/**
 * Query Provider Component
 */
interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const client = getQueryClient();

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}
