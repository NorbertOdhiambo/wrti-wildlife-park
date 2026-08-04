# Architecture Guide

## Overview

The WRTI Wildlife Park application is built with a **feature-based, modular architecture** that prioritizes scalability, maintainability, and strict type safety. This document explains the architectural decisions and patterns used throughout the application.

## Core Architectural Principles

### 1. Feature-Based Organization

**Rationale**: Organizing by features (not by component type) keeps related code together and makes it easier to understand, test, and maintain each feature independently.

**Structure**:
```
features/
├── map/
│   ├── components/      # Map-specific UI components
│   ├── hooks/          # Map-specific custom hooks
│   ├── services/       # Map-specific business logic
│   ├── state/          # Map-specific Zustand stores
│   ├── types/          # Map-specific types
│   ├── utils/          # Map-specific utilities
│   ├── tests/          # Map-specific tests
│   └── index.ts        # Public API
├── trees/
├── navigation/
├── search/
├── discovery/
├── offline/
├── settings/
└── help/
```

**Benefits**:
- Easy to find related code
- Simple to add/remove features
- Clear feature boundaries
- Easier code splitting and lazy loading
- Reduced prop drilling within features

### 2. Separation of Concerns

**Rationale**: Clear separation between UI, business logic, state management, and data access makes code more testable and maintainable.

**Layers**:

```
┌─────────────────────────────────┐
│   UI Components (React)         │  Presentation layer
├─────────────────────────────────┤
│   Custom Hooks                  │  Logic composition layer
├─────────────────────────────────┤
│   Services (Business Logic)     │  Domain logic layer
├─────────────────────────────────┤
│   Repositories (Data Access)    │  Data transformation layer
├─────────────────────────────────┤
│   API Client (HTTP)             │  Network layer
├─────────────────────────────────┤
│   Backend API                   │  External service
└─────────────────────────────────┘
```

**Rules**:
- UI components should not call HTTP endpoints directly
- Services should not know about React or UI
- Repositories should transform API responses to domain models
- Each layer should only depend on layers below it

### 3. State Management Strategy

**Three-Tier State Management**:

#### Global State (Zustand)
Used for **UI state** and **application-wide concerns**:
- Theme, modals, notifications
- Map viewport and interactions
- User preferences and settings
- Offline status and pending operations

**Why Zustand**:
- Minimal boilerplate
- No provider hell
- Excellent TypeScript support
- Easy to persist to localStorage
- Middleware support (devtools, persist)

#### Server State (TanStack Query)
Used for **server data**:
- Trees, parks, routes, species
- Automatic caching and invalidation
- Background refetching
- Optimistic updates
- Pagination and infinite queries

**Why TanStack Query**:
- Separates server and client state
- Handles synchronization automatically
- Built-in caching strategies
- Excellent for offline support

#### Local State (React)
Used for **component-specific state**:
- Form inputs
- Temporary UI state
- Animation state
- Component-specific toggles

**Why React State**:
- Simplest for component-scoped state
- No external dependencies
- Familiar to all React developers

### 4. Type Safety

**Rationale**: Strict TypeScript enables catching errors at compile-time, improving developer experience and reducing runtime bugs.

**Practices**:
- Strict mode enabled in `tsconfig.json`
- No `any` types allowed
- Explicit return types for functions
- Reusable shared types in `src/types/`
- Domain-specific types in feature modules

**Type Organization**:
```typescript
// src/types/index.ts - Shared types
export interface Tree { ... }
export interface Park { ... }

// features/map/types/index.ts - Feature-specific types
export interface MapMarker { ... }
export interface MapCluster { ... }
```

### 5. API Architecture

**Rationale**: Abstracting HTTP communication behind a service layer makes it easy to swap implementations, add middleware, and test components.

**Flow**:
```
Component
    ↓
useQuery/useMutation (TanStack Query)
    ↓
Repository (Data transformation)
    ↓
API Client (HTTP)
    ↓
Backend API
```

**Example**:
```typescript
// Component
const { data: trees } = useTreesQuery();

// Hook (in feature/trees/hooks)
export const useTreesQuery = () => {
  return useQuery({
    queryKey: ['trees'],
    queryFn: () => treeRepository.getTrees(),
  });
};

// Repository
class TreeRepository extends BaseRepository {
  async getTrees(): Promise<Tree[]> {
    const response = await this.client.get('/trees');
    return response.map(mapToTree);
  }
}

// API Client
async get<T>(url: string): Promise<T> {
  return fetch(url).then(r => r.json());
}
```

**Benefits**:
- Backend is replaceable without changing UI
- Easy to add caching, retry logic, error handling
- Simple to test (mock at repository layer)
- Clear data flow

## Architectural Patterns

### 1. Custom Hooks for Logic Reuse

**Pattern**: Extract component logic into custom hooks for reuse and testing.

```typescript
// features/trees/hooks/useTreeData.ts
export const useTreeData = (treeId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tree', treeId],
    queryFn: () => treeRepository.getTree(treeId),
  });

  return { tree: data, isLoading, error };
};

// Component
export const TreeDetail = ({ treeId }: Props) => {
  const { tree, isLoading, error } = useTreeData(treeId);
  // ...
};
```

### 2. Barrel Exports for Clean Imports

