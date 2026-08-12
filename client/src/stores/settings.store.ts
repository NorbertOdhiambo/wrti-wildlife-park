/**
 * Settings Store
 *
 * Global settings state management using Zustand.
 * Handles:
 * - User preferences
 * - Accessibility settings
 * - Notification preferences
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { UserPreferences } from '@/types';

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'auto',
  language: 'en',
  offlineDownloads: true,
  notifications: {
    enabled: true,
    discoveries: true,
    recommendations: true,
  },
  accessibility: {
    reducedMotion: false,
    highContrast: false,
    colorBlindMode: false,
    fontSize: 'normal',
  },
};

export interface SettingsState {
  preferences: UserPreferences;
  setPreferences: (preferences: UserPreferences) => void;
  updatePreferences: (partial: Partial<UserPreferences>) => void;
  resetPreferences: () => void;

  // Theme
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;

  // Language
  setLanguage: (language: string) => void;

  // Offline downloads
  setOfflineDownloads: (enabled: boolean) => void;

  // Notifications
  setNotificationsEnabled: (enabled: boolean) => void;
  setDiscoveryNotifications: (enabled: boolean) => void;
  setRecommendationNotifications: (enabled: boolean) => void;

  // Accessibility
  setReducedMotion: (enabled: boolean) => void;
  setHighContrast: (enabled: boolean) => void;
  setColorBlindMode: (enabled: boolean) => void;
  setFontSize: (size: 'small' | 'normal' | 'large') => void;
}

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set) => ({
        preferences: DEFAULT_PREFERENCES,
        setPreferences: (preferences) => set({ preferences }),
        updatePreferences: (partial) =>
          set((state) => ({
            preferences: { ...state.preferences, ...partial },
          })),
        resetPreferences: () => set({ preferences: DEFAULT_PREFERENCES }),

        // Theme
        setTheme: (theme) =>
          set((state) => ({
            preferences: {
              ...state.preferences,
              theme,
            },
          })),

        // Language
        setLanguage: (language) =>
          set((state) => ({
            preferences: {
              ...state.preferences,
              language,
            },
          })),

        // Offline downloads
        setOfflineDownloads: (enabled) =>
          set((state) => ({
            preferences: {
              ...state.preferences,
              offlineDownloads: enabled,
            },
          })),

        // Notifications
        setNotificationsEnabled: (enabled) =>
          set((state) => ({
            preferences: {
              ...state.preferences,
              notifications: {
                ...state.preferences.notifications,
                enabled,
              },
            },
          })),
        setDiscoveryNotifications: (enabled) =>
          set((state) => ({
            preferences: {
              ...state.preferences,
              notifications: {
                ...state.preferences.notifications,
                discoveries: enabled,
              },
            },
          })),
        setRecommendationNotifications: (enabled) =>
          set((state) => ({
            preferences: {
              ...state.preferences,
              notifications: {
                ...state.preferences.notifications,
                recommendations: enabled,
              },
            },
          })),

        // Accessibility
        setReducedMotion: (enabled) =>
          set((state) => ({
            preferences: {
              ...state.preferences,
              accessibility: {
                ...state.preferences.accessibility,
                reducedMotion: enabled,
              },
            },
          })),
        setHighContrast: (enabled) =>
          set((state) => ({
            preferences: {
              ...state.preferences,
              accessibility: {
                ...state.preferences.accessibility,
                highContrast: enabled,
              },
            },
          })),
        setColorBlindMode: (enabled) =>
          set((state) => ({
            preferences: {
              ...state.preferences,
              accessibility: {
                ...state.preferences.accessibility,
                colorBlindMode: enabled,
              },
            },
          })),
        setFontSize: (size) =>
          set((state) => ({
            preferences: {
              ...state.preferences,
              accessibility: {
                ...state.preferences.accessibility,
                fontSize: size,
              },
            },
          })),
      }),
      {
        name: 'wrti-settings-store',
      }
    )
  )
);
