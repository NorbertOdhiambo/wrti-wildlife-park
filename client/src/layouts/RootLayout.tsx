/**
 * WRTI Global Application Shell
 *
 * The visitor-facing Header and Bottom Navigation live here rather than in
 * individual pages. Routes inherit both by default and may explicitly opt
 * out through their React Router `handle.shell` metadata.
 */

import { useMemo } from 'react';
import { useLocation, useMatches, useNavigate, Outlet } from 'react-router-dom';
import {
  AppHeader,
  DetailHeader,
  MapHeader,
} from '@/design-system/components/Headers';
import {
  BottomNavigation,
  WRTI_NAV_ITEMS,
} from '@/design-system/components/BottomNavigation';

export type ShellHeaderMode = 'app' | 'detail' | 'map' | 'hidden';
export type ShellBottomNavigationMode = 'default' | 'hidden';

export interface WRTIShellConfig {
  header?: ShellHeaderMode;
  bottomNavigation?: ShellBottomNavigationMode;
  activeNav?: string;
  title?: string;
  subtitle?: string;
}

export interface WRTIRouteHandle {
  shell?: WRTIShellConfig;
}

const DEFAULT_SHELL: Required<Pick<WRTIShellConfig, 'header' | 'bottomNavigation' | 'title'>> = {
  header: 'app',
  bottomNavigation: 'default',
  title: 'WRTI Wildlife Park',
};

const NAVIGATION_PATHS: Record<string, string> = {
  map: '/map',
  discovery: '/discovery',
  tickets: '/tickets',
  profile: '/profile',
};

function useShellConfig(): WRTIShellConfig {
  const matches = useMatches();

  return useMemo(() => {
    return matches.reduce<WRTIShellConfig>((config, match) => {
      const routeHandle = match.handle as WRTIRouteHandle | undefined;
      return routeHandle?.shell ? { ...config, ...routeHandle.shell } : config;
    }, { ...DEFAULT_SHELL });
  }, [matches]);
}

export default function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const shell = useShellConfig();
  const showHeader = shell.header !== 'hidden';
  const showBottomNavigation = shell.bottomNavigation !== 'hidden';

  const activeNav = shell.activeNav ?? (
    location.pathname === '/' ? undefined :
      Object.entries(NAVIGATION_PATHS).find(([, path]) => location.pathname.startsWith(path))?.[0]
  );

  const header = showHeader ? (
    shell.header === 'detail' ? (
      <DetailHeader
        title={shell.title}
        subtitle={shell.subtitle}
        onBack={() => navigate(-1)}
        sticky
      />
    ) : shell.header === 'map' ? (
      <MapHeader
        onSearchClick={() => navigate('/discovery')}
        onProfileClick={() => navigate('/profile')}
        profileName="Profile"
        sticky
      />
    ) : (
      <AppHeader title={shell.title} subtitle={shell.subtitle} sticky />
    )
  ) : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {header}

      <main className={showBottomNavigation ? 'min-h-screen pb-20' : 'min-h-screen'}>
        <Outlet />
      </main>

      {showBottomNavigation && (
        <BottomNavigation
          items={WRTI_NAV_ITEMS}
          activeId={activeNav}
          onNavigate={(id) => navigate(NAVIGATION_PATHS[id] ?? '/')}
        />
      )}
    </div>
  );
}
