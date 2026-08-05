/**
 * Button Component
 *
 * Reusable button component with multiple variants, sizes, and states.
 * Supports loading, disabled, and icon states.
 */

import { forwardRef, ButtonHTMLAttributes, ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// ============================================================================
// Button Variants
// ============================================================================

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}

// ============================================================================
// Variant Styles
// ============================================================================

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active disabled:bg-primary-disabled disabled:text-primary-foreground',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-active disabled:bg-secondary-disabled disabled:text-secondary-foreground',
  outline:
    'border-2 border-border bg-transparent text-foreground hover:bg-surface active:bg-surface-variant disabled:border-disabled disabled:text-disabled-foreground',
  ghost:
    'bg-transparent text-foreground hover:bg-surface active:bg-surface-variant disabled:text-disabled-foreground',
  destructive:
    'bg-danger text-danger-foreground hover:bg-danger-hover active:bg-danger-active disabled:bg-danger-disabled disabled:text-danger-foreground',
  success:
    'bg-success text-success-foreground hover:bg-success-hover active:bg-success-active disabled:bg-success-disabled disabled:text-success-foreground',
};

// ============================================================================
// Size Styles
// ============================================================================

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-2 py-1 text-xs font-medium rounded-sm',
  sm: 'px-3 py-1.5 text-sm font-medium rounded-md',
  md: 'px-4 py-2 text-base font-medium rounded-md',
  lg: 'px-6 py-3 text-lg font-semibold rounded-lg',
  xl: 'px-8 py-4 text-xl font-semibold rounded-lg',
};

// ============================================================================
// Button Component
// ============================================================================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isDisabled = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabledState = isDisabled || disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabledState}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'transition-all duration-150 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ============================================================================
// Icon Button
// ============================================================================

interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: ReactNode;
  label?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, size = 'md', variant = 'ghost', className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-label={label}
        className={cn(
          'inline-flex items-center justify-center',
          'transition-all duration-150 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:cursor-not-allowed',
          variantStyles[variant],
          'rounded-md',
          size === 'xs' && 'p-1',
          size === 'sm' && 'p-1.5',
          size === 'md' && 'p-2',
          size === 'lg' && 'p-3',
          size === 'xl' && 'p-4',
          className
        )}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

// ============================================================================
// Button Group
// ============================================================================

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  orientation?: 'horizontal' | 'vertical';
}

export const ButtonGroup = ({
  children,
  orientation = 'horizontal',
  className,
  ...props
}: ButtonGroupProps) => (
  <div
    className={cn(
      'inline-flex',
      orientation === 'horizontal' ? 'flex-row' : 'flex-col',
      '[&>button:not(:last-child)]:rounded-r-none [&>button:not(:first-child)]:rounded-l-none',
      '[&>button:not(:last-child)]:border-r-0',
      className
    )}
    {...props}
  >
    {children}
  </div>
);
