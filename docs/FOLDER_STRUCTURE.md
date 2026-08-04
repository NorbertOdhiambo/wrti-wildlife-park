# Folder Structure Guide

This document explains the organization of the WRTI Wildlife Park project and the purpose of each directory.

## Root Level

```
wrti-wildlife-park/
├── client/              # Frontend application
├── server/              # Backend placeholder
├── shared/              # Shared types and constants
├── docs/                # Documentation
├── .git/                # Git repository
├── .gitignore           # Git ignore rules
├── .editorconfig        # Editor configuration
├── .prettierrc           # Prettier configuration
├── eslint.config.js     # ESLint configuration
├── vite.config.ts       # Vite configuration
├── vitest.config.ts     # Vitest configuration
├── tsconfig.json        # TypeScript configuration
├── tsconfig.node.json   # TypeScript config for build tools
├── package.json         # Project dependencies
├── pnpm-lock.yaml       # Dependency lock file
└── README.md            # Project overview
```

## Client Directory

The `client/` directory contains the entire frontend application.

```
client/
├── public/              # Static assets (favicon, robots.txt only)
│   ├── favicon.ico
│   ├── robots.txt
│   └── manifest.json
├── src/                 # Source code
│   ├── app/            # App entry point
│   ├── assets/         # Images, fonts, etc. (avoid - use external storage)
│   ├── components/     # Reusable UI components
│   ├── config/         # Configuration files
│   ├── constants/      # Application constants
│   ├── contexts/       # React contexts
│   ├── features/       # Feature modules
│   ├── hooks/          # Global custom hooks
│   ├── layouts/        # Layout components
│   ├── lib/            # Utility libraries
│   ├── pages/          # Page components
│   ├── providers/      # React providers
│   ├── routes/         # Route configuration
│   ├── services/       # API and data services
│   ├── stores/         # Zustand stores
│   ├── styles/         # Global styles
│   ├── tests/          # Test configuration
│   ├── types/          # Shared TypeScript types
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Entry point
│   ├── index.css       # Global styles and Tailwind
│   └── vite-env.d.ts   # Vite environment types
└── index.html          # HTML template
```

## Features Directory

Each feature is self-contained with its own structure.

```
features/
├── map/                 # Map feature
│   ├── components/      # Map-specific components
│   │   ├── MapView.tsx
│   │   ├── MapControls.tsx
│   │   └── MapLayers.tsx
│   ├── hooks/          # Map-specific hooks
│   │   ├── useMapInteractions.ts
│   │   └── useMapCamera.ts
│   ├── services/       # Map-specific services
│   │   └── mapService.ts
│   ├── state/          # Map-specific stores
│   │   └── index.ts
│   ├── types/          # Map-specific types
│   │   └── index.ts
│   ├── utils/          # Map-specific utilities
│   │   └── mapUtils.ts
│   ├── tests/          # Map-specific tests
│   │   ├── MapView.test.tsx
│   │   └── useMapInteractions.test.ts
│   └── index.ts        # Public API
├── trees/              # Trees feature
├── navigation/         # Navigation feature
├── search/             # Search feature
├── discovery/          # Discovery journal feature
├── offline/            # Offline functionality
├── settings/           # Settings feature
└── help/               # Help feature
```

## Services Directory

The `services/` directory contains API and data access logic.

```
services/
├── api/                # HTTP client
│   ├── client.ts       # API client implementation
│   └── index.ts        # Public API
├── repositories/       # Data access layer
│   ├── base.repository.ts
│   ├── tree.repository.ts
│   ├── park.repository.ts
│   ├── route.repository.ts
│   └── index.ts        # Public API
└── index.ts            # Service exports
```

### API Client (`services/api/`)

- `client.ts` - Main HTTP client with error handling and retries
- Handles all network communication
- Provides type-safe request/response handling

### Repositories (`services/repositories/`)

- `base.repository.ts` - Base class for all repositories
- `tree.repository.ts` - Tree data access
- `park.repository.ts` - Park data access
- `route.repository.ts` - Route data access
- Each repository transforms API responses to domain models

## Stores Directory

Global state management using Zustand.

```
stores/
├── ui.store.ts         # UI state (theme, modals, notifications)
├── map.store.ts        # Map state (viewport, selections)
├── discovery.store.ts  # Discovery state
├── settings.store.ts   # User settings and preferences
├── offline.store.ts    # Offline state
└── index.ts            # Store exports
```

## Components Directory

Reusable UI components and shadcn/ui components.

```
components/
├── ui/                 # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   ├── select.tsx
│   └── ... (other shadcn/ui components)
├── ErrorBoundary.tsx   # Error boundary component
├── LoadingSpinner.tsx  # Loading indicator
├── EmptyState.tsx      # Empty state component
└── ... (other shared components)
```

## Types Directory

Shared TypeScript type definitions.

```
types/
└── index.ts            # All shared types
    - Common types (Coordinates, Bounds, Pagination)
    - Park domain types
    - Tree domain types
    - Discovery domain types
    - Navigation domain types
    - Search domain types
    - User preferences types
    - Offline data types
    - UI state types
```

## Utilities Directory

Global utility functions.

```
utils/
└── index.ts            # Utility functions
    - formatDistance()
    - formatDuration()
    - calculateDistance()
    - debounce()
    - throttle()
    - retry()
    - deepClone()
    - isEmpty()
```

