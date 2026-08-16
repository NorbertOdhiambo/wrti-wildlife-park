/**
 * Tree TanStack Query operations.
 *
 * Query keys remain application contracts. Execution is enabled only when the
 * public Supabase runtime configuration exists; repository details stay hidden
 * behind the feature boundary.
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

/** The schema is verified; a missing runtime configuration still keeps hooks idle. */
export const isLiveTreeDataAvailable = (): boolean =>
  TREE_SCHEMA_STATUS === 'verified-live' && isSupabaseConfigured();

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
    staleTime: 60_000,
    retry: 1,
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
    staleTime: 60_000,
    retry: 1,
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
    staleTime: 60_000,
    retry: 1,
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
    staleTime: 60_000,
    retry: 1,
  });
}
