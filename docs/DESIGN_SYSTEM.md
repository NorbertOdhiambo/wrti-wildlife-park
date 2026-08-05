# Design System Documentation

## Overview

The WRTI Wildlife Park Design System is a comprehensive, production-ready UI foundation that provides reusable components, tokens, and utilities for building consistent, accessible, and responsive interfaces.

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Components](#components)
3. [Hooks](#hooks)
4. [Theme System](#theme-system)
5. [Usage Examples](#usage-examples)
6. [Accessibility](#accessibility)
7. [Responsive Design](#responsive-design)

---

## Design Tokens

Design tokens are the single source of truth for all design decisions. They enable consistent theming and make future branding changes simple.

### Color Tokens

Colors are organized semantically rather than by name, supporting both light and dark themes.

**Light Theme:**
- `primary` / `primary-foreground` - Primary action color (forest green)
- `secondary` / `secondary-foreground` - Secondary action color (olive)
- `accent` / `accent-foreground` - Accent color (gold)
- `success` / `success-foreground` - Success state (emerald)
- `warning` / `warning-foreground` - Warning state (amber)
- `danger` / `danger-foreground` - Danger/error state (red)
- `information` / `information-foreground` - Information state (blue)
- `background` / `foreground` - Primary text and background
- `surface` / `surface-variant` - Secondary background
- `border` / `border-variant` - Border colors
- `muted` / `muted-foreground` - Muted/secondary text
- `disabled` / `disabled-foreground` - Disabled state

**Dark Theme:**
Automatically inverted for dark mode support.

### Typography Tokens

Predefined typography scales for consistent text styling:

- `display` - Large, prominent headings (48px)
- `h1` - Primary page heading (36px)
- `h2` - Section heading (30px)
- `h3` - Subsection heading (24px)
- `h4` - Smaller heading (20px)
- `title` - Prominent text (20px)
- `subtitle` - Secondary heading (18px)
- `body` - Default text (16px)
- `bodySm` - Smaller body text (14px)
- `caption` - Small text (12px)
- `label` - Form labels (14px)
- `overline` - Uppercase labels (12px)

### Spacing Tokens

Consistent spacing scale (0-96 in 4px increments):

```
0, 1 (4px), 2 (8px), 3 (12px), 4 (16px), 5 (20px), 6 (24px), 8 (32px), 12 (48px), 16 (64px), etc.
```

### Border Radius Tokens

- `none` - 0px
- `xs` - 2px
- `sm` - 4px
- `md` - 8px
- `lg` - 12px
- `xl` - 16px
- `2xl` - 24px
- `full` - 9999px (fully rounded)

### Shadow Tokens (Elevation)

- `xs` - Subtle shadow
- `sm` - Small elevation
- `md` - Medium elevation
- `lg` - Large elevation
- `xl` - Extra large elevation
- `2xl` - Maximum elevation
- `inset` - Inset shadow
- `none` - No shadow

### Motion Tokens

**Durations:**
- `instant` - 0ms
- `fast` - 100ms
- `base` - 150ms
- `normal` - 200ms
- `slow` - 300ms
- `slower` - 500ms
- `slowest` - 700ms

**Easing Functions:**
- `linear` - Constant speed
- `easeOut` - Fast start, slow end (most natural)
- `easeIn` - Slow start, fast end
- `easeInOut` - Slow start and end
- `smooth` - Very smooth easing
- `sharp` - Quick and snappy
- `spring` - Bouncy easing

---

## Components

### Typography Components

Enforce consistent text styling throughout the application.

```tsx
import { H1, H2, Body, Caption, Text } from '@/design-system';

// Semantic components
<H1>Page Title</H1>
<H2>Section Title</H2>
<Body>Body text</Body>
<Caption>Small caption</Caption>

// Generic component with variants
<Text variant="h3">Heading 3</Text>
<Text variant="body">Body text</Text>
<Text variant="caption">Caption</Text>
```

### Layout Primitives

Encourage consistent spacing and structure.

```tsx
import { Container, Stack, HStack, Grid, Section, Spacer } from '@/design-system';

// Centered container
<Container size="lg">
  <H1>Content</H1>
</Container>

// Vertical stack with spacing
<Stack spacing="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

// Horizontal stack
<HStack spacing="lg" align="center">
  <Icon />
  <Text>Label</Text>
</HStack>

// Grid layout
<Grid columns={3} gap="md">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>

// Section with padding
<Section padding="lg">
  <Body>Section content</Body>
</Section>
```

### Button Components

Multiple variants and sizes for different contexts.

```tsx
import { Button, IconButton, ButtonGroup } from '@/design-system';
import { Heart } from 'lucide-react';

// Standard button
<Button variant="primary" size="md">
  Click me
</Button>

// Button with loading state
<Button isLoading>Loading...</Button>

// Button with icons
<Button leftIcon={<Heart />}>Like</Button>
<Button rightIcon={<Arrow />}>Next</Button>

// Icon button
<IconButton icon={<Heart />} label="Like" />

// Button group
<ButtonGroup>
  <Button>Option 1</Button>
  <Button>Option 2</Button>
  <Button>Option 3</Button>
</ButtonGroup>

// Variants: primary, secondary, outline, ghost, destructive, success
```

### Card Components

Flexible card containers for content.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/design-system';

<Card variant="standard">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Variants: standard, interactive, elevated, outlined
```

### Badge & Chip Components

Semantic labels and tags.

```tsx
import { Badge, Chip, StatusBadge, Tag } from '@/design-system';

// Badge
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>

// Chip
<Chip variant="filled" onRemove={() => {}}>
  Removable Chip
</Chip>

// Status badge
<StatusBadge status="active" label="Active" />

// Tag
<Tag icon={<Icon />} onRemove={() => {}}>
  Tag Label
</Tag>
```

### Input Components

Form inputs with validation and error states.

```tsx
import { Input, Textarea, Checkbox, Radio, Switch } from '@/design-system';

// Text input
<Input
  label="Name"
  placeholder="Enter your name"
  error="Name is required"
  helperText="Enter your full name"
/>

// Search input
<SearchInput placeholder="Search..." />

// Textarea
<Textarea
  label="Message"
  rows={4}
  placeholder="Enter your message"
/>

// Checkbox
<Checkbox label="I agree to the terms" />

// Radio
<Radio label="Option 1" name="options" />

// Switch/Toggle
<Switch label="Enable notifications" />
```

### State Components

Loading, empty, and error states.

```tsx
import {
  LoadingSpinner,
  EmptyState,
  ErrorState,
  Progress,
  SkeletonLoader,
  StatusIndicator,
} from '@/design-system';

// Loading spinner
<LoadingSpinner size="md" label="Loading..." />

// Empty state
<EmptyState
  title="No items found"
  description="Try adjusting your search criteria"
  action={<Button>Clear filters</Button>}
/>

// Error state
<ErrorState
  title="Something went wrong"
  message="Failed to load data"
  action={<Button>Try again</Button>}
/>

// Progress bar
<Progress value={65} label="Progress" />

// Skeleton loader
<SkeletonLoader count={3} height="2rem" />

// Status indicator
<StatusIndicator status="success" label="Connected" />
```

---

## Hooks

Reusable hooks for common interactions and responsive design.

### Responsive Design Hooks

```tsx
import {
  useBreakpoint,
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
} from '@/design-system';

// Get current breakpoint
const breakpoint = useBreakpoint(); // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// Check media query
const isDark = useMediaQuery('(prefers-color-scheme: dark)');

// Convenience hooks
const isMobile = useIsMobile();
const isTablet = useIsTablet();
const isDesktop = useIsDesktop();

// Conditional rendering
{isMobile && <MobileLayout />}
{isDesktop && <DesktopLayout />}
```

### Interaction Hooks

```tsx
import {
  useClickOutside,
  useKeyPress,
  useToggle,
} from '@/design-system';

// Detect clicks outside element
const ref = useClickOutside(() => {
  setIsOpen(false);
});

// Detect key presses
const isEscPressed = useKeyPress('Escape');

// Toggle boolean state
const [isOpen, toggle, setIsOpen] = useToggle(false);
```

### Utility Hooks

```tsx
import {
  useDebounce,
  useThrottle,
  usePrevious,
  useLocalStorage,
  useAsync,
  useWindowSize,
} from '@/design-system';

// Debounce values
const debouncedSearchTerm = useDebounce(searchTerm, 300);

// Throttle function calls
const handleScroll = useThrottle(() => {
  // Handle scroll
}, 100);

// Get previous value
const prevValue = usePrevious(value);

// Manage local storage
const [theme, setTheme] = useLocalStorage('theme', 'light');

// Handle async operations
const { status, data, error } = useAsync(() => fetchData());

// Get window size
const { width, height } = useWindowSize();
```

---

## Theme System

Support for light and dark themes with system preference detection.

```tsx
import { ThemeProvider, useTheme } from '@/design-system';

// Wrap application with ThemeProvider
function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <YourApp />
    </ThemeProvider>
  );
}

// Use theme in components
function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
      Toggle theme
    </button>
  );
}
```

---

## Usage Examples

### Building a Feature Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
  HStack,
  Body,
} from '@/design-system';
import { Heart } from 'lucide-react';

export function TreeCard({ tree }) {
  return (
    <Card variant="interactive">
      <CardHeader>
        <HStack justify="between" align="start">
          <div>
            <CardTitle>{tree.name}</CardTitle>
            <CardDescription>{tree.scientificName}</CardDescription>
          </div>
          <Badge variant="success">{tree.conservationStatus}</Badge>
        </HStack>
      </CardHeader>
      <CardContent>
        <Body>{tree.description}</Body>
      </CardContent>
      <CardFooter>
        <Button variant="primary" fullWidth>
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Building a Responsive Layout

```tsx
import { Container, Stack, Grid, useIsMobile } from '@/design-system';

export function TreeGrid({ trees }) {
  const isMobile = useIsMobile();

  return (
    <Container size="lg">
      <Grid columns={isMobile ? 1 : 3} gap="lg">
        {trees.map(tree => (
          <TreeCard key={tree.id} tree={tree} />
        ))}
      </Grid>
    </Container>
  );
}
```

### Building a Form

```tsx
import { Stack, Input, Textarea, Checkbox, Button } from '@/design-system';
import { useState } from 'react';

export function TreeForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    agree: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="md">
        <Input
          label="Tree Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <Checkbox
          label="I confirm this information is accurate"
          checked={formData.agree}
          onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
        />
        <Button type="submit" fullWidth>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
```

---

## Accessibility

All components are built with accessibility in mind:

- **Keyboard Navigation** - All interactive components support keyboard navigation
- **Focus Management** - Clear focus indicators on all interactive elements
- **Screen Readers** - Proper ARIA labels and semantic HTML
- **Color Contrast** - All color combinations meet WCAG AA standards
- **Reduced Motion** - Respects `prefers-reduced-motion` preference
- **Semantic HTML** - Proper heading hierarchy, form labels, etc.

---

## Responsive Design

The design system supports responsive design through:

1. **Breakpoints** - xs (320px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
2. **Responsive Hooks** - `useBreakpoint()`, `useIsMobile()`, `useIsDesktop()`
3. **Flexible Components** - All components support responsive sizing and spacing
4. **Tailwind Utilities** - Use Tailwind's responsive prefixes (sm:, md:, lg:, etc.)

### Responsive Example

```tsx
import { Grid, useBreakpoint } from '@/design-system';

export function ResponsiveGrid() {
  const breakpoint = useBreakpoint();
  
  const columns = {
    xs: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
    '2xl': 4,
  };

  return (
    <Grid columns={columns[breakpoint]}>
      {/* Grid items */}
    </Grid>
  );
}
```

---

## Best Practices

1. **Use Semantic Components** - Prefer `<H1>` over `<Text variant="h1">`
2. **Leverage Layout Primitives** - Use `<Stack>`, `<HStack>`, `<Grid>` for consistent spacing
3. **Respect Design Tokens** - Use tokens instead of hardcoded values
4. **Mobile First** - Design for mobile, then enhance for larger screens
5. **Accessibility First** - Include proper labels, ARIA attributes, and keyboard support
6. **Composition Over Props** - Compose components rather than creating many prop combinations
7. **Document Components** - Add JSDoc comments explaining usage and props
8. **Test Responsiveness** - Test components on multiple screen sizes

---

## Future Enhancements

- Storybook integration for component documentation
- Animation library with Framer Motion presets
- Advanced overlay components (Dialogs, Sheets, Popovers)
- Icon system wrapper
- Advanced form components
- Data visualization components
