# Development Guide

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm 10+
- Git

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd wrti-wildlife-park

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Open browser
# Visit http://localhost:3000
```

## Development Workflow

### 1. Create a Feature Branch

```bash
# Create feature branch from main
git checkout -b feat/tree-discovery

# Or for bug fixes
git checkout -b fix/map-zoom-issue

# Or for documentation
git checkout -b docs/api-guide
```

### 2. Make Changes

```bash
# Edit files in your editor
# Changes are automatically reflected in dev server (HMR)
```

### 3. Run Tests

```bash
# Run all tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test:coverage

# Run E2E tests
pnpm run test:e2e
```

### 4. Check Code Quality

```bash
# Type checking
pnpm run check

# Linting
pnpm run lint

# Format code
pnpm run format
```

### 5. Commit Changes

```bash
# Stage changes
git add .

# Commit with conventional commit message
git commit -m "feat: Add tree discovery feature"

# Husky will automatically run pre-commit hooks
# (linting, formatting, type checking)
```

### 6. Push and Create Pull Request

```bash
# Push to remote
git push origin feat/tree-discovery

# Create pull request on GitHub
```

## Coding Conventions

### TypeScript

**Strict Mode**
- All files must be valid TypeScript
- No `any` types
- Explicit return types for functions

```typescript
// ❌ Avoid
function getData(id) {
  return fetch(`/api/data/${id}`).then(r => r.json());
}

