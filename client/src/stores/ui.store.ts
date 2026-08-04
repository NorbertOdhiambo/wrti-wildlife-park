/**
 * UI Store
 *
 * Global UI state management using Zustand.
 * Handles:
 * - Theme
 * - Sidebar/drawer visibility
 * - Modal states
 * - Notifications
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface UiState {
  // Theme
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;

  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Mobile menu
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;

  // Modals
  activeModals: Set<string>;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  closeAllModals: () => void;
  isModalOpen: (modalId: string) => boolean;

  // Notifications
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    duration?: number;
  }>;
  addNotification: (notification: Omit<UiState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
}

export const useUiStore = create<UiState>()(
  devtools(
    persist(
      (set, get) => ({
        // Theme
        theme: 'auto',
        setTheme: (theme) => set({ theme }),

        // Sidebar
        sidebarOpen: true,
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setSidebarOpen: (open) => set({ sidebarOpen: open }),

        // Mobile menu
        mobileMenuOpen: false,
        toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
        setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

        // Modals
        activeModals: new Set(),
        openModal: (modalId) =>
          set((state) => ({
            activeModals: new Set([...state.activeModals, modalId]),
          })),
        closeModal: (modalId) =>
          set((state) => {
            const newModals = new Set(state.activeModals);
            newModals.delete(modalId);
            return { activeModals: newModals };
          }),
        closeAllModals: () => set({ activeModals: new Set() }),
        isModalOpen: (modalId) => get().activeModals.has(modalId),

        // Notifications
        notifications: [],
        addNotification: (notification) =>
          set((state) => ({
            notifications: [
              ...state.notifications,
              {
                ...notification,
                id: `${Date.now()}-${Math.random()}`,
              },
            ],
          })),
        removeNotification: (id) =>
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          })),
      }),
      {
        name: 'wrti-ui-store',
        partialize: (state) => ({
          theme: state.theme,
          sidebarOpen: state.sidebarOpen,
        }),
      }
    )
  )
);
