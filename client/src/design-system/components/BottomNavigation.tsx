/**
 * WRTI Bottom Navigation Component
 *
 * Persistent bottom navigation bar for the WRTI Wildlife Park application.
 * Provides navigation between main sections: Map, Discovery, Tickets, Profile.
 *
 * Features:
 * - 4-tab navigation model (configurable)
 * - Active state indication
 * - Badge support (notifications, counts)
 * - Responsive design (mobile-first)
 * - Full accessibility support (keyboard, screen readers)
 * - Safe area handling for notched devices
 * - Smooth transitions and animations
 */

import { Icon } from '../icons';
import { clsx } from 'clsx';

// ============================================================================
// Type Definitions
// ============================================================================

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  onClick?: () => void;
  badge?: number | string;
  disabled?: boolean;
}

export interface BottomNavigationProps {
  items: NavItem[];
  activeId: string;
  onNavigate?: (id: string) => void;
  className?: string;
  showLabels?: boolean;
}

// ============================================================================
// Bottom Navigation Component
// ============================================================================

/**
 * Bottom Navigation - Persistent navigation bar for main application sections
 *
 * Features:
 * - Configurable navigation items
 * - Active state tracking
 * - Badge support for notifications/counts
 * - Responsive design (shows/hides labels based on viewport)
 * - Full keyboard and screen reader support
 * - Safe area handling
 * - Smooth animations
 *
 * @param items - Array of navigation items
 * @param activeId - ID of the currently active item
 * @param onNavigate - Callback when user navigates to a new item
 * @param showLabels - Whether to show labels (default: true on desktop, false on mobile)
 */
export function BottomNavigation({
  items,
  activeId,
  onNavigate,
  className,
  showLabels = true,
}: BottomNavigationProps) {
  return (
    <nav
      className={clsx(
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-background border-t border-border',
        'safe-area-inset-bottom',
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around h-16 sm:h-20">
        {items.map((item) => {
          const isActive = item.id === activeId;
          const handleClick = () => {
            if (!item.disabled && onNavigate) {
              onNavigate(item.id);
            }
          };

          return (
            <button
              key={item.id}
              onClick={handleClick}
              disabled={item.disabled}
              className={clsx(
                'flex flex-col items-center justify-center gap-1',
                'px-3 py-2 sm:px-4 sm:py-3',
                'transition-all duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                'relative',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground',
                item.disabled && 'opacity-50 cursor-not-allowed',
                !item.disabled && 'cursor-pointer'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              title={item.label}
            >
              {/* Icon */}
              <div className="relative">
                <Icon
                  name={item.icon}
                  size={24}
                  className={clsx(
                    'transition-transform duration-200',
                    isActive && 'scale-110'
                  )}
                />

                {/* Badge */}
                {item.badge && (
                  <span
                    className={clsx(
                      'absolute -top-2 -right-2',
                      'flex items-center justify-center',
                      'min-w-5 h-5 px-1.5',
                      'text-xs font-bold text-white',
                      'bg-destructive rounded-full',
                      'animate-pulse'
                    )}
                  >
                    {typeof item.badge === 'number' && item.badge > 99
                      ? '99+'
                      : item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              {showLabels && (
                <span
                  className={clsx(
                    'text-xs font-medium',
                    'transition-opacity duration-200',
                    isActive ? 'opacity-100' : 'opacity-75'
                  )}
                >
                  {item.label}
                </span>
              )}

              {/* Active Indicator */}
              {isActive && (
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ============================================================================
// Preset Configurations
// ============================================================================

/**
 * WRTI Default Navigation Items
 * Standard 4-tab navigation for the main application
 */
export const WRTI_NAV_ITEMS: NavItem[] = [
  {
    id: 'map',
    label: 'Map',
    icon: 'map',
  },
  {
    id: 'discovery',
    label: 'Discovery',
    icon: 'discovery',
  },
  {
    id: 'tickets',
    label: 'Tickets',
    icon: 'ticket',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: 'profile',
  },
];

// ============================================================================
// Exports
// ============================================================================

export default BottomNavigation;
