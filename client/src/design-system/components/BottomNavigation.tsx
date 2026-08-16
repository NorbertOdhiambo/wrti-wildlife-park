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
  activeId?: string;
  onNavigate?: (id: string) => void;
  className?: string;
  showLabels?: boolean;
  variant?: 'standard' | 'landing';
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
  variant = 'standard',
}: BottomNavigationProps) {
  const isLandingVariant = variant === 'landing';
  return (
    <nav
      className={clsx(
        'fixed z-50',
        isLandingVariant
          ? 'bottom-[calc(20px+env(safe-area-inset-bottom))] left-5 right-5 rounded-full border border-[#bdcaba]/30 bg-[rgba(255,255,255,0.9)] px-4 pb-4 pt-2 shadow-xl backdrop-blur-xl md:hidden'
          : 'bottom-0 left-0 right-0 border-t border-border bg-background safe-area-inset-bottom',
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={clsx('flex items-center justify-around', isLandingVariant ? 'min-h-14' : 'h-16 sm:h-20')}>
        {items.map((item) => {
          const isActive = Boolean(activeId) && item.id === activeId;
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
                isLandingVariant ? 'rounded-full px-5 py-2' : 'px-3 py-2 sm:px-4 sm:py-3',
                'transition-all duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                'relative',
                isActive
                  ? (isLandingVariant ? 'bg-[#7ffc97] text-[#005320]' : 'text-primary')
                  : (isLandingVariant ? 'text-[#3e4a3d] hover:text-[#006b2c]' : 'text-muted-foreground hover:text-foreground'),
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
                  fill={isLandingVariant && isActive}
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
              {isActive && !isLandingVariant && (
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
