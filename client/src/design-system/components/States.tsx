/**
 * State Components
 *
 * Reusable components for loading, empty, and error states.
 */

import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, Package, Loader2 } from 'lucide-react';

// ============================================================================
// Loading Spinner
// ============================================================================

interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

const spinnerSizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export const LoadingSpinner = ({
  size = 'md',
  label,
  className,
  ...props
}: LoadingSpinnerProps) => (
  <div className={cn('flex flex-col items-center justify-center gap-3', className)} {...props}>
    <Loader2 className={cn('animate-spin text-primary', spinnerSizes[size])} />
    {label && <p className="text-sm text-muted-foreground">{label}</p>}
  </div>
);

// ============================================================================
// Skeleton
// ============================================================================

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div
    className={cn(
      'bg-muted rounded-md animate-pulse',
      className
    )}
    {...props}
  />
);

// ============================================================================
// Empty State
// ============================================================================

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = ({
  icon = <Package className="h-12 w-12 text-muted-foreground" />,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center gap-4 py-12 px-4',
      className
    )}
    {...props}
  >
    <div className="text-muted-foreground">{icon}</div>
    <div className="text-center">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      )}
    </div>
    {action && <div className="mt-4">{action}</div>}
  </div>
);

// ============================================================================
// Error State
// ============================================================================

interface ErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  action?: ReactNode;
  className?: string;
}

export const ErrorState = ({
  title = 'Something went wrong',
  message,
  action,
  className,
  ...props
}: ErrorStateProps) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center gap-4 py-12 px-4',
      'bg-danger/5 border border-danger/20 rounded-lg',
      className
    )}
    {...props}
  >
    <AlertCircle className="h-12 w-12 text-danger" />
    <div className="text-center">
      <h3 className="text-lg font-semibold text-danger">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{message}</p>
    </div>
    {action && <div className="mt-4">{action}</div>}
  </div>
);

// ============================================================================
// Loading Overlay
// ============================================================================

interface LoadingOverlayProps extends HTMLAttributes<HTMLDivElement> {
  isVisible: boolean;
  label?: string;
  className?: string;
}

export const LoadingOverlay = ({
  isVisible,
  label,
  className,
  ...props
}: LoadingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 bg-black/50 flex items-center justify-center z-50',
        className
      )}
      {...props}
    >
      <LoadingSpinner label={label} />
    </div>
  );
};

// ============================================================================
// Progress Indicator
// ============================================================================

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number; // 0-100
  max?: number;
  label?: string;
  showLabel?: boolean;
  className?: string;
}

export const Progress = ({
  value,
  max = 100,
  label,
  showLabel = true,
  className,
  ...props
}: ProgressProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn('w-full', className)} {...props}>
      {(label || showLabel) && (
        <div className="flex items-center justify-between mb-2">
          {label && <span className="text-sm font-medium text-foreground">{label}</span>}
          {showLabel && (
            <span className="text-sm text-muted-foreground">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// ============================================================================
// Skeleton Loader
// ============================================================================

interface SkeletonLoaderProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  height?: string;
  className?: string;
}

export const SkeletonLoader = ({
  count = 3,
  height = '1rem',
  className,
  ...props
}: SkeletonLoaderProps) => (
  <div className={cn('space-y-3', className)} {...props}>
    {Array.from({ length: count }).map((_, i) => (
      <Skeleton key={i} style={{ height }} />
    ))}
  </div>
);

// ============================================================================
// Status Indicator
// ============================================================================

type StatusType = 'success' | 'error' | 'warning' | 'info' | 'loading';

interface StatusIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  status: StatusType;
  label?: string;
  className?: string;
}

const statusColors: Record<StatusType, string> = {
  success: 'bg-success text-success-foreground',
  error: 'bg-danger text-danger-foreground',
  warning: 'bg-warning text-warning-foreground',
  info: 'bg-information text-information-foreground',
  loading: 'bg-muted text-muted-foreground',
};

export const StatusIndicator = ({
  status,
  label,
  className,
  ...props
}: StatusIndicatorProps) => (
  <div
    className={cn(
      'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium',
      statusColors[status],
      className
    )}
    {...props}
  >
    {status === 'loading' ? (
      <Loader2 className="h-3 w-3 animate-spin" />
    ) : (
      <span className="h-2 w-2 rounded-full bg-current" />
    )}
    {label}
  </div>
);
