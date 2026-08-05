/**
 * Design Tokens
 *
 * Centralized token system for the WRTI Wildlife Park design system.
 * Defines all reusable design values including colors, typography, spacing,
 * shadows, and motion tokens.
 *
 * These tokens serve as the single source of truth for all design decisions
 * and enable consistent theming across the application.
 */

// ============================================================================
// Color Tokens
// ============================================================================

export const colorTokens = {
  // Semantic Colors - Light Theme
  light: {
    // Primary
    primary: '#2D5016', // Deep forest green
    primaryForeground: '#FFFFFF',
    primaryHover: '#1F3810',
    primaryActive: '#162A0B',
    primaryDisabled: '#D4E5C8',

    // Secondary
    secondary: '#6B8E23', // Olive green
    secondaryForeground: '#FFFFFF',
    secondaryHover: '#556B1A',
    secondaryActive: '#3F4E12',
    secondaryDisabled: '#E8EDD7',

    // Accent
    accent: '#D4AF37', // Gold
    accentForeground: '#2D5016',
    accentHover: '#C99F2E',
    accentActive: '#B8941F',
    accentDisabled: '#F0E8D8',

    // Success
    success: '#10B981', // Emerald
    successForeground: '#FFFFFF',
    successHover: '#059669',
    successActive: '#047857',
    successDisabled: '#D1FAE5',

    // Warning
    warning: '#F59E0B', // Amber
    warningForeground: '#FFFFFF',
    warningHover: '#D97706',
    warningActive: '#B45309',
    warningDisabled: '#FEF3C7',

    // Danger
    danger: '#EF4444', // Red
    dangerForeground: '#FFFFFF',
    dangerHover: '#DC2626',
    dangerActive: '#B91C1C',
    dangerDisabled: '#FEE2E2',

    // Information
    information: '#3B82F6', // Blue
    informationForeground: '#FFFFFF',
    informationHover: '#2563EB',
    informationActive: '#1D4ED8',
    informationDisabled: '#DBEAFE',

    // Neutral
    background: '#FFFFFF',
    foreground: '#1F2937',
    surface: '#F9FAFB',
    surfaceVariant: '#F3F4F6',
    border: '#E5E7EB',
    borderVariant: '#D1D5DB',
    divider: '#E5E7EB',

    // Semantic
    muted: '#9CA3AF',
    mutedForeground: '#6B7280',
    disabled: '#D1D5DB',
    disabledForeground: '#9CA3AF',
    placeholder: '#9CA3AF',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.25)',
  },

  // Semantic Colors - Dark Theme
  dark: {
    // Primary
    primary: '#7CB342', // Light green
    primaryForeground: '#1F2937',
    primaryHover: '#9CCC65',
    primaryActive: '#558B2F',
    primaryDisabled: '#33691E',

    // Secondary
    secondary: '#AED581', // Light olive
    secondaryForeground: '#1F2937',
    secondaryHover: '#C5E1A5',
    secondaryActive: '#9CCC65',
    secondaryDisabled: '#558B2F',

    // Accent
    accent: '#FFD54F', // Light gold
    accentForeground: '#1F2937',
    accentHover: '#FFEB3B',
    accentActive: '#FBC02D',
    accentDisabled: '#F57F17',

    // Success
    success: '#66BB6A', // Light emerald
    successForeground: '#FFFFFF',
    successHover: '#81C784',
    successActive: '#4CAF50',
    successDisabled: '#2E7D32',

    // Warning
    warning: '#FFA726', // Light amber
    warningForeground: '#FFFFFF',
    warningHover: '#FFB74D',
    warningActive: '#FF9800',
    warningDisabled: '#E65100',

    // Danger
    danger: '#EF5350', // Light red
    dangerForeground: '#FFFFFF',
    dangerHover: '#F44336',
    dangerActive: '#E53935',
    dangerDisabled: '#B71C1C',

    // Information
    information: '#64B5F6', // Light blue
    informationForeground: '#FFFFFF',
    informationHover: '#42A5F5',
    informationActive: '#2196F3',
    informationDisabled: '#1565C0',

    // Neutral
    background: '#111827',
    foreground: '#F3F4F6',
    surface: '#1F2937',
    surfaceVariant: '#374151',
    border: '#4B5563',
    borderVariant: '#6B7280',
    divider: '#4B5563',

    // Semantic
    muted: '#9CA3AF',
    mutedForeground: '#D1D5DB',
    disabled: '#4B5563',
    disabledForeground: '#9CA3AF',
    placeholder: '#9CA3AF',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.75)',
    overlayLight: 'rgba(0, 0, 0, 0.5)',
  },
} as const;

