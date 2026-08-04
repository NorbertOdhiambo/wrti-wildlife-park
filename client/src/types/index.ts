/**
 * Shared Type Definitions
 *
 * Centralized location for all shared types used across the application.
 * Organized by domain/feature to maintain clarity and prevent circular dependencies.
 */

// ============================================================================
// Common Types
// ============================================================================

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Bounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// ============================================================================
// Park Domain
// ============================================================================

export interface Park {
  id: string;
  name: string;
  description: string;
  location: Coordinates;
  bounds: Bounds;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// Tree Domain
// ============================================================================

export interface Tree {
  id: string;
  parkId: string;
  name: string;
  scientificName: string;
  description: string;
  location: Coordinates;
  imageUrl?: string;
  speciesId: string;
  height?: number;
  age?: number;
  conservationStatus?: 'endangered' | 'vulnerable' | 'stable' | 'unknown';
  createdAt: string;
  updatedAt: string;
}

export interface TreeDetails extends Tree {
  funFacts: string[];
  conservationEfforts: string[];
  relatedSpecies: string[];
  audioGuideUrl?: string;
}

export interface Species {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  nativeRegions: string[];
  characteristics: Record<string, string>;
}

// ============================================================================
// Discovery Domain
// ============================================================================

export interface Discovery {
  id: string;
  userId: string;
  treeId: string;
  discoveredAt: string;
  notes?: string;
  photos?: string[];
  createdAt: string;
}

export interface DiscoveryJournal {
  userId: string;
  discoveries: Discovery[];
  totalCount: number;
  lastUpdated: string;
}

// ============================================================================
// Navigation Domain
// ============================================================================

export interface Route {
  id: string;
  parkId: string;
  fromTreeId: string;
  toTreeId: string;
  distance: number;
  estimatedDuration: number;
  waypoints: Coordinates[];
  difficulty: 'easy' | 'moderate' | 'hard';
  description?: string;
}

export interface RouteStep {
  instruction: string;
  distance: number;
  duration: number;
  location: Coordinates;
}

export interface Directions {
  route: Route;
  steps: RouteStep[];
  totalDistance: number;
  totalDuration: number;
}

// ============================================================================
// Search Domain
// ============================================================================

export interface SearchQuery {
  query: string;
  filters?: SearchFilters;
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export interface SearchFilters {
  parkId?: string;
  speciesId?: string;
  conservationStatus?: string[];
  bounds?: Bounds;
}

export interface SearchResult {
  id: string;
  type: 'tree' | 'species' | 'park';
  title: string;
  description: string;
  imageUrl?: string;
  location?: Coordinates;
}

export interface SearchResults {
  query: string;
  results: SearchResult[];
  totalCount: number;
  executionTime: number;
}

// ============================================================================
// User Preferences & Settings
// ============================================================================

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: {
    enabled: boolean;
    discoveries: boolean;
    recommendations: boolean;
  };
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
    fontSize: 'small' | 'normal' | 'large';
  };
}

// ============================================================================
// Offline Data
// ============================================================================

export interface OfflineData {
  parks: Park[];
  trees: Tree[];
  species: Species[];
  routes: Route[];
  lastSyncedAt: string;
  expiresAt: string;
}

// ============================================================================
// UI State Types
// ============================================================================

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  status: LoadingState;
  error: ApiError | null;
}

export interface MapViewState {
  center: Coordinates;
  zoom: number;
  bounds?: Bounds;
}

export interface MapMarker {
  id: string;
  type: 'tree' | 'park' | 'route-point';
  location: Coordinates;
  title: string;
  data: Record<string, unknown>;
}

export interface MapCluster {
  id: string;
  location: Coordinates;
  count: number;
  bounds: Bounds;
}
