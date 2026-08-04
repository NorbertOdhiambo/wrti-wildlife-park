# Contributing Guide

Thank you for your interest in contributing to the WRTI Wildlife Park application! This guide will help you understand our development process and how to contribute effectively.

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our Code of Conduct:

- Be respectful and inclusive
- Welcome different perspectives
- Focus on constructive feedback
- Report inappropriate behavior

## Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/your-username/wrti-wildlife-park.git
cd wrti-wildlife-park

# Add upstream remote
git remote add upstream https://github.com/original-repo/wrti-wildlife-park.git
```

### 2. Create a Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feat/your-feature-name
```

### 3. Make Changes

Follow the [Development Guide](./DEVELOPMENT.md) for coding conventions and setup instructions.

### 4. Test Your Changes

```bash
# Run tests
pnpm run test

# Run linting
pnpm run lint

# Check types
pnpm run check

# Build the project
pnpm run build
```

### 5. Commit Your Changes

Use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

```bash
# Feature
git commit -m "feat: Add tree discovery feature"

# Bug fix
git commit -m "fix: Resolve map zoom issue"

# Documentation
git commit -m "docs: Update API documentation"

# Refactoring
git commit -m "refactor: Simplify state management"

# Tests
git commit -m "test: Add tests for tree repository"

# Chore
git commit -m "chore: Update dependencies"
```

### 6. Push and Create Pull Request

```bash
# Push to your fork
git push origin feat/your-feature-name

# Create pull request on GitHub
# Fill out the PR template
# Request review from maintainers
```

## Pull Request Process

### PR Title Format

```
[Type] Brief description

Examples:
- [Feature] Add tree discovery feature
- [Fix] Resolve map zoom issue
- [Docs] Update API documentation
- [Refactor] Simplify state management
```

### PR Description Template

```markdown
## Description
Brief description of the changes.

## Type of Change
- [ ] Feature (new functionality)
- [ ] Bug fix (fixes an issue)
- [ ] Documentation (updates docs)
- [ ] Refactoring (no functional changes)
- [ ] Performance improvement

## Related Issues
Closes #123

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Unit tests added
- [ ] Component tests added
- [ ] E2E tests added
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally
```

### Review Process

1. **Automated Checks**
   - GitHub Actions runs tests
   - ESLint checks code quality
   - TypeScript checks for type errors

2. **Code Review**
   - At least one maintainer reviews
   - Feedback is provided constructively
   - Changes may be requested

3. **Approval and Merge**
   - PR is approved
   - All checks pass
   - Maintainer merges to main

## Contribution Types

### 1. Bug Fixes

**Process**:
1. Create issue describing the bug
2. Create branch: `fix/bug-description`
3. Fix the bug
4. Add test to prevent regression
5. Create PR with reference to issue

**Example**:
```bash
git checkout -b fix/map-zoom-not-working
# Fix the bug
git commit -m "fix: Resolve map zoom issue when zooming past bounds"
```

### 2. Features

**Process**:
1. Discuss feature in issue or discussion
2. Get approval from maintainers
3. Create branch: `feat/feature-name`
4. Implement feature following architecture
5. Add tests
6. Update documentation
7. Create PR

**Example**:
```bash
git checkout -b feat/tree-filtering
# Implement feature
git commit -m "feat: Add tree filtering by species and conservation status"
```

### 3. Documentation

**Process**:
1. Create branch: `docs/doc-name`
2. Update documentation
3. Create PR

**Example**:
```bash
git checkout -b docs/api-guide
# Update docs
git commit -m "docs: Add API client usage guide"
```

### 4. Refactoring

**Process**:
1. Ensure no functional changes
2. Create branch: `refactor/description`
3. Refactor code
4. Run all tests
5. Create PR

**Example**:
```bash
git checkout -b refactor/simplify-state-management
# Refactor code
git commit -m "refactor: Simplify state management with better store organization"
```

## Coding Standards

### TypeScript

- Use strict mode
- No `any` types
- Explicit return types
- Meaningful variable names

### React

- Functional components only
- Custom hooks for logic reuse
- Proper prop types
- Memoization where appropriate

### Testing

- Unit tests for utilities
- Component tests for UI
- E2E tests for flows
- Aim for >80% coverage

### Documentation

- JSDoc comments for functions
- README for features
- Type documentation
- Architecture decisions

## Review Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style guide
- [ ] TypeScript strict mode passes
- [ ] ESLint passes
- [ ] Prettier formatting applied
- [ ] Tests added/updated
- [ ] Tests pass locally
- [ ] No console errors/warnings
- [ ] Documentation updated
- [ ] Commit messages follow conventions
- [ ] PR description is clear
- [ ] Related issues are referenced

## Common Issues

### Merge Conflicts

```bash
# Update your branch with latest main
git fetch upstream
git rebase upstream/main

# Resolve conflicts in your editor
# Then continue rebase
git rebase --continue
```

### Need to Update PR

```bash
# Make changes
git add .
git commit -m "fix: Address review feedback"

# Push to update PR
git push origin feat/your-feature-name
```

### Accidentally Committed to Main

```bash
# Create new branch from current state
git branch feat/your-feature-name

# Reset main to upstream
git checkout main
git reset --hard upstream/main

# Switch to feature branch
git checkout feat/your-feature-name
```

## Questions?

- Check [Development Guide](./DEVELOPMENT.md)
- Check [Architecture Guide](./ARCHITECTURE.md)
- Open a discussion on GitHub
- Contact maintainers

## Recognition

Contributors will be recognized in:
- README contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to WRTI Wildlife Park! 🌳