## Providers Directory

React providers for global setup.

```
providers/
├── QueryProvider.tsx   # TanStack Query provider
├── index.ts            # Provider exports
```

## Routes Directory

Route configuration.

```
routes/
└── index.tsx           # Route definitions and router setup
```

## Layouts Directory

Layout components for different page structures.

```
layouts/
└── RootLayout.tsx      # Main application layout
```

## Pages Directory

Page-level components (one per route).

```
pages/
├── Home.tsx            # Home/Map page
├── DiscoveryPage.tsx   # Discovery journal page
├── SettingsPage.tsx    # Settings page
├── HelpPage.tsx        # Help page
├── OfflineManagementPage.tsx
└── NotFound.tsx        # 404 page
```

## Config Directory

Configuration files.

```
config/
└── index.ts            # Application configuration
    - Environment settings
    - Feature flags
    - API configuration
    - Map configuration
    - Analytics configuration
```

## Constants Directory

Application constants.

```
constants/
└── index.ts            # Constants
    - Environment variables
    - Storage keys
    - API endpoints
    - Map configuration
    - Pagination settings
    - Timeouts
    - Cache configuration
```

## Contexts Directory

React contexts for shared state.

```
contexts/
└── ThemeContext.tsx    # Theme context (light/dark mode)
```

## Tests Directory

Test configuration and utilities.

```
tests/
├── setup.ts            # Test setup and mocks
├── unit/               # Unit tests
├── integration/        # Integration tests
└── e2e/                # E2E tests
```

## Hooks Directory

Global custom hooks (not feature-specific).

```
hooks/
├── useComposition.ts   # Composition utilities
├── useMobile.tsx       # Mobile detection
└── usePersistFn.ts     # Persist function
```

## Lib Directory

Utility libraries and helpers.

```
lib/
└── utils.ts            # Utility functions (cn, etc.)
```

## Styles Directory

Global styles (if needed beyond index.css).

```
styles/
└── (typically empty - use Tailwind and index.css)
```

## Docs Directory

Project documentation.

```
docs/
├── ARCHITECTURE.md     # Architecture guide
├── DEVELOPMENT.md      # Development guide
├── CONTRIBUTING.md     # Contributing guide
├── FOLDER_STRUCTURE.md # This file
└── API.md              # API documentation
```

## Shared Directory

Shared types and constants between frontend and backend.

```
shared/
├── const.ts            # Shared constants
└── types.ts            # Shared types (if needed)
```

## Server Directory

Backend placeholder (not implemented in Phase 1).

```
server/
└── index.ts            # Backend entry point
```

## File Naming Conventions

### React Components
- **Filename**: `PascalCase` (e.g., `TreeCard.tsx`)
- **Export**: `PascalCase` (e.g., `export const TreeCard`)
- **Props Interface**: `${ComponentName}Props` (e.g., `TreeCardProps`)

### Hooks
- **Filename**: `camelCase` (e.g., `useTreeData.ts`)
- **Export**: `camelCase` (e.g., `export const useTreeData`)

### Stores
- **Filename**: `camelCase` with `Store` suffix (e.g., `mapStore.ts`)
- **Export**: `camelCase` with `use` prefix (e.g., `export const useMapStore`)

### Types
- **Filename**: `camelCase` or `types.ts` (e.g., `types.ts`)
- **Export**: `PascalCase` (e.g., `export interface Tree`)

### Utilities
- **Filename**: `camelCase` (e.g., `formatDistance.ts`)
- **Export**: `camelCase` (e.g., `export const formatDistance`)

### Tests
- **Filename**: `${filename}.test.ts` (e.g., `TreeCard.test.tsx`)

### Services/Repositories
- **Filename**: `camelCase` with suffix (e.g., `tree.repository.ts`)
- **Export**: `PascalCase` class (e.g., `export class TreeRepository`)

## Import Paths

Use path aliases for clean imports:

```typescript
// ✅ Good
import { TreeCard } from '@components/TreeCard';
import { useTreeData } from '@features/trees/hooks';
import { Tree } from '@types';
import { useMapStore } from '@stores';

// ❌ Avoid
import { TreeCard } from '../../../components/TreeCard';
import { useTreeData } from '../../../../features/trees/hooks';
```

## Adding New Files

When adding new files, follow these guidelines:

1. **Determine the feature** - Which feature does this belong to?
2. **Choose the directory** - Which subdirectory within the feature?
3. **Follow naming conventions** - Use appropriate naming for the file type
4. **Create related files** - Component + types + tests together
5. **Update index.ts** - Export from feature's `index.ts`
6. **Update imports** - Use path aliases

## Best Practices

1. **Keep directories focused** - Each directory should have a clear purpose
2. **Co-locate related files** - Component, types, tests, and hooks together
3. **Use barrel exports** - Export public API via `index.ts`
4. **Avoid deep nesting** - Maximum 3-4 levels deep
5. **Use path aliases** - Avoid relative imports
6. **Organize by feature** - Not by component type
7. **Keep services separate** - API and data access logic separate from UI
8. **Centralize shared code** - Reusable components, hooks, types, utilities

## Migration Guide

If moving from a different structure:

1. Create new directory structure
2. Move files to appropriate locations
3. Update imports to use path aliases
4. Update exports in `index.ts` files
5. Test that everything still works
6. Remove old directories
