# WRTI Wildlife Park - React Web Application

A production-ready React web application for discovering, learning about, and navigating to trees within a wildlife park. This is a **map-first** experience with offline support, discovery journaling, and conservation features.

## 🎯 Project Overview

**Phase 1 Focus**: Engineering Foundation & Architecture Setup

This phase establishes a robust, scalable engineering foundation for the WRTI Wildlife Park application. It is **not** about implementing features, but rather creating the architectural infrastructure that future phases will build upon.

### Core Principles

- **Map-First Design**: The map is the primary experience; everything else supports discovery, navigation, learning, and conservation
- **Scalability**: Architecture supports future growth (multiple parks, offline mode, research features, mobile app reuse)
- **Maintainability**: Clear separation of concerns, modular architecture, strict typing
- **Performance**: Optimized for fast load times, smooth interactions, and offline functionality
- **Developer Experience**: Easy for multiple developers to maintain and extend

## 📋 Technology Stack

### Core
- **React 19** - UI framework
- **TypeScript** - Strict type safety
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing

### State Management
- **Zustand** - Global state (UI, Map, Discovery, Settings, Offline)
- **TanStack Query** - Server state (caching, synchronization)
- **React Hook Form** - Form state
- **Zod** - Schema validation

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS
- **shadcn/ui** - Reusable component library
- **Framer Motion** - Animations

### Mapping (Future)
- **Mapbox GL JS** - Interactive maps

### Development & Quality
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting
- **Vitest** - Unit testing
- **React Testing Library** - Component testing
- **Playwright** - E2E testing

## 📁 Project Structure

```
wrti-wildlife-park/
├── client/
│   ├── public/                 # Static assets (favicon, robots.txt only)
│   ├── src/
│   │   ├── app/               # App entry point (main.tsx)
│   │   ├── components/        # Reusable UI components & shadcn/ui
│   │   ├── config/            # Configuration files
│   │   ├── constants/         # Application constants
│   │   ├── contexts/          # React contexts
│   │   ├── features/          # Feature modules
│   │   │   ├── map/           # Map feature
│   │   │   ├── trees/         # Trees feature
│   │   │   ├── navigation/    # Navigation feature
│   │   │   ├── search/        # Search feature
│   │   │   ├── discovery/     # Discovery journal feature
│   │   │   ├── offline/       # Offline functionality
│   │   │   ├── settings/      # Settings feature
│   │   │   └── help/          # Help & documentation
│   │   ├── hooks/             # Custom React hooks
│   │   ├── layouts/           # Layout components
│   │   ├── lib/               # Utility libraries
│   │   ├── pages/             # Page components
│   │   ├── providers/         # React providers (Query, Theme, etc.)
│   │   ├── routes/            # Route configuration
│   │   ├── services/          # API & data services
│   │   │   ├── api/           # HTTP client
│   │   │   └── repositories/  # Data access layer
│   │   ├── stores/            # Zustand stores
│   │   ├── styles/            # Global styles
│   │   ├── types/             # TypeScript type definitions
│   │   ├── utils/             # Utility functions
│   │   ├── tests/             # Test configuration
│   │   ├── App.tsx            # Root component
│   │   ├── main.tsx           # Entry point
│   │   ├── index.css          # Global styles & Tailwind
│   │   └── vite-env.d.ts      # Vite environment types
│   └── index.html             # HTML template
├── server/                     # Backend placeholder
├── shared/                     # Shared types & constants
├── .eslintrc.js               # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── .editorconfig              # Editor configuration
├── eslint.config.js           # ESLint config (new format)
├── vitest.config.ts           # Vitest configuration
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🏗️ Architecture

### Feature-Based Organization

Each feature module owns its own:
- **Components** - Feature-specific UI components
- **Hooks** - Feature-specific custom hooks
- **Services** - Feature-specific business logic
- **State** - Feature-specific Zustand stores
- **Types** - Feature-specific type definitions
- **Utils** - Feature-specific utilities
- **Tests** - Feature-specific tests

### Separation of Concerns

```
UI Components
    ↓
Custom Hooks
    ↓
Services (Business Logic)
    ↓
Repositories (Data Access)
    ↓
API Client (HTTP)
```

### State Management Strategy

**Global State (Zustand)**:
- `uiStore` - Theme, modals, notifications, sidebar state
- `mapStore` - Map viewport, selected items, layers, interactions
- `discoveryStore` - User discoveries, filters
- `settingsStore` - User preferences, accessibility
- `offlineStore` - Online/offline status, pending operations

**Server State (TanStack Query)**:
- Trees, Parks, Routes, Species
- Automatic caching, invalidation, and synchronization

**Local State (React)**:
- Form inputs, temporary UI state, component-specific state

### API Architecture

```
Component
    ↓
