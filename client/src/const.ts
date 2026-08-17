/**
 * Application Constants
 *
 * Centralized location for application-wide constants and configuration values.
 * Environment variables are accessed through import.meta.env and should be
 * validated at runtime.
 */

// Environment variables with fallbacks
export const ENV = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  
  // Feature Flags
  ENABLE_OFFLINE_MODE: import.meta.env.VITE_ENABLE_OFFLINE_MODE === 'true',
  ENABLE_RESEARCH_MODE: import.meta.env.VITE_ENABLE_RESEARCH_MODE === 'true',
  ENABLE_AUDIO_GUIDES: import.meta.env.VITE_ENABLE_AUDIO_GUIDES === 'true',
} as const;

// Application Metadata
export const APP_METADATA = {
  NAME: 'WRTI Wildlife Park',
  VERSION: '1.0.0',
  DESCRIPTION: 'Discover, learn about, and navigate to trees within the wildlife park',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  THEME: 'wrti-theme',
  USER_PREFERENCES: 'wrti-user-preferences',
  OFFLINE_DATA: 'wrti-offline-data',
  DISCOVERY_JOURNAL: 'wrti-discovery-journal',
  MAP_STATE: 'wrti-map-state',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Trees
  TREES: '/trees',
  TREE_DETAILS: (id: string) => `/trees/${id}`,
  
  // Parks
  PARKS: '/parks',
  PARK_DETAILS: (id: string) => `/parks/${id}`,
  
  // Navigation
  ROUTES: '/routes',
  ROUTE_DIRECTIONS: (fromId: string, toId: string) => `/routes/${fromId}/to/${toId}`,
  
  // Discovery
  DISCOVERIES: '/discoveries',
  USER_DISCOVERIES: '/discoveries/user',
  
  // Search
  SEARCH: '/search',
} as const;

// Map Configuration
export const MAP_CONFIG = {
  DEFAULT_ZOOM: 15,
  MIN_ZOOM: 10,
  MAX_ZOOM: 20,
  // Legacy-store fallback only. The live TreeMap never consumes this value;
  // its Mapbox camera is derived from verified non-placeholder Tree bounds.
  DEFAULT_CENTER: { lat: 0, lng: 0 },
  ANIMATION_DURATION: 300,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// Timeouts (in milliseconds)
export const TIMEOUTS = {
  API_REQUEST: 30000,
  DEBOUNCE_SEARCH: 300,
  DEBOUNCE_MAP_MOVEMENT: 500,
  ANIMATION: 300,
} as const;

// Cache Configuration
export const CACHE_CONFIG = {
  TREES_STALE_TIME: 1000 * 60 * 5, // 5 minutes
  PARKS_STALE_TIME: 1000 * 60 * 60, // 1 hour
  DISCOVERIES_STALE_TIME: 1000 * 60, // 1 minute
} as const;
