/**
 * Typography Components
 *
 * Reusable typography components that enforce consistent text styling
 * throughout the application.
 */

import { ReactNode, HTMLAttributes, ElementType } from 'react';
import { cn } from '@/lib/utils';

// ============================================================================
// Base Typography Component
// ============================================================================

interface BaseTypographyProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
}

// ============================================================================
// Display - Large, prominent headings
// ============================================================================

export const Display = ({ children, className, ...props }: BaseTypographyProps) => (
  <div
    className={cn(
      'text-5xl font-bold leading-tight tracking-tight',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// ============================================================================
// Heading 1 - Primary page heading
// ============================================================================

export const H1 = ({ children, className, ...props }: BaseTypographyProps) => (
  <h1
    className={cn(
      'text-4xl font-bold leading-tight tracking-tight',
      className
    )}
    {...props}
  >
    {children}
  </h1>
);

// ============================================================================
// Heading 2 - Section heading
// ============================================================================

export const H2 = ({ children, className, ...props }: BaseTypographyProps) => (
  <h2
    className={cn(
      'text-3xl font-bold leading-tight tracking-tight',
      className
    )}
    {...props}
  >
    {children}
  </h2>
);

// ============================================================================
// Heading 3 - Subsection heading
// ============================================================================

export const H3 = ({ children, className, ...props }: BaseTypographyProps) => (
  <h3
    className={cn(
      'text-2xl font-semibold leading-snug',
      className
    )}
    {...props}
  >
    {children}
  </h3>
);

// ============================================================================
// Heading 4 - Smaller heading
// ============================================================================

export const H4 = ({ children, className, ...props }: BaseTypographyProps) => (
  <h4
    className={cn(
      'text-xl font-semibold leading-snug',
      className
    )}
    {...props}
  >
    {children}
  </h4>
);

// ============================================================================
// Title - Prominent text
// ============================================================================

export const Title = ({ children, className, ...props }: BaseTypographyProps) => (
  <div
    className={cn(
      'text-lg font-semibold leading-snug',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// ============================================================================
// Subtitle - Secondary heading
// ============================================================================

export const Subtitle = ({ children, className, ...props }: BaseTypographyProps) => (
  <div
    className={cn(
      'text-base font-medium leading-normal',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// ============================================================================
// Body - Default text
// ============================================================================

export const Body = ({ children, className, ...props }: BaseTypographyProps) => (
  <p
    className={cn(
      'text-base font-normal leading-normal',
      className
    )}
    {...props}
  >
    {children}
  </p>
);

// ============================================================================
// Body Small - Smaller body text
// ============================================================================

export const BodySmall = ({ children, className, ...props }: BaseTypographyProps) => (
  <p
    className={cn(
      'text-sm font-normal leading-normal',
      className
    )}
    {...props}
  >
    {children}
  </p>
);

// ============================================================================
// Caption - Small text
// ============================================================================

export const Caption = ({ children, className, ...props }: BaseTypographyProps) => (
  <span
    className={cn(
      'text-xs font-normal leading-normal',
      className
    )}
    {...props}
  >
    {children}
  </span>
);

// ============================================================================
// Label - Form labels
// ============================================================================

export const Label = ({ children, className, ...props }: BaseTypographyProps) => (
  <label
    className={cn(
      'text-sm font-medium leading-normal',
      className
    )}
    {...props}
  >
    {children}
  </label>
);

// ============================================================================
// Overline - Uppercase label
// ============================================================================

export const Overline = ({ children, className, ...props }: BaseTypographyProps) => (
  <span
    className={cn(
      'text-xs font-semibold leading-normal uppercase tracking-widest',
      className
    )}
    {...props}
  >
    {children}
  </span>
);

// ============================================================================
// Muted - Secondary text
// ============================================================================

export const Muted = ({ children, className, ...props }: BaseTypographyProps) => (
  <span
    className={cn(
      'text-muted-foreground',
      className
    )}
    {...props}
  >
    {children}
  </span>
);

// ============================================================================
// Code - Monospace text
// ============================================================================

export const Code = ({ children, className, ...props }: BaseTypographyProps) => (
  <code
    className={cn(
      'font-mono text-sm bg-muted px-1.5 py-0.5 rounded',
      className
    )}
    {...props}
  >
    {children}
  </code>
);

// ============================================================================
// Text - Generic text component with variants
// ============================================================================

type TextVariant = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'title' | 'subtitle' | 'body' | 'bodySm' | 'caption' | 'label' | 'overline';

interface TextProps extends BaseTypographyProps {
  variant?: TextVariant;
  as?: ElementType;
}

const variantClasses: Record<TextVariant, string> = {
  display: 'text-5xl font-bold leading-tight tracking-tight',
  h1: 'text-4xl font-bold leading-tight tracking-tight',
  h2: 'text-3xl font-bold leading-tight tracking-tight',
  h3: 'text-2xl font-semibold leading-snug',
  h4: 'text-xl font-semibold leading-snug',
  title: 'text-lg font-semibold leading-snug',
  subtitle: 'text-base font-medium leading-normal',
  body: 'text-base font-normal leading-normal',
  bodySm: 'text-sm font-normal leading-normal',
  caption: 'text-xs font-normal leading-normal',
  label: 'text-sm font-medium leading-normal',
  overline: 'text-xs font-semibold leading-normal uppercase tracking-widest',
};

export const Text = ({
  children,
  variant = 'body',
  as: Component = 'span' as ElementType,
  className,
  ...props
}: TextProps) => {
  const Element = Component as ElementType;
  return (
    <Element
      className={cn(variantClasses[variant], className)}
      {...props}
    >
      {children}
    </Element>
  );
};