// ============================================================================
// Typography Tokens
// ============================================================================

export const typographyTokens = {
  // Font Families
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
    serif: 'Georgia, "Times New Roman", serif',
  },

  // Font Sizes
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
  },

  // Font Weights
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Line Heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Typography Scales
  scales: {
    // Display - Large, prominent headings
    display: {
      fontSize: '3rem', // 48px
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },

    // Heading 1 - Primary page heading
    h1: {
      fontSize: '2.25rem', // 36px
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '-0.01em',
    },

    // Heading 2 - Section heading
    h2: {
      fontSize: '1.875rem', // 30px
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '-0.01em',
    },

    // Heading 3 - Subsection heading
    h3: {
      fontSize: '1.5rem', // 24px
      fontWeight: 600,
      lineHeight: 1.375,
      letterSpacing: '-0.005em',
    },

    // Title - Smaller heading
    title: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
      lineHeight: 1.375,
      letterSpacing: '0em',
    },

    // Subtitle - Secondary heading
    subtitle: {
      fontSize: '1.125rem', // 18px
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },

    // Body - Default text
    body: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },

    // Body Small - Smaller body text
    bodySm: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },

    // Caption - Small text
    caption: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },

    // Label - Form labels
    label: {
      fontSize: '0.875rem', // 14px
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },

    // Overline - Uppercase label
    overline: {
      fontSize: '0.75rem', // 12px
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
  },
} as const;

// ============================================================================
// Spacing Tokens
// ============================================================================

export const spacingTokens = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  7: '1.75rem', // 28px
  8: '2rem', // 32px
  9: '2.25rem', // 36px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  14: '3.5rem', // 56px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  28: '7rem', // 112px
  32: '8rem', // 128px
  36: '9rem', // 144px
  40: '10rem', // 160px
  44: '11rem', // 176px
  48: '12rem', // 192px
  52: '13rem', // 208px
  56: '14rem', // 224px
  60: '15rem', // 240px
  64: '16rem', // 256px
  72: '18rem', // 288px
  80: '20rem', // 320px
  96: '24rem', // 384px
} as const;

// ============================================================================
// Border Radius Tokens
// ============================================================================

export const borderRadiusTokens = {
  none: '0',
  xs: '0.125rem', // 2px
  sm: '0.25rem', // 4px
  md: '0.5rem', // 8px
  lg: '0.75rem', // 12px
  xl: '1rem', // 16px
  '2xl': '1.5rem', // 24px
  '3xl': '2rem', // 32px
  full: '9999px',
} as const;

// ============================================================================
// Shadow Tokens (Elevation)
// ============================================================================

export const shadowTokens = {
  // Subtle shadow for slight elevation
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',

  // Small shadow for cards and small components
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',

  // Medium shadow for moderate elevation
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',

  // Large shadow for significant elevation
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',

  // Extra large shadow for prominent elevation
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

  // Extra extra large shadow for maximum elevation
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

  // Inset shadow
  inset: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',

  // No shadow
  none: 'none',
} as const;

// ============================================================================
// Motion Tokens
// ============================================================================

export const motionTokens = {
  // Duration tokens (milliseconds)
  duration: {
    // Instant - for immediate feedback
    instant: '0ms',

    // Fast - for quick interactions
    fast: '100ms',

    // Base - standard duration for most interactions
    base: '150ms',

    // Normal - standard duration for transitions
    normal: '200ms',

    // Slow - for emphasis or important transitions
    slow: '300ms',

    // Slower - for complex animations
    slower: '500ms',

    // Slowest - for entrance/exit animations
    slowest: '700ms',
  },

  // Easing tokens
  easing: {
    // Linear - constant speed
    linear: 'linear',

    // Ease in - slow start, fast end
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',

    // Ease out - fast start, slow end (most natural)
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',

    // Ease in-out - slow start and end
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

    // Smooth - very smooth easing
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',

    // Sharp - quick and snappy
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',

    // Spring-like - bouncy easing
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',

    // Decelerate - fast start, slow end
    decelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',

    // Accelerate - slow start, fast end
    accelerate: 'cubic-bezier(0.3, 0.07, 0.4, 0.95)',
  },

  // Spring presets for physics-based animations
  spring: {
    // Stiff spring - quick and snappy
    stiff: {
      stiffness: 210,
      damping: 20,
      mass: 1,
    },

    // Gentle spring - smooth and natural
    gentle: {
      stiffness: 120,
      damping: 14,
      mass: 1,
    },

    // Molasses spring - slow and smooth
    molasses: {
      stiffness: 280,
      damping: 60,
      mass: 1,
    },

    // Wobbly spring - playful and bouncy
    wobbly: {
      stiffness: 180,
      damping: 12,
      mass: 1,
    },
  },

  // Transition presets
  transition: {
    // Quick transition for small changes
    quick: 'all 100ms cubic-bezier(0.4, 0, 0.2, 1)',

    // Standard transition
    standard: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',

    // Smooth transition for emphasis
    smooth: 'all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',

    // Entrance animation
    entrance: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',

    // Exit animation
    exit: 'all 200ms cubic-bezier(0.3, 0, 0.8, 0.15)',
  },
} as const;

