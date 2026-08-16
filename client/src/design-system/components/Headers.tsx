/**
 * WRTI Header Components
 *
 * Reusable header components for the WRTI Wildlife Park application.
 * Provides three header variants: App Header (main screens), Detail Header (sub-screens),
 * and Map Header (map-specific screens).
 *
 * All headers support:
 * - Responsive design (mobile, tablet, desktop)
 * - Accessibility (keyboard navigation, screen readers)
 * - Theming (light/dark modes)
 * - Safe area handling
 */

import { useEffect, useState } from 'react';
import { Icon } from '../icons';
import { clsx } from 'clsx';

// ============================================================================
// Type Definitions
// ============================================================================

export interface HeaderAction {
  icon: string;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'ghost';
  disabled?: boolean;
  badge?: number | string;
}

export interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  actions?: HeaderAction[];
  className?: string;
  sticky?: boolean;
}

export interface DetailHeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  actions?: HeaderAction[];
  className?: string;
  sticky?: boolean;
  showBackButton?: boolean;
}

export interface MapHeaderProps {
  onSearchClick?: () => void;
  profileImage?: string;
  profileName?: string;
  onProfileClick?: () => void;
  actions?: HeaderAction[];
  className?: string;
  sticky?: boolean;
}

export interface LandingHeaderProps {
  title?: string;
  profileImage?: string;
  onMenuClick?: () => void;
  onProfileClick?: () => void;
}

// ============================================================================
// App Header Component
// ============================================================================

/**
 * App Header - Used on main application screens (Map, Discovery, Tickets, Profile)
 *
 * Features:
 * - Optional title and subtitle
 * - Flexible action buttons
 * - Sticky positioning support
 * - Responsive layout
 */
