/**
 * Badge and Chip Components
 *
 * Reusable badge and chip components for semantic labels and tags.
 */

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

// ============================================================================
// Badge Component
// ============================================================================

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const badgeVariants: Record<BadgeVariant, string> = {
  success: 'bg-success/20 text-success border border-success/30',
  warning: 'bg-warning/20 text-warning border border-warning/30',
  danger: 'bg-danger/20 text-danger border border-danger/30',
  info: 'bg-information/20 text-information border border-information/30',
  neutral: 'bg-muted text-muted-foreground border border-border',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'neutral', className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold',
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
);

Badge.displayName = 'Badge';

// ============================================================================
// Chip Component
// ============================================================================

type ChipVariant = 'default' | 'filled' | 'outlined';

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: ChipVariant;
  onRemove?: () => void;
  isSelected?: boolean;
  isDisabled?: boolean;
  className?: string;
}

const chipVariants: Record<ChipVariant, string> = {
  default: 'bg-surface text-foreground border border-border hover:bg-surface-variant',
  filled: 'bg-primary text-primary-foreground border border-primary hover:bg-primary-hover',
  outlined: 'bg-transparent text-foreground border border-border hover:bg-surface',
};

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      children,
      variant = 'default',
      onRemove,
      isSelected = false,
      isDisabled = false,
      className,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium',
        'transition-all duration-150 ease-out',
        chipVariants[variant],
        isSelected && 'ring-2 ring-primary ring-offset-2',
        isDisabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          disabled={isDisabled}
          className="ml-1 p-0.5 hover:bg-black/10 rounded-full transition-colors"
          aria-label="Remove"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  )
);

Chip.displayName = 'Chip';

// ============================================================================
// Status Badge
// ============================================================================

type StatusVariant = 'active' | 'inactive' | 'pending' | 'error' | 'warning';

interface StatusBadgeProps extends HTMLAttributes<HTMLDivElement> {
  status: StatusVariant;
  label?: string;
  className?: string;
}

const statusColors: Record<StatusVariant, string> = {
  active: 'bg-success/20 text-success',
  inactive: 'bg-muted text-muted-foreground',
  pending: 'bg-warning/20 text-warning',
  error: 'bg-danger/20 text-danger',
  warning: 'bg-warning/20 text-warning',
};

const statusDots: Record<StatusVariant, string> = {
  active: 'bg-success',
  inactive: 'bg-muted-foreground',
  pending: 'bg-warning',
  error: 'bg-danger',
  warning: 'bg-warning',
};

export const StatusBadge = forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ status, label, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold',
        statusColors[status],
        className
      )}
      {...props}
    >
      <span className={cn('h-2 w-2 rounded-full', statusDots[status])} />
      {label || status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  )
);

StatusBadge.displayName = 'StatusBadge';

// ============================================================================
// Tag Component
// ============================================================================

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  icon?: ReactNode;
  onRemove?: () => void;
  className?: string;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ children, icon, onRemove, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md',
        'bg-accent/10 text-accent border border-accent/20',
        'text-xs font-medium',
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 p-0 hover:bg-black/10 rounded transition-colors"
          aria-label="Remove tag"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  )
);

Tag.displayName = 'Tag';