// ============================================================================
// Z-Index Tokens
// ============================================================================

export const zIndexTokens = {
  // Base layers
  hide: '-1',
  base: '0',

  // Dropdown and popover
  dropdown: '1000',
  sticky: '1020',

  // Fixed positioning
  fixed: '1030',

  // Modal backdrop
  modalBackdrop: '1040',

  // Modal
  modal: '1050',

  // Popover
  popover: '1060',

  // Tooltip
  tooltip: '1070',

  // Notification/Toast
  notification: '1080',

  // Maximum
  max: '2147483647',
} as const;

// ============================================================================
// Breakpoint Tokens
// ============================================================================

export const breakpointTokens = {
  // Mobile
  xs: '320px',

  // Mobile landscape / small tablet
  sm: '640px',

  // Tablet
  md: '768px',

  // Tablet landscape / small desktop
  lg: '1024px',

  // Desktop
  xl: '1280px',

  // Large desktop
  '2xl': '1536px',
} as const;

// ============================================================================
// Component-Specific Tokens
// ============================================================================

export const componentTokens = {
  // Button tokens
  button: {
    paddingX: spacingTokens[4],
    paddingY: spacingTokens[2],
    borderRadius: borderRadiusTokens.md,
    fontSize: typographyTokens.fontSize.base,
    fontWeight: typographyTokens.fontWeight.medium,
    transitionDuration: motionTokens.duration.fast,
  },

  // Card tokens
  card: {
    borderRadius: borderRadiusTokens.lg,
    shadow: shadowTokens.sm,
    padding: spacingTokens[6],
  },

  // Input tokens
  input: {
    borderRadius: borderRadiusTokens.md,
    fontSize: typographyTokens.fontSize.base,
    paddingX: spacingTokens[3],
    paddingY: spacingTokens[2],
    height: '2.5rem', // 40px
  },

  // Badge tokens
  badge: {
    borderRadius: borderRadiusTokens.full,
    fontSize: typographyTokens.fontSize.xs,
    fontWeight: typographyTokens.fontWeight.semibold,
    paddingX: spacingTokens[2],
    paddingY: spacingTokens[1],
  },

  // Chip tokens
  chip: {
    borderRadius: borderRadiusTokens.full,
    fontSize: typographyTokens.fontSize.sm,
    paddingX: spacingTokens[3],
    paddingY: spacingTokens[2],
  },

  // Dialog tokens
  dialog: {
    borderRadius: borderRadiusTokens.lg,
    shadow: shadowTokens['2xl'],
    maxWidth: '32rem', // 512px
  },

  // Sheet tokens
  sheet: {
    borderRadius: `${borderRadiusTokens.xl} ${borderRadiusTokens.xl} 0 0`,
    shadow: shadowTokens.xl,
  },

  // Tooltip tokens
  tooltip: {
    borderRadius: borderRadiusTokens.sm,
    fontSize: typographyTokens.fontSize.xs,
    padding: `${spacingTokens[1]} ${spacingTokens[2]}`,
    shadow: shadowTokens.md,
  },
} as const;

// ============================================================================
// Export all tokens
// ============================================================================

export const designTokens = {
  colors: colorTokens,
  typography: typographyTokens,
  spacing: spacingTokens,
  borderRadius: borderRadiusTokens,
  shadows: shadowTokens,
  motion: motionTokens,
  zIndex: zIndexTokens,
  breakpoints: breakpointTokens,
  components: componentTokens,
} as const;

export type DesignTokens = typeof designTokens;
