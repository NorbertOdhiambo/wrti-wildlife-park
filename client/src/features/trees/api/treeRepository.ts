/**
 * Verified WRTI Tree repository.
 *
 * This module owns the external Supabase boundary. Components and Zustand stores
 * consume application contracts only; they never import the Supabase client or
 * depend on table, field, or storage-path details.
 */

import { getSupabaseClient } from '@/utils/api';
import type {
  PaginatedTreeResult,
  Tree,
  TreeAudio,
  TreeImage,
  TreeListInput,
  TreeTaxonomyFacets,
} from '../types/tree';

export const TREE_SCHEMA_STATUS = 'verified-live' as const;

interface TreeRow {
  id: number;
  common_name: string;
  species: string | null;
  family: string | null;
  description: string | null;
  qr_code_url: string | null;
  qr_code_path: string | null;
  audio_url: string | null;
  lat: string | number | null;
  lng: string | number | null;
  fun_fact: string | null;
  created_at: string;
  updated_at: string;
}

interface TreeImageRow {
  id: string;
  tree_id: number;
  image_path: string;
  caption: string | null;
  is_primary: boolean;
  is_main: boolean;
  file_size: number | null;
  created_at: string;
  updated_at: string;
}

interface TreeAudioRow {
  id: string;
  tree_id: number;
  audio_path: string;
  audio_url: string | null;
  transcript: string | null;
  duration_seconds: number | null;
  created_at: string;
  updated_at: string;
}

export class TreeRepositoryError extends Error {
  constructor(operation: string, message: string) {
    super(`Unable to ${operation}: ${message}`);
    this.name = 'TreeRepositoryError';
  }
}

export class TreeStorageResolutionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TreeStorageResolutionError';
  }
}