Custom Hook (useQuery/useMutation)
    ↓
Repository (Data transformation)
    ↓
API Client (HTTP requests)
    ↓
Backend API
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm 10+

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

### Development Commands

```bash
# Type checking
pnpm run check

# Linting
pnpm run lint

# Format code
pnpm run format

# Run tests
pnpm run test

# Run tests with coverage
pnpm run test:coverage

# Run E2E tests
pnpm run test:e2e
```

## 📦 Key Stores

### UI Store (`useUiStore`)
Manages global UI state: theme, modals, notifications, sidebar visibility.

```typescript
import { useUiStore } from '@/stores';

const { theme, setTheme, openModal, closeModal } = useUiStore();
```

### Map Store (`useMapStore`)
Manages map state: viewport, selected items, visible layers, interactions.

```typescript
import { useMapStore } from '@/stores';

const { viewState, setCenter, selectedTreeId, setSelectedTreeId } = useMapStore();
```

### Discovery Store (`useDiscoveryStore`)
Manages user discoveries and discovery journal state.

```typescript
import { useDiscoveryStore } from '@/stores';

const { discoveries, addDiscovery, filterByTreeId } = useDiscoveryStore();
```

### Settings Store (`useSettingsStore`)
Manages user preferences and accessibility settings.

```typescript
import { useSettingsStore } from '@/stores';

const { preferences, setTheme, setFontSize } = useSettingsStore();
```

### Offline Store (`useOfflineStore`)
Manages offline functionality and pending operations.

```typescript
import { useOfflineStore } from '@/stores';

const { isOnline, offlineData, pendingOperations } = useOfflineStore();
```

## 🔌 API Client

The API client provides a centralized HTTP layer with error handling, retries, and type safety.

```typescript
import { getApiClient } from '@/services/api/client';

const client = getApiClient();

// GET request
const trees = await client.get<Tree[]>('/trees');

// POST request
const newTree = await client.post<Tree>('/trees', { name: 'Oak' });

// Error handling
try {
  await client.get('/trees/invalid-id');
} catch (error) {
  if (error instanceof ApiClientError) {
    console.error(error.apiError.message);
  }
}
```

## 🧪 Testing

### Unit Tests (Vitest)
```bash
pnpm run test
```

### Component Tests (React Testing Library)
```bash
pnpm run test:watch
```

### E2E Tests (Playwright)
```bash
pnpm run test:e2e
```

## 📝 Coding Standards

### TypeScript
- Strict mode enabled
- No `any` types
- Explicit return types for functions
- Reusable shared types in `src/types/`

### React
- Functional components only
- Custom hooks for logic reuse
- Minimal prop drilling (use context/stores)
- Memoization where appropriate

### Naming Conventions
- Components: `PascalCase` (e.g., `TreeCard.tsx`)
- Files: `kebab-case` or `camelCase` (e.g., `tree-card.tsx` or `useTreeData.ts`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `DEFAULT_ZOOM`)
- Stores: `camelCase` with `Store` suffix (e.g., `mapStore.ts`)
- Types: `PascalCase` (e.g., `Tree`, `TreeDetails`)

### File Organization
- One component per file
- Co-locate related files (component + hook + types)
- Index files for barrel exports (only when improving maintainability)

## 🔄 Git Workflow

### Conventional Commits
```
feat: Add tree discovery feature
fix: Resolve map zoom issue
docs: Update API documentation
refactor: Simplify state management
test: Add tests for tree repository
```

### Pre-commit Hooks
Husky automatically runs linting and formatting before commits.

## 🌍 Environment Variables

Create a `.env.local` file:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_MAPBOX_TOKEN=your_mapbox_token
VITE_ENABLE_OFFLINE_MODE=true
VITE_ENABLE_RESEARCH_MODE=false
VITE_ENABLE_AUDIO_GUIDES=false
```

## 📚 Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md) - Detailed architecture decisions
- [Development Guide](./docs/DEVELOPMENT.md) - Development workflow and conventions
- [Contributing Guide](./docs/CONTRIBUTING.md) - How to contribute
- [API Documentation](./docs/API.md) - API client and services

## 🎯 Next Phases

**Phase 2**: Map Feature Implementation
- Mapbox integration
- Map interactions (pan, zoom, click)
- Marker and cluster rendering
- Map controls

**Phase 3**: Feature Implementation
- Trees discovery
- Navigation and routing
- Search functionality
- Discovery journal

**Phase 4**: Advanced Features
- Offline functionality
- Audio guides
- Research mode
- Mobile app reuse

## 📄 License

MIT

## 👥 Contributing

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

## 📞 Support

For questions or issues, please open an issue on the project repository.
