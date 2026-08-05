/**
 * Layout Primitives
 *
 * Reusable layout components that encourage consistent spacing
 * and structure throughout the application.
 */

import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// ============================================================================
// Container - Centered content wrapper
// ============================================================================

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const containerSizes = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'w-full',
};

export const Container = ({
  children,
  size = 'lg',
  className,
  ...props
}: ContainerProps) => (
  <div
    className={cn(
      'mx-auto px-4 sm:px-6 lg:px-8',
      containerSizes[size],
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// ============================================================================
// Stack - Vertical spacing
// ============================================================================

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  className?: string;
}

const stackSpacing = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const alignItems = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyContent = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

export const Stack = ({
  children,
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  className,
  ...props
}: StackProps) => (
  <div
    className={cn(
      'flex flex-col',
      stackSpacing[spacing],
      alignItems[align],
      justifyContent[justify],
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// ============================================================================
// HStack - Horizontal spacing
// ============================================================================

interface HStackProps extends Omit<StackProps, 'spacing'> {
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const HStack = ({
  children,
  spacing = 'md',
  align = 'center',
  justify = 'start',
  className,
  ...props
}: HStackProps) => (
  <div
    className={cn(
      'flex flex-row',
      stackSpacing[spacing],
      alignItems[align],
      justifyContent[justify],
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// ============================================================================
// Grid - Multi-column layout
// ============================================================================

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const gridColumns = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
};

const gridGap = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

export const Grid = ({
  children,
  columns = 3,
  gap = 'md',
  className,
  ...props
}: GridProps) => (
  <div
    className={cn(
      'grid',
      gridColumns[columns],
      gridGap[gap],
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// ============================================================================
// Section - Content section with padding
// ============================================================================

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sectionPadding = {
  xs: 'px-4 py-2 sm:px-6 sm:py-3',
  sm: 'px-4 py-3 sm:px-6 sm:py-4',
  md: 'px-4 py-4 sm:px-6 sm:py-6',
  lg: 'px-4 py-6 sm:px-8 sm:py-8',
  xl: 'px-4 py-8 sm:px-8 sm:py-12',
};

export const Section = ({
  children,
  padding = 'md',
  className,
  ...props
}: SectionProps) => (
  <section
    className={cn(
      sectionPadding[padding],
      className
    )}
    {...props}
  >
    {children}
  </section>
);

// ============================================================================
// Spacer - Empty space component
// ============================================================================

interface SpacerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  axis?: 'horizontal' | 'vertical';
}

const spacerSizes = {
  xs: { horizontal: 'w-2', vertical: 'h-2' },
  sm: { horizontal: 'w-3', vertical: 'h-3' },
  md: { horizontal: 'w-4', vertical: 'h-4' },
  lg: { horizontal: 'w-6', vertical: 'h-6' },
  xl: { horizontal: 'w-8', vertical: 'h-8' },
};

export const Spacer = ({
  size = 'md',
  axis = 'vertical',
  className,
  ...props
}: SpacerProps) => (
  <div
    className={cn(
      spacerSizes[size][axis],
      className
    )}
    {...props}
  />
);

// ============================================================================
// Inline - Horizontal inline elements with wrapping
// ============================================================================

interface InlineProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Inline = ({
  children,
  spacing = 'md',
  className,
  ...props
}: InlineProps) => (
  <div
    className={cn(
      'flex flex-wrap',
      stackSpacing[spacing],
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// ============================================================================
// Divider - Visual separator
// ============================================================================

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Divider = ({
  orientation = 'horizontal',
  className,
  ...props
}: DividerProps) => (
  <hr
    className={cn(
      'border-border',
      orientation === 'horizontal' ? 'w-full' : 'h-full',
      className
    )}
    {...props}
  />
);

// ============================================================================
// Aspect Ratio - Maintain aspect ratio
// ============================================================================

interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  ratio?: number; // width / height
  className?: string;
}

export const AspectRatio = ({
  children,
  ratio = 16 / 9,
  className,
  ...props
}: AspectRatioProps) => (
  <div
    className={cn('relative w-full', className)}
    style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
    {...props}
  >
    <div className="absolute inset-0">
      {children}
    </div>
  </div>
);
