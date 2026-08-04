/**
 * Application Routes
 *
 * Centralized route configuration using React Router v7.
 * Defines the application's navigation structure.
 *
 * Route Organization:
 * - Map: Main experience (/)
 * - Discovery: Discovery journal (/discovery)
 * - Settings: User settings (/settings)
 * - Help: Help and documentation (/help)
 * - Offline: Offline management (/offline)
 *
 * Note: Tree details, search, filters, and other map-related UI
 * are NOT separate routes. They are implemented as overlays/modals
 * within the Map experience.
 */

import { createBrowserRouter, RouteObject } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import NotFound from '@/pages/NotFound';

// Placeholder page components (to be implemented in Phase 2)
const MapPage = () => <div>Map Page - Coming Soon</div>;
const DiscoveryPage = () => <div>Discovery Journal - Coming Soon</div>;
const SettingsPage = () => <div>Settings - Coming Soon</div>;
const HelpPage = () => <div>Help - Coming Soon</div>;
const OfflineManagementPage = () => <div>Offline Management - Coming Soon</div>;

/**
 * Route definitions
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <MapPage />,
      },
      {
        path: 'discovery',
        element: <DiscoveryPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'help',
        element: <HelpPage />,
      },
      {
        path: 'offline',
        element: <OfflineManagementPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

/**
 * Create router instance
 */
export const router = createBrowserRouter(routes);