export function AppHeader({
  title,
  subtitle,
  actions,
  className,
  sticky = false,
}: AppHeaderProps) {
  return (
    <header
      className={clsx(
        'bg-background border-b border-border transition-all duration-200',
        sticky && 'sticky top-0 z-40',
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Title Section */}
        <div className="flex-1 min-w-0">
          {title && (
            <h1 className="text-lg font-semibold text-foreground truncate">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-sm text-muted-foreground truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Actions Section */}
        {actions && actions.length > 0 && (
          <div className="flex items-center gap-2 ml-4 flex-shrink-0">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                disabled={action.disabled}
                aria-label={action.label}
                title={action.label}
                className={clsx(
                  'relative p-2 rounded-lg transition-colors duration-200',
                  'hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  action.variant === 'destructive' &&
                    'text-destructive hover:bg-destructive/10',
                  action.variant === 'ghost' && 'text-muted-foreground',
                  !action.variant && 'text-foreground'
                )}
              >
                <Icon name={action.icon} size={24} />
                {action.badge && (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-destructive rounded-full">
                    {action.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

// ============================================================================
// Landing Header Component
// ============================================================================

/**
 * Landing Header - Source-specific application-shell variant for the Stitch
 * home screen. The shared shell still owns the header; this variation preserves
 * the reference's floating, translucent, scroll-responsive composition.
 */
export function LandingHeader({
  title = 'WRTI Wildlife Park',
  profileImage,
  onMenuClick,
  onProfileClick,
}: LandingHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'fixed top-2 left-2 right-2 z-50 mx-5 grid h-14 grid-cols-[40px_1fr_40px] items-center rounded-full border border-[#bdcaba]/30 px-4 backdrop-blur-md transition-[background-color,box-shadow] duration-200',
        scrolled ? 'bg-[rgba(240,251,254,0.95)] shadow-lg' : 'bg-[rgba(240,251,254,0.8)] shadow-md'
      )}
    >
      <button
        type="button"
        aria-label="Open menu"
        onClick={onMenuClick}
        className="flex h-10 w-10 items-center justify-center rounded-full text-[#3e4a3d] transition-colors duration-200 hover:bg-[#dfeaed]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#006b2c] focus-visible:ring-offset-2 active:scale-95"
      >
        <Icon name="menu" size={24} />
      </button>
      <h1 className="justify-self-center truncate px-2 font-serif text-[16px] font-semibold leading-6 tracking-tight text-[#006b2c] sm:text-[24px]">
        {title}
      </h1>
      <button
        type="button"
        aria-label="Open profile"
        onClick={onProfileClick}
        className="h-8 w-8 justify-self-end overflow-hidden rounded-full border border-[#bdcaba]/30 transition-[box-shadow,transform] duration-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#006b2c] focus-visible:ring-offset-2 active:scale-95"
      >
        {profileImage ? (
          <img src={profileImage} alt="Profile picture of user" className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-[#e5f0f2] text-[#006b2c]">
            <Icon name="profile" size={18} />
          </span>
        )}
      </button>
    </header>
  );
}

// ============================================================================
// Detail Header Component
// ============================================================================

/**
 * Detail Header - Used on detail/sub-screens (Species Detail, Settings, etc.)
 *
 * Features:
 * - Back button for navigation
 * - Optional title and subtitle
 * - Flexible action buttons
 * - Sticky positioning support
 * - Responsive layout
 */
export function DetailHeader({
  title,
  subtitle,
  onBack,
  actions,
  className,
  sticky = false,
  showBackButton = true,
}: DetailHeaderProps) {
  return (
    <header
      className={clsx(
        'bg-background border-b border-border transition-all duration-200',
        sticky && 'sticky top-0 z-40',
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Back Button & Title Section */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {showBackButton && (
            <button
              onClick={onBack}
              aria-label="Go back"
              className={clsx(
                'p-2 rounded-lg transition-colors duration-200',
                'hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'flex-shrink-0'
              )}
            >
              <Icon name="back" size={24} />
            </button>
          )}

          <div className="flex-1 min-w-0">
            {title && (
              <h1 className="text-lg font-semibold text-foreground truncate">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm text-muted-foreground truncate mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Actions Section */}
        {actions && actions.length > 0 && (
          <div className="flex items-center gap-2 ml-4 flex-shrink-0">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                disabled={action.disabled}
                aria-label={action.label}
                title={action.label}
                className={clsx(
                  'relative p-2 rounded-lg transition-colors duration-200',
                  'hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  action.variant === 'destructive' &&
                    'text-destructive hover:bg-destructive/10',
                  action.variant === 'ghost' && 'text-muted-foreground',
                  !action.variant && 'text-foreground'
                )}
              >
                <Icon name={action.icon} size={24} />
                {action.badge && (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-destructive rounded-full">
                    {action.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

// ============================================================================
// Map Header Component
// ============================================================================

/**
 * Map Header - Used on map screens (Main Map Navigation, Discovery Map)
 *
 * Features:
 * - Search bar with click handler
 * - User profile section with avatar
 * - Flexible action buttons
 * - Sticky positioning support
 * - Responsive layout
 */
export function MapHeader({
  onSearchClick,
  profileImage,
  profileName,
  onProfileClick,
  actions,
  className,
  sticky = false,
}: MapHeaderProps) {
  return (
    <header
      className={clsx(
        'bg-background border-b border-border transition-all duration-200',
        sticky && 'sticky top-0 z-40',
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 gap-3">
        {/* Search Bar */}
        <button
          onClick={onSearchClick}
          className={clsx(
            'flex-1 flex items-center gap-3 px-4 py-2 rounded-lg',
            'bg-secondary border border-border',
            'text-muted-foreground hover:bg-secondary/80',
            'transition-colors duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          )}
        >
          <Icon name="search" size={20} className="text-muted-foreground" />
          <span className="text-sm">Search...</span>
        </button>

        {/* Profile Section */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Actions */}
          {actions && actions.length > 0 && (
            <div className="flex items-center gap-2">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  aria-label={action.label}
                  title={action.label}
                  className={clsx(
                    'relative p-2 rounded-lg transition-colors duration-200',
                    'hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    action.variant === 'destructive' &&
                      'text-destructive hover:bg-destructive/10',
                    action.variant === 'ghost' && 'text-muted-foreground',
                    !action.variant && 'text-foreground'
                  )}
                >
                  <Icon name={action.icon} size={24} />
                  {action.badge && (
                    <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-destructive rounded-full">
                      {action.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Profile Avatar */}
          <button
            onClick={onProfileClick}
            aria-label={profileName || 'Profile'}
            title={profileName || 'Profile'}
            className={clsx(
              'p-1 rounded-lg transition-colors duration-200',
              'hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
            )}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt={profileName || 'Profile'}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="profile" size={20} className="text-primary" />
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

// ============================================================================
// Exports
// ============================================================================

export default {
  AppHeader,
  LandingHeader,
  DetailHeader,
  MapHeader,
};
