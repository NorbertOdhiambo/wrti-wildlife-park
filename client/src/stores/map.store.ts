/**
 * Map Store
 *
 * Global map state management using Zustand.
 * Handles:
 * - Map viewport (center, zoom, bounds)
 * - Selected markers/trees
 * - Visible layers
 * - Map interactions
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { MAP_CONFIG } from '@/const';
import type { Coordinates, MapViewState } from '@/types';

export interface MapState {
  // Viewport
  viewState: MapViewState;
  setViewState: (viewState: MapViewState) => void;
  setCenter: (center: Coordinates) => void;
  setZoom: (zoom: number) => void;
  resetViewState: () => void;

  // Selection
  selectedTreeId: string | null;
  setSelectedTreeId: (id: string | null) => void;

  // Layers
  visibleLayers: Set<string>;
  toggleLayer: (layerId: string) => void;
  setVisibleLayers: (layers: string[]) => void;

  // Interactions
  isDrawing: boolean;
  setIsDrawing: (drawing: boolean) => void;

  hoveredTreeId: string | null;
  setHoveredTreeId: (id: string | null) => void;

  // Clustering
  clusteringEnabled: boolean;
  setClusteringEnabled: (enabled: boolean) => void;
}

const DEFAULT_VIEW_STATE: MapViewState = {
  center: MAP_CONFIG.DEFAULT_CENTER,
  zoom: MAP_CONFIG.DEFAULT_ZOOM,
};

export const useMapStore = create<MapState>()(
  devtools(
    persist(
      (set) => ({
        // Viewport
        viewState: DEFAULT_VIEW_STATE,
        setViewState: (viewState) => set({ viewState }),
        setCenter: (center) =>
          set((state) => ({
            viewState: { ...state.viewState, center },
          })),
        setZoom: (zoom) =>
          set((state) => ({
            viewState: { ...state.viewState, zoom },
          })),
        resetViewState: () => set({ viewState: DEFAULT_VIEW_STATE }),

        // Selection
        selectedTreeId: null,
        setSelectedTreeId: (id) => set({ selectedTreeId: id }),

        // Layers
        visibleLayers: new Set(['trees', 'parks']),
        toggleLayer: (layerId) =>
          set((state) => {
            const newLayers = new Set(state.visibleLayers);
            if (newLayers.has(layerId)) {
              newLayers.delete(layerId);
            } else {
              newLayers.add(layerId);
            }
            return { visibleLayers: newLayers };
          }),
        setVisibleLayers: (layers) => set({ visibleLayers: new Set(layers) }),

        // Interactions
        isDrawing: false,
        setIsDrawing: (drawing) => set({ isDrawing: drawing }),

        hoveredTreeId: null,
        setHoveredTreeId: (id) => set({ hoveredTreeId: id }),

        // Clustering
        clusteringEnabled: true,
        setClusteringEnabled: (enabled) => set({ clusteringEnabled: enabled }),
      }),
      {
        name: 'wrti-map-store',
        partialize: (state) => ({
          viewState: state.viewState,
          visibleLayers: Array.from(state.visibleLayers),
          clusteringEnabled: state.clusteringEnabled,
        }),
      }
    )
  )
);
