/**
 * Tree TanStack Query contracts.
 *
 * Query keys are stable application contracts. Query execution is intentionally
 * deferred until both Supabase configuration and live schema verification exist.
 */

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { isSupabaseConfigured } from '@/utils/api';
import { treeRepository, TREE_SCHEMA_STATUS } from './treeRepository';
import type {
  PaginatedTreeResult,
  Tree,
  TreeAudio,
  TreeImage,
  TreeListInput,
} from '../types/tree';

export const treeQueryKeys = {
  all: ['trees'] as const,
  list: (input?: TreeListInput) => ['trees', 'list', input ?? {}] as const,
  detail: (treeId: number) => ['trees', treeId] as const,
  images: (treeId: number) => ['trees', treeId, 'images'] as const,
  audio: (treeId: number) => ['trees', treeId, 'audio'] as const,
};

/** Live data hooks stay idle until a later schema-verification phase enables them. */
export const isLiveTreeDataAvailable = (): boolean =>
  TREE_SCHEMA_STATUS !== 'pending-live-verification' && isSupabaseConfigured();

interface TreeQueryOptions {
  enabled?: boolean;
}

function shouldEnableTreeQuery(options?: TreeQueryOptions): boolean {
  return Boolean(options?.enabled && isLiveTreeDataAvailable());
}

export function useTrees(
  input?: TreeListInput,
  options?: TreeQueryOptions
): UseQueryResult<PaginatedTreeResult, Error> {
  return useQuery({
    queryKey: treeQueryKeys.list(input),
    queryFn: () => treeRepository.getTrees(input),
    enabled: shouldEnableTreeQuery(options),
  });
}

export function useTree(
  treeId: number,
  options?: TreeQueryOptions
): UseQueryResult<Tree | null, Error> {
  return useQuery({
    queryKey: treeQueryKeys.detail(treeId),
    queryFn: () => treeRepository.getTree(treeId),
    enabled: shouldEnableTreeQuery(options) && Number.isInteger(treeId) && treeId > 0,
  });
}

export function useTreeImages(
  treeId: number,
  options?: TreeQueryOptions
): UseQueryResult<TreeImage[], Error> {
  return useQuery({
    queryKey: treeQueryKeys.images(treeId),
    queryFn: () => treeRepository.getTreeImages(treeId),
    enabled: shouldEnableTreeQuery(options) && Number.isInteger(treeId) && treeId > 0,
  });
}

export function useTreeAudio(
  treeId: number,
  options?: TreeQueryOptions
): UseQueryResult<TreeAudio | null, Error> {
  return useQuery({
    queryKey: treeQueryKeys.audio(treeId),
    queryFn: () => treeRepository.getTreeAudio(treeId),
    enabled: shouldEnableTreeQuery(options) && Number.isInteger(treeId) && treeId > 0,
  });
}
