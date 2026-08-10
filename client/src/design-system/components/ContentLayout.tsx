/**
 * ContentLayout Primitive
 *
 * Reusable layout component for content-oriented WRTI screens.
 * Supports: Tree Detail, Settings, Help, Tickets, Profile, Discovery, and other informational experiences.
 *
 * Features:
 * - Flexible header section (with optional sticky behavior)
 * - Scrollable content area with safe area handling
 * - Responsive content width (mobile, tablet, desktop)
 * - Section-based content organization
 * - Safe area padding
 * - Mobile-first responsive design
 * - Accessibility support
 */

import { clsx } from 'clsx';
import type { ReactNode } from 'react';

// ============================================================================
// Type Definitions
// ============================================================================

export interface ContentLayoutProps {
  /** Header content (typically DetailHeader component) */
  header?: ReactNode;
  /** Main scrollable content */
  children: ReactNode;
  /** Footer content (sticky at bottom) */
  footer?: ReactNode;
  /** Additional CSS classes for the container */
  className?: string;
  /** CSS classes for the content area */
  contentClassName?: string;
  /** Whether header should be sticky */
  stickyHeader?: boolean;
  /** Whether footer should be sticky */
  stickyFooter?: boolean;
  /** Safe area handling */
  safeArea?: boolean;
}

// ============================================================================
// ContentLayout Component
// ============================================================================

/**
 * ContentLayout - Reusable layout for content-oriented screens
 *
 * Provides a structured layout for content screens with:
 * - Optional sticky header
 * - Scrollable content area
 * - Optional sticky footer
 * - Responsive width management
 * - Safe area handling
 * - Mobile-first design
 *
 * Usage:
 * ```tsx
 * <ContentLayout
 *   header={<DetailHeader title="Species Name" onBack={handleBack} />}
 *   footer={<Button>Action</Button>}
 * >
 *   <Section title="Description">
 *     <p>Species description...</p>
 *   </Section>
 * </ContentLayout>
 * ```
 */
export function ContentLayout({
  header,
  children,
  footer,
  className,
  contentClassName,
  stickyHeader = false,
  stickyFooter = true,
  safeArea = true,
}: ContentLayoutProps) {
  return (
    <div
      className={clsx(
        'flex flex-col h-screen bg-background',
        className
      )}
    >
      {/* Header */}
      {header && (
        <div
          className={clsx(
            'flex-shrink-0',
            stickyHeader && 'sticky top-0 z-40',
            safeArea && 'safe-area-inset-top'
          )}
        >
          {header}
        </div>
      )}

      {/* Content Area */}
      <div
        className={clsx(
          'flex-1 overflow-y-auto',
          'scrollbar-thin scrollbar-thumb-border scrollbar-track-background',
          safeArea && 'safe-area-inset-left safe-area-inset-right',
          contentClassName
        )}
      >
        <div
          className={clsx(
            'w-full mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8',
            'max-w-4xl'
          )}
        >
          {children}
        </div>
      </div>

      {/* Footer */}
      {footer && (
        <div
          className={clsx(
            'flex-shrink-0',
            'border-t border-border bg-background',
            stickyFooter && 'sticky bottom-0 z-40',
            safeArea && 'safe-area-inset-bottom'
          )}
        >
          <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            {footer}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Section Component
// ============================================================================

/**
 * Section - Reusable content section within ContentLayout
 *
 * Provides consistent spacing and structure for content sections.
 */
export interface SectionProps {
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Section content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show a divider below the section */
  divider?: boolean;
}

export function Section({
  title,
  subtitle,
  children,
  className,
  divider = true,
}: SectionProps) {
  return (
    <section className={clsx('mb-8', className)}>
      {/* Section Header */}
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h2 className="text-xl font-semibold text-foreground">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Section Content */}
      <div className="space-y-4">
        {children}
      </div>

      {/* Divider */}
      {divider && (
        <div className="mt-8 border-t border-border" />
      )}
    </section>
  );
}

// ============================================================================
// Exports
// ============================================================================

export default ContentLayout;
