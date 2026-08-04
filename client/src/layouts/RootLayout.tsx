/**
 * Root Layout
 *
 * Main application layout wrapper.
 * Provides:
 * - Navigation structure
 * - Sidebar/drawer
 * - Main content area
 * - Footer
 */

import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="flex h-screen flex-col">
      {/* Header - To be implemented */}
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="text-lg font-semibold">WRTI Wildlife Park</div>
          <nav className="flex gap-4">
            {/* Navigation items - To be implemented */}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      {/* Footer - To be implemented */}
      <footer className="border-t bg-background">
        <div className="container py-4 text-sm text-muted-foreground">
          {/* Footer content - To be implemented */}
        </div>
      </footer>
    </div>
  );
}
