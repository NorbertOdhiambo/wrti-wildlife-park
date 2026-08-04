/**
 * Application Root
 *
 * Main entry point for the WRTI Wildlife Park application.
 * Composes all providers and initializes the router.
 */

import { RouterProvider } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import ErrorBoundary from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { QueryProvider } from '@/providers';
import { router } from '@/routes';

/**
 * App Component
 *
 * Provider hierarchy (outer to inner):
 * 1. ErrorBoundary - Catches React errors
 * 2. ThemeProvider - Manages theme state
 * 3. QueryProvider - TanStack Query for server state
 * 4. TooltipProvider - Radix UI tooltips
 * 5. RouterProvider - React Router
 * 6. Toaster - Sonner notifications
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <QueryProvider>
          <TooltipProvider>
            <RouterProvider router={router} />
            <Toaster />
          </TooltipProvider>
        </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
