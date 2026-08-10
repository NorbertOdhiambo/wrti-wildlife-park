/**
 * Application Routes
 *
 * Centralized route configuration using React Router v7.
 * Defines the application's navigation structure.
 *
 * Route Organization:
 * - Landing: Home page (/)
 * - Map: Main experience (/map)
 * - Discovery: Discovery journal (/discovery)
 * - Tickets: Ticketing (/tickets)
 * - Profile: User profile (/profile)
 * - Settings: User settings (/settings)
 * - Help: Help and documentation (/help)
 * - Offline: Offline management (/offline)
 * - About: About WRTI (/about)
 * - Checkout: Checkout page (/checkout)
 */

import { createBrowserRouter, RouteObject } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import NotFound from '@/pages/NotFound';
import Landing from '@/pages/Landing';
import TicketSelection from '@/pages/TicketSelection';

// Placeholder page components (to be implemented in future phases)
const MapPage = () => <div>Map Page - Coming Soon</div>;
const DiscoveryPage = () => <div>Discovery Journal - Coming Soon</div>;
const ProfilePage = () => <div>Profile - Coming Soon</div>;
const SettingsPage = () => <div>Settings - Coming Soon</div>;
const HelpPage = () => <div>Help - Coming Soon</div>;
const OfflineManagementPage = () => <div>Offline Management - Coming Soon</div>;
const AboutPage = () => <div>About WRTI - Coming Soon</div>;
const CheckoutPage = () => <div>Checkout - Coming Soon</div>;

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
        element: <Landing />,
      },
      {
        path: 'map',
        element: <MapPage />,
      },
      {
        path: 'discovery',
        element: <DiscoveryPage />,
      },
      {
        path: 'tickets',
        element: <TicketSelection />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
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
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
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