function toCoordinate(value: string | number | null): number | null {
  if (value === null) return null;
  const numericValue = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

export function mapTreeRow(row: TreeRow): Tree {
  return { ...row, lat: toCoordinate(row.lat), lng: toCoordinate(row.lng) };
}

export function mapTreeImageRow(row: TreeImageRow): TreeImage {
  return { ...row };
}

export function mapTreeAudioRow(row: TreeAudioRow): TreeAudio {
  return { ...row };
}

function escapeIlikeTerm(value: string): string {
  return value.replace(/[\\%_(),]/g, '\\$&');
}

function normalizeOptionalValue(value: string | undefined): string | undefined {
  return value?.trim() || undefined;
}

function normalizeListInput(input: TreeListInput = {}): Required<Pick<TreeListInput, 'page' | 'itemsPerPage'>> & Pick<TreeListInput, 'search' | 'family' | 'species'> {
  const page = Math.max(1, Math.floor(input.page ?? 1));
  const itemsPerPage = Math.min(50, Math.max(1, Math.floor(input.itemsPerPage ?? 12)));
  return {
    page,
    itemsPerPage,
    search: normalizeOptionalValue(input.search),
    family: normalizeOptionalValue(input.family),
    species: normalizeOptionalValue(input.species),
  };
}

export interface TreeRepository {
  getTrees(input?: TreeListInput): Promise<PaginatedTreeResult>;
  getTree(treeId: number): Promise<Tree | null>;
  getTreeImages(treeId: number): Promise<TreeImage[]>;
  getTreeAudio(treeId: number): Promise<TreeAudio | null>;
  getPrimaryTreeImage(treeId: number): Promise<TreeImage | null>;
  getPrimaryTreeImages(treeIds: readonly number[]): Promise<Record<number, TreeImage>>;
  getTreeTaxonomyFacets(): Promise<TreeTaxonomyFacets>;
  resolveStorageUrl(path: string): Promise<string>;
}

export class SupabaseTreeRepository implements TreeRepository {
  async getTrees(input?: TreeListInput): Promise<PaginatedTreeResult> {
    const { page, itemsPerPage, search, family, species } = normalizeListInput(input);
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage - 1;
    const client = getSupabaseClient();
    let query = client
      .from('trees')
      .select('*', { count: 'exact' })
      .order('common_name', { ascending: true });

    if (search) {
      const pattern = `%${escapeIlikeTerm(search)}%`;
      query = query.or(`common_name.ilike.${pattern},species.ilike.${pattern},family.ilike.${pattern}`);
    }
    if (family) query = query.ilike('family', escapeIlikeTerm(family));
    if (species) query = query.ilike('species', escapeIlikeTerm(species));

    const { data, error, count } = await query.range(start, end);
    if (error) throw new TreeRepositoryError('load the tree collection', error.message);

    const totalItems = count ?? 0;
    return {
      items: ((data ?? []) as unknown as TreeRow[]).map(mapTreeRow),
      pagination: {
        currentPage: page,
        itemsPerPage,
        totalItems,
        totalPages: Math.max(1, Math.ceil(totalItems / itemsPerPage)),
      },
    };
  }

  async getTree(treeId: number): Promise<Tree | null> {
    const { data, error } = await getSupabaseClient()
      .from('trees')
      .select('*')
      .eq('id', treeId)
      .maybeSingle();

    if (error) throw new TreeRepositoryError('load the tree', error.message);
    return data ? mapTreeRow(data as unknown as TreeRow) : null;
  }

  async getTreeImages(treeId: number): Promise<TreeImage[]> {
    const { data, error } = await getSupabaseClient()
      .from('tree_images')
      .select('*')
      .eq('tree_id', treeId)
      .order('is_main', { ascending: false })
      .order('is_primary', { ascending: false })
      .order('created_at', { ascending: true });

    if (error) throw new TreeRepositoryError('load tree images', error.message);
    return ((data ?? []) as unknown as TreeImageRow[]).map(mapTreeImageRow);
  }

  async getTreeAudio(treeId: number): Promise<TreeAudio | null> {
    const { data, error } = await getSupabaseClient()
      .from('tree_audio')
      .select('*')
      .eq('tree_id', treeId)
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) throw new TreeRepositoryError('load tree audio', error.message);
    return data ? mapTreeAudioRow(data as unknown as TreeAudioRow) : null;
  }

  async getPrimaryTreeImage(treeId: number): Promise<TreeImage | null> {
    const images = await this.getTreeImages(treeId);
    return images.find((image) => image.is_main || image.is_primary) ?? images[0] ?? null;
  }

  /**
   * Resolve the preferred image for a collection in one tree_images query. This
   * is intentionally the collection equivalent of getPrimaryTreeImage and
   * prevents an N+1 database read when the directory renders a page of cards.
   */
  async getPrimaryTreeImages(treeIds: readonly number[]): Promise<Record<number, TreeImage>> {
    const validTreeIds = [...new Set(treeIds)].filter((treeId) => Number.isInteger(treeId) && treeId > 0);
    if (!validTreeIds.length) return {};

    const { data, error } = await getSupabaseClient()
      .from('tree_images')
      .select('*')
      .in('tree_id', validTreeIds)
      .order('is_main', { ascending: false })
      .order('is_primary', { ascending: false })
      .order('created_at', { ascending: true });

    if (error) throw new TreeRepositoryError('load collection images', error.message);

    const primaryImages: Record<number, TreeImage> = {};
    for (const row of (data ?? []) as unknown as TreeImageRow[]) {
      if (primaryImages[row.tree_id] === undefined) primaryImages[row.tree_id] = mapTreeImageRow(row);
    }
    return primaryImages;
  }

  /** Return only live, non-empty taxonomy values for the directory's filters. */
  async getTreeTaxonomyFacets(): Promise<TreeTaxonomyFacets> {
    const { data, error } = await getSupabaseClient().from('trees').select('family, species');
    if (error) throw new TreeRepositoryError('load tree taxonomy filters', error.message);

    const uniqueValues = (key: 'family' | 'species') => [...new Map(
      (data ?? [])
        .map((row) => (row as { family?: string | null; species?: string | null })[key]?.trim())
        .filter((value): value is string => Boolean(value))
        .map((value) => [value.toLocaleLowerCase(), value] as const)
    ).values()].sort((first, second) => first.localeCompare(second));

    return { families: uniqueValues('family'), species: uniqueValues('species') };
  }

  async resolveStorageUrl(path: string): Promise<string> {
    const normalizedPath = path.trim();
    if (!normalizedPath) throw new TreeStorageResolutionError('A non-empty storage path is required.');

    try {
      return new URL(normalizedPath).toString();
    } catch {
      const [bucket, ...objectSegments] = normalizedPath.split('/');
      const objectPath = objectSegments.join('/');
      if (!bucket || !objectPath) {
        throw new TreeStorageResolutionError('Expected an absolute URL or a bucket-relative object path.');
      }
      return getSupabaseClient().storage.from(bucket).getPublicUrl(objectPath).data.publicUrl;
    }
  }
}

export const treeRepository: TreeRepository = new SupabaseTreeRepository();
