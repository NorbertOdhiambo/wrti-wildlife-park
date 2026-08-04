/**
 * Discovery Store
 *
 * Global discovery state management using Zustand.
 * Handles:
 * - User discoveries
 * - Discovery journal
 * - Discovery filters
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Discovery } from '@/types';

export interface DiscoveryState {
  // Discoveries
  discoveries: Discovery[];
  setDiscoveries: (discoveries: Discovery[]) => void;
  addDiscovery: (discovery: Discovery) => void;
  removeDiscovery: (id: string) => void;

  // Filters
  filterByTreeId: string | null;
  setFilterByTreeId: (id: string | null) => void;

  // Loading
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Error
  error: string | null;
  setError: (error: string | null) => void;

  // Sync
  lastSyncedAt: string | null;
  setLastSyncedAt: (time: string) => void;
}

export const useDiscoveryStore = create<DiscoveryState>()(
  devtools(
    persist(
      (set) => ({
        // Discoveries
        discoveries: [],
        setDiscoveries: (discoveries) => set({ discoveries }),
        addDiscovery: (discovery) =>
          set((state) => ({
            discoveries: [discovery, ...state.discoveries],
          })),
        removeDiscovery: (id) =>
          set((state) => ({
            discoveries: state.discoveries.filter((d) => d.id !== id),
          })),

        // Filters
        filterByTreeId: null,
        setFilterByTreeId: (id) => set({ filterByTreeId: id }),

        // Loading
        isLoading: false,
        setIsLoading: (loading) => set({ isLoading: loading }),

        // Error
        error: null,
        setError: (error) => set({ error }),

        // Sync
        lastSyncedAt: null,
        setLastSyncedAt: (time) => set({ lastSyncedAt: time }),
      }),
      {
        name: 'wrti-discovery-store',
        partialize: (state) => ({
          discoveries: state.discoveries,
          lastSyncedAt: state.lastSyncedAt,
        }),
      }
    )
  )
);
