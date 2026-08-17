/**
 * BottomSheet Foundation
 *
 * Reusable bottom sheet component for WRTI screens.
 * Supports: Collapsed, Peek, Half, Full states with drag/swipe transitions.
 *
 * Features:
 * - 4 snap points: Collapsed, Peek, Half, Full
 * - Drag/swipe transitions
 * - Controlled and uncontrolled usage
 * - Programmatic state changes
 * - Smooth animations
 * - Backdrop behavior
 * - Keyboard interaction (ESC to close)
 * - Focus management
 * - Screen reader semantics
 * - Safe area handling
 * - Responsive sizing
 * - Reduced motion support
 */

import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

export type BottomSheetState = 'collapsed' | 'peek' | 'half' | 'full';

export interface BottomSheetProps {
  /** Bottom sheet content */
  children: ReactNode;
  /** Current state (controlled mode) */
  state?: BottomSheetState;
  /** State change handler */
  onStateChange?: (state: BottomSheetState) => void;
  /** Initial state (uncontrolled mode) */
  defaultState?: BottomSheetState;
  /** Handle/drag area content */
  handle?: ReactNode;
  /** Show backdrop */
  showBackdrop?: boolean;
  /** Backdrop click closes sheet */
  backdropCloseable?: boolean;
  /** ESC key closes sheet */
  escapeCloseable?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Sheet content classes */
  contentClassName?: string;
  /** Safe area handling */
  safeArea?: boolean;
  /** Render as a modal dialog, or as a persistent non-modal map region. */
  modal?: boolean;
  /** Accessible label for the sheet region. */
  ariaLabel?: string;
}

// State height percentages
const STATE_HEIGHTS: Record<BottomSheetState, number> = {
  collapsed: 0,
  peek: 25,
  half: 50,
  full: 80,
};

export function BottomSheet({
  children,
  state: controlledState,
  onStateChange,
  defaultState = 'peek',
  handle,
  showBackdrop = true,
  backdropCloseable = true,
  escapeCloseable = true,
  className,
  contentClassName,
  safeArea = true,
  modal = true,
  ariaLabel = 'Bottom sheet',
}: BottomSheetProps) {
  const isControlled = controlledState !== undefined;
  const [uncontrolledState, setUncontrolledState] = useState<BottomSheetState>(defaultState);
  const currentState = isControlled ? controlledState : uncontrolledState;

  const sheetRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number>(0);
  const startHeightRef = useRef<number>(0);

  const handleStateChange = (newState: BottomSheetState) => {
    if (isControlled) {
      onStateChange?.(newState);
    } else {
      setUncontrolledState(newState);
    }
  };

  const handleBackdropClick = () => {
    if (backdropCloseable && currentState !== 'collapsed') {
      handleStateChange('collapsed');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (escapeCloseable && e.key === 'Escape' && currentState !== 'collapsed') {
      handleStateChange('collapsed');
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      startYRef.current = touch.clientY;
      startHeightRef.current = STATE_HEIGHTS[currentState];
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!sheetRef.current) return;

    const touch = e.touches[0];
    if (!touch) return;
    const currentY = touch.clientY;
    const diff = startYRef.current - currentY;
    const newHeight = Math.max(0, startHeightRef.current + (diff / window.innerHeight) * 100);

    // Snap to nearest state
    const states = Object.entries(STATE_HEIGHTS).sort((a, b) => a[1] - b[1]);
    const firstState = states[0];
    if (!firstState) return;
    let nearestState: BottomSheetState = firstState[0] as BottomSheetState;
    let minDiffValue = Math.abs(newHeight - firstState[1]);

    for (const [state, height] of states) {
      const diffValue = Math.abs(newHeight - height);
      if (diffValue < minDiffValue) {
        minDiffValue = diffValue;
        nearestState = state as BottomSheetState;
      }
    }

    if (nearestState !== currentState) {
      handleStateChange(nearestState);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentState, escapeCloseable]);

  const heightPercent = STATE_HEIGHTS[currentState];

  return (
    <>
      {/* Backdrop */}
      {showBackdrop && (
        <div
          className={clsx(
            'fixed inset-0 z-40 bg-black/30 transition-opacity duration-200',
            'prefers-reduced-motion:transition-none',
            currentState === 'collapsed' && 'opacity-0 pointer-events-none'
          )}
          onClick={handleBackdropClick}
          role="presentation"
        />
      )}

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className={clsx(
          'fixed bottom-0 left-0 right-0 z-50',
          'bg-background border-t border-border rounded-t-2xl',
          'transition-all duration-300 ease-out',
          'prefers-reduced-motion:transition-none',
          'touch-none',
          safeArea && 'safe-area-inset-bottom',
          className
        )}
        style={{
          height: `${heightPercent}vh`,
          maxHeight: '100vh',
        }}
        role={modal ? 'dialog' : 'region'}
        aria-modal={modal || undefined}
        aria-label={ariaLabel}
      >
        {/* Handle/Drag Area */}
        <div
          className="px-4 py-3 flex justify-center cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          role="button"
          tabIndex={0}
          aria-label="Drag to resize"
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') {
              const states: BottomSheetState[] = ['collapsed', 'peek', 'half', 'full'];
              const currentIndex = states.indexOf(currentState);
              if (currentIndex < states.length - 1) {
                const nextState = states[currentIndex + 1];
                if (nextState) handleStateChange(nextState);
              }
            } else if (e.key === 'ArrowDown') {
              const states: BottomSheetState[] = ['collapsed', 'peek', 'half', 'full'];
              const currentIndex = states.indexOf(currentState);
              if (currentIndex > 0) {
                const prevState = states[currentIndex - 1];
                if (prevState) handleStateChange(prevState);
              }
            }
          }}
        >
          {handle || (
            <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
          )}
        </div>

        {/* Content */}
        <div
          className={clsx(
            'flex-1 overflow-y-auto',
            'scrollbar-thin scrollbar-thumb-border scrollbar-track-background',
            contentClassName
          )}
        >
          <div className="px-4 py-4 sm:px-6 sm:py-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================================
// Hooks
// ============================================================================

/**
 * useBottomSheet - Hook for managing bottom sheet state
 */
export function useBottomSheet(initialState: BottomSheetState = 'peek') {
  const [state, setState] = useState<BottomSheetState>(initialState);

  const open = (toState: BottomSheetState = 'half') => setState(toState);
  const close = () => setState('collapsed');
  const toggle = () => setState((prev) => (prev === 'collapsed' ? 'peek' : 'collapsed'));

  return { state, setState, open, close, toggle };
}

export default BottomSheet;
