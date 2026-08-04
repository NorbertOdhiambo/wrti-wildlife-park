/**
 * Application Configuration
 *
 * Centralized configuration for different environments.
 */

export const CONFIG = {
  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,

  // Feature Flags
  features: {
    offlineMode: import.meta.env.VITE_ENABLE_OFFLINE_MODE === 'true',
    researchMode: import.meta.env.VITE_ENABLE_RESEARCH_MODE === 'true',
    audioGuides: import.meta.env.VITE_ENABLE_AUDIO_GUIDES === 'true',
  },

  // API
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 30000,
  },

  // Map
  map: {
    mapboxToken: import.meta.env.VITE_MAPBOX_TOKEN,
  },

  // Analytics
  analytics: {
    enabled: !!import.meta.env.VITE_ANALYTICS_ENDPOINT,
    endpoint: import.meta.env.VITE_ANALYTICS_ENDPOINT,
    websiteId: import.meta.env.VITE_ANALYTICS_WEBSITE_ID,
  },
} as const;
