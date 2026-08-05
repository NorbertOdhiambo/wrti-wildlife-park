/**
 * Card Component
 *
 * Reusable card component for content containers.
 * Supports multiple variants and states.
 */

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ============================================================================
// Card Variants
// ============================================================================

type CardVariant = 'standard' | 'interactive' | 'elevated' | 'outlined';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
  isClickable?: boolean;
  className?: string;
}

// ============================================================================
// Variant Styles
// ============================================================================

const variantStyles: Record<CardVariant, string> = {
  standard: 'bg-card text-card-foreground border border-border rounded-lg shadow-sm',
  interactive:
    'bg-card text-card-foreground border border-border rounded-lg shadow-sm hover:shadow-md hover:border-border-variant transition-all duration-200 cursor-pointer',
  elevated: 'bg-card text-card-foreground rounded-lg shadow-lg',
  outlined: 'bg-transparent text-foreground border-2 border-border rounded-lg',
};

// ============================================================================
// Card Component
// ============================================================================

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'standard', isClickable = false, className, ...props }, ref) => {
    const isInteractive = variant === 'interactive' || isClickable;

    return (
      <div
        ref={ref}
        className={cn(
          'p-6',
          variantStyles[variant],
          isInteractive && 'hover:shadow-md transition-shadow duration-200',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// ============================================================================
// Card Header
// ============================================================================

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-4 pb-4 border-b border-border', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

// ============================================================================
// Card Title
// ============================================================================

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold leading-snug', className)}
      {...props}
    >
      {children}
    </h3>
  )
);

CardTitle.displayName = 'CardTitle';

// ============================================================================
// Card Description
// ============================================================================

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  )
);

CardDescription.displayName = 'CardDescription';

// ============================================================================
// Card Content
// ============================================================================

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

// ============================================================================
// Card Footer
// ============================================================================

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-4 pt-4 border-t border-border flex gap-2', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';
