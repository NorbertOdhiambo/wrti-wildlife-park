/**
 * WRTI Mapbox runtime boundary.
 * Design fidelity reminder: the Map is an immersive outdoor exploration surface.
 * It consumes one frontend-safe access token only and never provides a fallback
 * key, simulated map, or hard-coded park camera.
 */

export const MAPBOX_STYLES = {
  daylight: 'mapbox://styles/mapbox/outdoors-v12',
  dusk: 'mapbox://styles/mapbox/navigation-night-v1',
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