**Pattern**: Use `index.ts` files to export public APIs from modules.

```typescript
// features/trees/index.ts
export * from './components';
export * from './hooks';
export * from './types';
export * from './services';

// Usage
import { TreeCard, useTreeData, type Tree } from '@features/trees';
```

### 3. Composition Over Inheritance

**Pattern**: Use composition to build complex components from simpler ones.

```typescript
// ❌ Avoid inheritance
class BaseCard extends React.Component { ... }
class TreeCard extends BaseCard { ... }

// ✅ Use composition
const TreeCard = ({ tree }: Props) => (
  <Card>
    <CardHeader>{tree.name}</CardHeader>
    <CardContent>{tree.description}</CardContent>
  </Card>
);
```

### 4. Dependency Injection

**Pattern**: Pass dependencies as arguments or props rather than importing directly.

```typescript
// ✅ Good - dependencies are injected
class TreeRepository {
  constructor(private client: ApiClient) {}
  
  async getTrees() {
    return this.client.get('/trees');
  }
}

// ❌ Avoid - tight coupling
class TreeRepository {
  async getTrees() {
    return apiClient.get('/trees'); // Hard to test
  }
}
```

## Data Flow

### Reading Data

```
1. Component mounts
2. useQuery hook runs
3. TanStack Query checks cache
4. If not cached, calls queryFn
5. queryFn calls repository method
6. Repository calls API client
7. API client makes HTTP request
8. Response is transformed and cached
9. Component re-renders with data
```

### Updating Data

```
1. User interacts with component
2. useMutation hook is called
3. Optimistic update (optional)
4. API request is sent
5. On success: cache is invalidated
6. Related queries are refetched
7. Component updates with new data
```

### Offline Updates

```
1. User performs action while offline
2. Operation is added to pendingOperations queue
3. UI updates optimistically
4. When online, operations are synced
5. Server responses are processed
6. Cache is updated
```

## Error Handling

**Centralized Error Handling**:

```typescript
// API Client handles HTTP errors
try {
  const response = await fetch(url);
  if (!response.ok) throw new ApiClientError(...);
} catch (error) {
  // Retry logic
  // Error transformation
}

// Repository handles data transformation errors
try {
  const data = await client.get('/trees');
  return data.map(mapToTree); // Throws if mapping fails
} catch (error) {
  throw new DataTransformationError(...);
}

// Component displays errors
const { data, error } = useQuery(...);
if (error) return <ErrorBoundary error={error} />;
```

## Performance Optimizations

### 1. Code Splitting

Features are organized to enable automatic code splitting:
```typescript
// Each feature can be lazy-loaded
const MapFeature = lazy(() => import('@features/map'));
const DiscoveryFeature = lazy(() => import('@features/discovery'));
```

### 2. Memoization

```typescript
// Memoize expensive computations
const memoizedTrees = useMemo(() => {
  return trees.filter(t => t.conservationStatus === 'endangered');
}, [trees]);

// Memoize callbacks
const handleTreeClick = useCallback((treeId: string) => {
  setSelectedTreeId(treeId);
}, []);
```

### 3. Lazy Loading

```typescript
// Lazy load routes
const routes = [
  { path: '/', element: <MapPage /> },
  { path: '/discovery', element: lazy(() => import('@pages/DiscoveryPage')) },
];
```

### 4. Query Optimization

```typescript
// Stale time prevents unnecessary refetches
useQuery({
  queryKey: ['trees'],
  queryFn: getTrees,
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

## Testing Strategy

### Unit Tests (Vitest)
- Test utilities and helper functions
- Test store logic
- Test API client behavior

### Component Tests (React Testing Library)
- Test component rendering
- Test user interactions
- Test hooks behavior

### E2E Tests (Playwright)
- Test complete user flows
- Test integration between features
- Test offline functionality

## Scalability Considerations

### Adding a New Feature

1. Create feature directory: `features/new-feature/`
2. Create subdirectories: `components/`, `hooks/`, `services/`, `state/`, `types/`, `tests/`
3. Implement feature in isolation
4. Export public API via `index.ts`
5. Integrate into application

### Adding a New Store

1. Create store file: `stores/new-feature.store.ts`
2. Define state interface and store
3. Export from `stores/index.ts`
4. Use in components via hook

### Adding a New API Endpoint

1. Create repository method: `repositories/new-repository.ts`
2. Create custom hook: `features/*/hooks/useNewData.ts`
3. Use hook in component: `useNewData()`

## Future Considerations

### Mobile App Reuse
- Feature modules can be shared with React Native
- Separate UI components from business logic
- Use shared types and services

### Multiple Parks
- Park context/store for current park
- Query parameters for park filtering
- Offline data per park

### Research Mode
- Feature flag in settings store
- Additional UI components and routes
- Extended data models

### Audio Guides
- Separate audio service
- Integration with tree details
- Offline caching of audio files

## Conclusion

This architecture provides a solid foundation for building a scalable, maintainable React application. The key principles are:

1. **Feature-based organization** for clarity and scalability
2. **Separation of concerns** for testability and maintainability
3. **Three-tier state management** for flexibility
4. **Strict type safety** for reliability
5. **Clear data flow** for predictability

These principles should guide all future development decisions.