// ✅ Good
async function getData(id: string): Promise<Tree> {
  const response = await fetch(`/api/data/${id}`);
  return response.json();
}
```

**Type Organization**
- Shared types in `src/types/`
- Feature-specific types in `features/*/types/`
- Import types with `import type`

```typescript
import type { Tree, Park } from '@/types';
import type { MapMarker } from '@features/map/types';
```

### React Components

**Functional Components Only**
```typescript
// ✅ Good
export const TreeCard = ({ tree }: Props) => {
  return <div>{tree.name}</div>;
};

// ❌ Avoid class components
class TreeCard extends React.Component { ... }
```

**Naming Conventions**
- Component files: `PascalCase` (e.g., `TreeCard.tsx`)
- Component exports: `PascalCase`
- Props interfaces: `${ComponentName}Props`

```typescript
interface TreeCardProps {
  tree: Tree;
  onSelect?: (id: string) => void;
}

export const TreeCard = ({ tree, onSelect }: TreeCardProps) => {
  // ...
};
```

**Props Organization**
- Group related props
- Use destructuring
- Provide default values

```typescript
interface MapProps {
  // Viewport
  center: Coordinates;
  zoom: number;
  
  // Interactions
  onCenterChange?: (center: Coordinates) => void;
  onZoomChange?: (zoom: number) => void;
  
  // Styling
  className?: string;
}
```

### Custom Hooks

**Naming Convention**: `use${Feature}${Functionality}`

```typescript
// ✅ Good
export const useTreeData = (treeId: string) => { ... };
export const useMapInteractions = () => { ... };
export const useDiscoveryFilters = () => { ... };

// ❌ Avoid
export const getTreeData = () => { ... };
export const treeDataHook = () => { ... };
```

**Hook Organization**
- Keep hooks focused and single-purpose
- Extract complex logic into hooks
- Use hooks for state management

```typescript
// ✅ Good - focused hook
export const useTreeData = (treeId: string) => {
  return useQuery({
    queryKey: ['tree', treeId],
    queryFn: () => treeRepository.getTree(treeId),
  });
};

// ❌ Avoid - too much logic
export const useEverything = () => {
  // 200 lines of code...
};
```

### File Organization

**One Component Per File**
```
features/trees/
├── components/
│   ├── TreeCard.tsx
│   ├── TreeList.tsx
│   └── TreeDetail.tsx
├── hooks/
│   ├── useTreeData.ts
│   └── useTreeFilters.ts
├── types/
│   └── index.ts
└── index.ts
```

**Related Files Together**
```
features/trees/
├── TreeCard.tsx
├── TreeCard.test.tsx
├── useTreeCard.ts
└── types.ts
```

### Naming Files

- Component files: `PascalCase` (e.g., `TreeCard.tsx`)
- Hook files: `camelCase` (e.g., `useTreeData.ts`)
- Type files: `camelCase` (e.g., `types.ts`)
- Test files: `${filename}.test.ts` (e.g., `TreeCard.test.tsx`)
- Store files: `camelCase` with `Store` suffix (e.g., `mapStore.ts`)

## Working with Features

### Creating a New Feature

1. **Create directory structure**
```bash
mkdir -p client/src/features/my-feature/{components,hooks,services,state,types,utils,tests}
touch client/src/features/my-feature/index.ts
```

2. **Define types**
```typescript
// features/my-feature/types/index.ts
export interface MyFeatureData {
  id: string;
  name: string;
}
```

3. **Create components**
```typescript
// features/my-feature/components/MyFeatureCard.tsx
import type { MyFeatureData } from '../types';

interface MyFeatureCardProps {
  data: MyFeatureData;
}

export const MyFeatureCard = ({ data }: MyFeatureCardProps) => {
  return <div>{data.name}</div>;
};
```

4. **Create hooks**
```typescript
// features/my-feature/hooks/useMyFeatureData.ts
export const useMyFeatureData = () => {
  return useQuery({
    queryKey: ['my-feature'],
    queryFn: () => myFeatureRepository.getData(),
  });
};
```

5. **Create store (if needed)**
```typescript
// features/my-feature/state/index.ts
import { create } from 'zustand';

export const useMyFeatureStore = create((set) => ({
  // state and actions
}));
```

6. **Export public API**
```typescript
// features/my-feature/index.ts
export * from './components';
export * from './hooks';
export * from './types';
export { useMyFeatureStore } from './state';
```

## Working with State

### Using Zustand Stores

```typescript
// In component
import { useMapStore } from '@/stores';

export const MapComponent = () => {
  const { viewState, setCenter } = useMapStore();
  
  return (
    <button onClick={() => setCenter({ lat: 0, lng: 0 })}>
      Reset Map
    </button>
  );
};
```

### Using TanStack Query

```typescript
// In component
import { useQuery } from '@tanstack/react-query';
import { treeRepository } from '@/services/repositories';

export const TreeList = () => {
  const { data: trees, isLoading, error } = useQuery({
    queryKey: ['trees'],
    queryFn: () => treeRepository.getTrees(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {trees?.map(tree => (
        <li key={tree.id}>{tree.name}</li>
      ))}
    </ul>
  );
};
```

### Combining Stores and Queries

```typescript
export const TreeDetail = ({ treeId }: Props) => {
  // Server state
  const { data: tree } = useQuery({
    queryKey: ['tree', treeId],
    queryFn: () => treeRepository.getTree(treeId),
  });

  // Global state
  const { selectedTreeId, setSelectedTreeId } = useMapStore();

  return (
    <div>
      {tree?.name}
      <button onClick={() => setSelectedTreeId(treeId)}>
        Select on Map
      </button>
    </div>
  );
};
```

## Testing

### Unit Tests

```typescript
// features/trees/hooks/useTreeData.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useTreeData } from './useTreeData';

describe('useTreeData', () => {
  it('should fetch tree data', async () => {
    const { result } = renderHook(() => useTreeData('123'));

    await waitFor(() => {
      expect(result.current.tree).toBeDefined();
    });
  });
});
```

### Component Tests

```typescript
// features/trees/components/TreeCard.test.tsx
import { render, screen } from '@testing-library/react';
import { TreeCard } from './TreeCard';

describe('TreeCard', () => {
  it('should render tree name', () => {
    const tree = { id: '1', name: 'Oak Tree' };
    render(<TreeCard tree={tree} />);
    
    expect(screen.getByText('Oak Tree')).toBeInTheDocument();
  });
});
```

## Debugging

### Browser DevTools

1. Open Chrome DevTools (F12)
2. Use React DevTools extension
3. Use Redux DevTools for Zustand (with devtools middleware)

### VS Code Debugging

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/client/src"
    }
  ]
}
```

### Console Logging

```typescript
// Use console methods for debugging
console.log('Value:', value);
console.error('Error:', error);
console.warn('Warning:', warning);
console.table(data); // For arrays/objects
```

## Performance Tips

### 1. Memoize Expensive Computations

```typescript
const expensiveValue = useMemo(() => {
  return complexCalculation(data);
}, [data]);
```

### 2. Memoize Callbacks

```typescript
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### 3. Use React.memo for Components

```typescript
export const TreeCard = React.memo(({ tree }: Props) => {
  return <div>{tree.name}</div>;
});
```

### 4. Lazy Load Routes

```typescript
const TreeDetail = lazy(() => import('@pages/TreeDetail'));

const routes = [
  { path: '/trees/:id', element: <TreeDetail /> },
];
```

### 5. Optimize Queries

```typescript
// Set appropriate stale time
useQuery({
  queryKey: ['trees'],
  queryFn: getTrees,
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

## Common Tasks

### Adding a New API Endpoint

1. **Create repository method**
```typescript
// services/repositories/tree.repository.ts
export class TreeRepository extends BaseRepository {
  async getTreesBySpecies(speciesId: string): Promise<Tree[]> {
    const response = await this.client.get(`/trees?species=${speciesId}`);
    return response.map(mapToTree);
  }
}
```

2. **Create custom hook**
```typescript
// features/trees/hooks/useTreesBySpecies.ts
export const useTreesBySpecies = (speciesId: string) => {
  return useQuery({
    queryKey: ['trees', 'species', speciesId],
    queryFn: () => treeRepository.getTreesBySpecies(speciesId),
  });
};
```

3. **Use in component**
```typescript
const { data: trees } = useTreesBySpecies('oak');
```

### Adding a New Store

1. **Create store file**
```typescript
// stores/my-feature.store.ts
export const useMyFeatureStore = create((set) => ({
  value: 'initial',
  setValue: (value: string) => set({ value }),
}));
```

2. **Export from stores/index.ts**
```typescript
export { useMyFeatureStore } from './my-feature.store';
```

3. **Use in component**
```typescript
const { value, setValue } = useMyFeatureStore();
```

## Troubleshooting

### HMR Not Working
- Check if dev server is running
- Clear `.vite` cache
- Restart dev server

### TypeScript Errors
- Run `pnpm run check`
- Check for circular dependencies
- Verify imports are correct

### Tests Failing
- Check test setup in `client/src/tests/setup.ts`
- Verify mocks are configured correctly
- Check for timing issues (use `waitFor`)

### Build Failing
- Check for TypeScript errors: `pnpm run check`
- Check for linting errors: `pnpm run lint`
- Clear `node_modules` and reinstall: `pnpm install`

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Router Documentation](https://reactrouter.com)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
