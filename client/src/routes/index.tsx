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
import RootLayout, { WRTIRouteHandle } from '@/layouts/RootLayout';
import NotFound from '@/pages/NotFound';
import Landing from '@/pages/Landing';
import TicketSelection from '@/pages/TicketSelection';
import PaymentSuccess from '@/pages/PaymentSuccess';
import About from '@/pages/About';
import SupportFAQ from '@/pages/SupportFAQ';
import ContactSupport from '@/pages/ContactSupport';
import ExplorationProgress from '@/pages/ExplorationProgress';
import SettingsPreferences from '@/pages/SettingsPreferences';
import OfflineDownloads from '@/pages/OfflineDownloads';
import DiscoveryJournal from '@/pages/DiscoveryJournal';
import TreeDetail from '@/pages/TreeDetail';

// Placeholder page components (to be implemented in future phases)
const MapPage = () => <div>Map Page - Coming Soon</div>;
const ProfilePage = () => <div>Profile - Coming Soon</div>;
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
        handle: {
          shell: {
            header: 'landing',
            activeNav: 'discovery',
            bottomNavigationVariant: 'landing',
          },
        } satisfies WRTIRouteHandle,
      },
      {
        path: 'map',
        element: <MapPage />,
        handle: { shell: { header: 'map', activeNav: 'map' } } satisfies WRTIRouteHandle,
      },
      {
        path: 'discovery',
        element: <DiscoveryJournal />,
        handle: { shell: { activeNav: 'discovery' } } satisfies WRTIRouteHandle,
      },
      {
        path: 'trees/:id',
        element: <TreeDetail />,
        // The Stitch Tree Detail source explicitly specifies local translucent task
        // chrome and no Bottom Navigation, so this is an intentional shell exception.
        handle: { shell: { header: 'hidden', bottomNavigation: 'hidden' } } satisfies WRTIRouteHandle,
      },
      {
        path: 'tickets',
        element: <TicketSelection />,
        handle: { shell: { header: 'detail', activeNav: 'tickets' } } satisfies WRTIRouteHandle,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
        handle: { shell: { activeNav: 'profile' } } satisfies WRTIRouteHandle,
      },
      {
        path: 'settings',
        element: <SettingsPreferences />,
        handle: { shell: { header: 'app', activeNav: 'profile', title: 'Wildlife Park' } } satisfies WRTIRouteHandle,
      },
      {
        path: 'help',
        element: <SupportFAQ />,
        handle: { shell: { header: 'detail', title: 'Support & FAQ' } } satisfies WRTIRouteHandle,
      },
      {
        path: 'contact',
        element: <ContactSupport />,
        handle: { shell: { header: 'detail', title: 'Contact Support' } } satisfies WRTIRouteHandle,
      },
      {
        path: 'progress',
        element: <ExplorationProgress />,
        handle: { shell: { header: 'detail', title: 'Exploration Progress' } } satisfies WRTIRouteHandle,
      },
      {
        path: 'offline',
        element: <OfflineDownloads />,
        handle: { shell: { header: 'detail', title: 'Offline Downloads' } } satisfies WRTIRouteHandle,
      },
      {
        path: 'about',
        element: <About />,
        handle: { shell: { header: 'app' } } satisfies WRTIRouteHandle,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
        handle: { shell: { header: 'detail', activeNav: 'tickets', title: 'Checkout' } } satisfies WRTIRouteHandle,
      },
      {
        path: 'payment-success',
        element: <PaymentSuccess />,
        handle: { shell: { header: 'hidden', bottomNavigation: 'hidden' } } satisfies WRTIRouteHandle,
      },
      {
        path: '*',
        element: <NotFound />,
        handle: { shell: { header: 'hidden', bottomNavigation: 'hidden' } } satisfies WRTIRouteHandle,
      },
    ],
  },
];

/**
 * Create router instance
 */
export const router = createBrowserRouter(routes);
