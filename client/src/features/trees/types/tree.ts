/**
 * Verified WRTI Tree application contracts.
 *
 * Source: anonymous read probes against public.trees, public.tree_images, and
 * public.tree_audio on the connected external Supabase project. Nullable values
 * reflect observed public-result behavior; database-declared nullability remains
 * intentionally unasserted because information_schema is not anonymous-readable.
 */

export interface Tree {
  id: number;
  common_name: string;
  species: string | null;
  family: string | null;
  description: string | null;
  qr_code_url: string | null;
  qr_code_path: string | null;
  audio_url: string | null;
  lat: number | null;
  lng: number | null;
  fun_fact: string | null;
  created_at: string;
  updated_at: string;
}

export interface TreeImage {
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

export interface TreeAudio {
  id: string;
  tree_id: number;
  audio_path: string;
  audio_url: string | null;
  transcript: string | null;
  duration_seconds: number | null;
  created_at: string;
  updated_at: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface NavigationState {
  mode: 'explore' | 'tree-navigation';
  treeId?: number;
}

export interface TreeListInput {
  page?: number;
  itemsPerPage?: number;
  search?: string;
}

export interface PaginatedTreeResult {
  items: Tree[];
  pagination: PaginationState;
}
