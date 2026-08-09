/**
 * MapLayout Primitive
 *
 * Reusable layout component for map-centric screens in the WRTI Wildlife Park application.
 * Handles the positioning and layering of map canvas, overlays, controls, and bottom sheets.
 *
 * Features:
 * - Full-screen map canvas support
 * - Flexible overlay positioning (top, center, bottom)
 * - Map control positioning (corners)
 * - BottomSheet integration
 * - Safe area handling
 * - Responsive design
 * - Accessibility support
 */

import { clsx } from 'clsx';
import type { ReactNode } from 'react';

// ============================================================================
// Type Definitions
// ============================================================================

export interface MapLayoutProps {
  /** The map component/canvas */
  map: ReactNode;
  /** Top overlay content (header, search, etc.) */
  topOverlay?: ReactNode;
  /** Center overlay content (popups, tooltips) */
  centerOverlay?: ReactNode;
  /** Bottom overlay content (status bars, info panels) */
  bottomOverlay?: ReactNode;
  /** Map controls (zoom, layers, locate) */
  controls?: ReactNode;
  /** Floating action button */
  fab?: ReactNode;
  /** Bottom sheet content */
  bottomSheet?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Map container classes */
  mapClassName?: string;
  /** Whether to show safe area padding */
  safeArea?: boolean;
}

// ============================================================================
// MapLayout Component
// ============================================================================

/**
 * MapLayout - Reusable layout for map-centric screens
 *
 * Provides a structured layout for map screens with support for:
 * - Full-screen map canvas
 * - Top overlays (headers, search)
 * - Center overlays (popups, tooltips)
 * - Bottom overlays (status bars)
 * - Map controls (zoom, layers, locate)
 * - Floating action buttons
 * - Bottom sheets
 *
 * The layout is map-provider agnostic and works with any map library
 * (Mapbox, Google Maps, Leaflet, etc.)
 *
 * @param map - The map component/canvas
 * @param topOverlay - Content to display at the top
 * @param centerOverlay - Content to display in the center
 * @param bottomOverlay - Content to display at the bottom
 * @param controls - Map control buttons
 * @param fab - Floating action button
 * @param bottomSheet - Bottom sheet component
 * @param safeArea - Whether to add safe area padding
 */
export function MapLayout({
  map,
  topOverlay,
  centerOverlay,
  bottomOverlay,
  controls,
  fab,
  bottomSheet,
  className,
  mapClassName,
  safeArea = true,
}: MapLayoutProps) {
  return (
    <div
      className={clsx(
        'relative w-full h-screen bg-mapSurface overflow-hidden',
        className
      )}
    >
      {/* Map Canvas */}
      <div
        className={clsx(
          'absolute inset-0 w-full h-full',
          mapClassName
        )}
      >
        {map}
      </div>

      {/* Top Overlay */}
      {topOverlay && (
        <div
          className={clsx(
            'absolute top-0 left-0 right-0 z-20',
            'pointer-events-none',
            safeArea && 'safe-area-inset-top'
          )}
        >
          <div className="pointer-events-auto">
            {topOverlay}
          </div>
        </div>
      )}

      {/* Center Overlay */}
      {centerOverlay && (
        <div
          className={clsx(
            'absolute inset-0 flex items-center justify-center z-30',
            'pointer-events-none'
          )}
        >
          <div className="pointer-events-auto">
            {centerOverlay}
          </div>
        </div>
      )}

      {/* Bottom Overlay (above bottom sheet) */}
      {bottomOverlay && (
        <div
          className={clsx(
            'absolute bottom-0 left-0 right-0 z-25',
            'pointer-events-none',
            safeArea && 'safe-area-inset-bottom'
          )}
        >
          <div className="pointer-events-auto">
            {bottomOverlay}
          </div>
        </div>
      )}

      {/* Map Controls - Top Left */}
      {controls && (
        <div
          className={clsx(
            'absolute top-4 left-4 z-40',
            'flex flex-col gap-2',
            'pointer-events-none',
            safeArea && 'safe-area-inset-top safe-area-inset-left'
          )}
        >
          <div className="pointer-events-auto">
            {controls}
          </div>
        </div>
      )}

      {/* Floating Action Button - Bottom Right */}
      {fab && (
        <div
          className={clsx(
            'absolute bottom-24 right-4 z-40',
            'pointer-events-none',
            safeArea && 'safe-area-inset-bottom safe-area-inset-right'
          )}
        >
          <div className="pointer-events-auto">
            {fab}
          </div>
        </div>
      )}

      {/* Bottom Sheet */}
      {bottomSheet && (
        <div
          className={clsx(
            'absolute bottom-0 left-0 right-0 z-50',
            'pointer-events-none',
            safeArea && 'safe-area-inset-bottom'
          )}
        >
          <div className="pointer-events-auto">
            {bottomSheet}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Exports
// ============================================================================

export default MapLayout;
