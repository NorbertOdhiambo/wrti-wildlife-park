/**
 * WRTI Mapbox runtime boundary.
 * Design fidelity reminder: the Map is an immersive outdoor exploration surface.
 * It consumes one frontend-safe access token only and never provides a fallback
 * key, simulated map, or hard-coded park camera.
 */

export const MAPBOX_STYLES = {
  eco: 'mapbox://styles/mapbox/outdoors-v12',
  satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
  terrain: 'mapbox://styles/mapbox/outdoors-v12',
  minimalist: 'mapbox://styles/mapbox/light-v11',
} as const;

export const MAPBOX_THEME_METADATA = {
  eco: { label: 'Eco-Map', icon: 'nature' },
  satellite: { label: 'Satellite', icon: 'satellite' },
  terrain: { label: 'Terrain', icon: 'landscape' },
  minimalist: { label: 'Minimalist', icon: 'map' },
} as const;

export type MapTheme = keyof typeof MAPBOX_STYLES;

const accessToken = import.meta.env['VITE_MAPBOX_ACCESS_TOKEN']?.trim() ?? '';

export const mapboxConfig = {
  accessToken,
  isConfigured: Boolean(accessToken),
  minZoom: 8,
  maxZoom: 19,
  initialFitPadding: 56,
} as const;
