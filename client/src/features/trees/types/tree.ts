/**
 * Intended WRTI application data contracts.
 *
 * These types are deliberately NOT a representation of a verified Supabase
 * schema. Table names, columns, relationships, storage buckets, and RLS rules
 * remain unknown until live environment configuration is available.
 */

export interface Tree {
  id: number;
  common_name: string;
  species: string | null;
  family: string | null;
  description: string | null;
  lat: number;
  lng: number;
  qr_code_url?: string;
  qr_code_path?: string;
  imgUrl?: string;
  audio_url: string;
  fun_fact: string;
  created_at: string;
}

export interface TreeImage {
  id: string;
  tree_id: number;
  image_path: string;
  is_main: boolean;
  caption?: string;
}

export interface TreeAudio {
  id: string;
  tree_id: number;
  audio_path: string;
  audio_url: string;
  transcript?: string;
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
