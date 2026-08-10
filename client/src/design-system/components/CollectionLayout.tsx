/**
 * CollectionLayout Primitive
 *
 * Reusable layout component for collection-based WRTI screens.
 * Supports: list layouts, grid layouts, sectioned collections, responsive columns.
 */

import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { LoadingSpinner } from './States';

export type CollectionLayoutMode = 'list' | 'grid';

export interface CollectionLayoutProps {
  header?: ReactNode;
  children: ReactNode;
  mode?: CollectionLayoutMode;
  columns?: number | { mobile: number; tablet: number; desktop: number };
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyState?: ReactNode;
  isError?: boolean;
  errorState?: ReactNode;
  className?: string;
  containerClassName?: string;
  safeArea?: boolean;
}

export function CollectionLayout({
  header,
  children,
  mode = 'list',
  columns = 1,
  isLoading = false,
  isEmpty = false,
  emptyState,
  isError = false,
  errorState,
  className,
  containerClassName,
  safeArea = true,
}: CollectionLayoutProps) {
  const getColumnClasses = () => {
    if (typeof columns === 'number') {
      return `grid-cols-${columns}`;
    }

    const { mobile, tablet, desktop } = columns;
    return clsx(
      `grid-cols-${mobile}`,
      `sm:grid-cols-${tablet}`,
      `lg:grid-cols-${desktop}`
    );
  };

  const containerClasses = clsx(
    mode === 'grid' && 'grid gap-4 sm:gap-6 lg:gap-8',
    mode === 'grid' && getColumnClasses(),
    mode === 'list' && 'space-y-2 sm:space-y-3',
    containerClassName
  );

  return (
    <div
      className={clsx(
        'w-full',
        safeArea && 'safe-area-inset-left safe-area-inset-right',
        className
      )}
    >
      {header && (
        <div className="mb-6 sm:mb-8">
          {header}
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner />
        </div>
      )}

      {isError && !isLoading && errorState && (
        <div className="py-12">
          {errorState}
        </div>
      )}

      {isEmpty && !isLoading && !isError && emptyState && (
        <div className="py-12">
          {emptyState}
        </div>
      )}

      {!isLoading && !isError && !isEmpty && (
        <div className={containerClasses}>
          {children}
        </div>
      )}
    </div>
  );
}

export interface SectionedCollectionProps {
  sections: {
    id: string;
    title: string;
    subtitle?: string;
    items: ReactNode;
  }[];
  mode?: CollectionLayoutMode;
  columns?: number | { mobile: number; tablet: number; desktop: number };
  className?: string;
  safeArea?: boolean;
}

export function SectionedCollection({
  sections,
  mode = 'list',
  columns = 1,
  className,
  safeArea = true,
}: SectionedCollectionProps) {
  const getColumnClasses = () => {
    if (typeof columns === 'number') {
      return `grid-cols-${columns}`;
    }

    const { mobile, tablet, desktop } = columns;
    return clsx(
      `grid-cols-${mobile}`,
      `sm:grid-cols-${tablet}`,
      `lg:grid-cols-${desktop}`
    );
  };

  const containerClasses = (itemMode: CollectionLayoutMode) =>
    clsx(
      itemMode === 'grid' && 'grid gap-4 sm:gap-6 lg:gap-8',
      itemMode === 'grid' && getColumnClasses(),
      itemMode === 'list' && 'space-y-2 sm:space-y-3'
    );

  return (
    <div
      className={clsx(
        'w-full space-y-8 sm:space-y-12',
        safeArea && 'safe-area-inset-left safe-area-inset-right',
        className
      )}
    >
      {sections.map((section) => (
        <section key={section.id}>
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="text-sm text-muted-foreground mt-1">
                {section.subtitle}
              </p>
            )}
          </div>

          <div className={containerClasses(mode)}>
            {section.items}
          </div>
        </section>
      ))}
    </div>
  );
}

export default CollectionLayout;
