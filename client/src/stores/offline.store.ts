/**
 * Offline Store
 *
 * Global offline state management using Zustand.
 * Handles:
 * - Online/offline status
 * - Offline data synchronization
 * - Pending operations queue
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { OfflineData } from '@/types';
import {
  getInitialOfflineDownloadPackages,
  type OfflineDownloadPackage,
} from '@/services/offline-downloads';

export interface PendingOperation {
  id: string;
  type: 'create' | 'update' | 'delete';
  entity: string;
  data: unknown;
  timestamp: number;
}

export interface OfflineState {
  // Connection status
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;

  // Offline data
  offlineData: OfflineData | null;
  setOfflineData: (data: OfflineData) => void;
  clearOfflineData: () => void;

  // Single-park downloadable package state. The service boundary can replace
  // this deterministic development data with real storage/Mapbox integration.
  downloadPackages: OfflineDownloadPackage[];
  setDownloadPackages: (packages: OfflineDownloadPackage[]) => void;

  // Pending operations
  pendingOperations: PendingOperation[];
  addPendingOperation: (operation: Omit<PendingOperation, 'id' | 'timestamp'>) => void;
  removePendingOperation: (id: string) => void;
  clearPendingOperations: () => void;

  // Sync status
  isSyncing: boolean;
  setIsSyncing: (syncing: boolean) => void;

  // Last sync time
  lastSyncTime: number | null;
  setLastSyncTime: (time: number) => void;

  // Error
  syncError: string | null;
  setSyncError: (error: string | null) => void;
}

export const useOfflineStore = create<OfflineState>()(
  devtools(
    persist(
      (set) => ({
        // Connection status
        isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
        setIsOnline: (online) => set({ isOnline: online }),

        // Offline data
        offlineData: null,
        setOfflineData: (data) => set({ offlineData: data }),
        clearOfflineData: () => set({ offlineData: null }),

        // Download packages
        downloadPackages: getInitialOfflineDownloadPackages(),
        setDownloadPackages: (packages) => set({ downloadPackages: packages }),

        // Pending operations
        pendingOperations: [],
        addPendingOperation: (operation) =>
          set((state) => ({
            pendingOperations: [
              ...state.pendingOperations,
              {
                ...operation,
                id: `${Date.now()}-${Math.random()}`,
                timestamp: Date.now(),
              },
            ],
          })),
        removePendingOperation: (id) =>
          set((state) => ({
            pendingOperations: state.pendingOperations.filter((op) => op.id !== id),
          })),
        clearPendingOperations: () => set({ pendingOperations: [] }),

        // Sync status
        isSyncing: false,
        setIsSyncing: (syncing) => set({ isSyncing: syncing }),

        // Last sync time
        lastSyncTime: null,
        setLastSyncTime: (time) => set({ lastSyncTime: time }),

        // Error
        syncError: null,
        setSyncError: (error) => set({ syncError: error }),
      }),
      {
        name: 'wrti-offline-store',
        partialize: (state) => ({
          offlineData: state.offlineData,
          downloadPackages: state.downloadPackages,
          pendingOperations: state.pendingOperations,
          lastSyncTime: state.lastSyncTime,
        }),
      }
    )
  )
);
