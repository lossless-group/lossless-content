---
date_created: 2025-07-20
date_modified: 2025-08-09
tags: [Module-Federation, Microservices, Microfrontends]
site_uuid: 347190b6-2acc-457c-807d-f3309cf05be7
publish: true
title: Micro Federation Blueprint
slug: micro-federation-blueprint
at_semantic_version: 0.0.0.1
authors:
  - Tanuj Siripurapu
augmented_with: Cursor on ChatGPT 4o
---
# Micro-Federation Architecture Blueprint
## Module Federation with Vite, React, and Turborepo

This document provides a comprehensive blueprint explaining how this micro-federation setup works, covering the architecture, configuration, and implementation details.

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Module Federation Configuration](#module-federation-configuration)
5. [Turborepo Integration](#turborepo-integration)
6. [Development Workflow](#development-workflow)
7. [Build Process](#build-process)
8. [Runtime Federation](#runtime-federation)
9. [Error Handling & Fallbacks](#error-handling--fallbacks)
10. [Shared Dependencies](#shared-dependencies)
11. [Best Practices](#best-practices)

## Architecture Overview

This project implements a **micro-frontend architecture** using **Module Federation** with the following key components:

- **Host Application**: Main application that consumes federated components
- **Micro-Frontends**: Independent applications that expose components
- **Shared UI Package**: Common components used across all applications
- **Turborepo**: Monorepo orchestration and build optimization

### Core Concepts

1. **Module Federation**: Allows multiple applications to share code at runtime
2. **Remote Components**: Components loaded from external applications
3. **Shared Dependencies**: Common libraries shared across applications
4. **Lazy Loading**: Components loaded on-demand with fallbacks

## Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Vite** | Build tool and dev server | 6.3.3 |
| **React** | UI framework | 19.1.0 |
| **TypeScript** | Type safety | 5.8.3 |
| **Turborepo** | Monorepo orchestration | 2.0.0 |
| **vite-plugin-federation** | Module federation for Vite | 1.4.1 |
| **npm Workspaces** | Package management | 10.0.0 |

## Project Structure

```
module-federation-vite/
├── apps/
│   ├── host/                 # Main host application (port 3000)
│   │   ├── src/
│   │   │   ├── App.tsx      # Consumes federated components
│   │   │   └── main.tsx     # Application entry point
│   │   └── vite.config.ts   # Federation consumer config
│   ├── micro-frontend-1/    # Card A component (port 4173)
│   │   ├── src/components/
│   │   │   └── CardA.tsx    # Exposed component
│   │   └── vite.config.ts   # Federation provider config
│   └── micro-frontend-2/    # Card B component (port 4174)
│       ├── src/components/
│       │   └── CardB.tsx    # Exposed component
│       └── vite.config.ts   # Federation provider config
├── packages/
│   └── ui/                  # Shared UI components
│       ├── src/
│       │   ├── Button.tsx   # Shared button component
│       │   └── index.ts     # Package exports
│       └── vite.config.ts   # Library build config
├── package.json             # Root workspace configuration
├── turbo.json              # Turborepo pipeline configuration
└── tsconfig.json           # Root TypeScript configuration
```

## Module Federation Configuration

### Host Application Configuration

The host application is configured as a **consumer** of federated modules:

```typescript
// apps/host/vite.config.ts
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        cardA: 'http://localhost:4173/assets/remoteEntry.js',
        cardB: 'http://localhost:4174/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  // ... other config
})
```

**Key Configuration Points:**
- `name`: Unique identifier for the host application
- `remotes`: URLs to remote entry points from micro-frontends
- `shared`: Dependencies shared across all applications

### Micro-Frontend Configuration

Micro-frontends are configured as **providers** of federated modules:

```typescript
// apps/micro-frontend-1/vite.config.ts
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'cardA',
      exposes: {
        './Card': './src/components/CardA.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  // ... other config
})
```

**Key Configuration Points:**
- `name`: Unique identifier for the micro-frontend
- `exposes`: Components exposed for consumption by other applications
- `shared`: Dependencies shared with consuming applications

### Build Configuration

All applications use specific build settings for Module Federation:

```typescript
build: {
  modulePreload: false,    // Disabled for federation compatibility
  target: 'esnext',        // Modern JavaScript target
  minify: false,           // Disabled for debugging
  cssCodeSplit: false,     // Single CSS file for federation
}
```

## Turborepo Integration

### Pipeline Configuration

Turborepo orchestrates the build and development processes:

```json
// turbo.json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],  // Build dependencies first
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,           // No caching for dev servers
      "persistent": true        // Keep servers running
    },
    "lint": {
      "dependsOn": ["^lint"]    // Lint dependencies first
    }
  }
}
```

### Workspace Scripts

Root package.json defines workspace-wide commands:

```json
{
  "scripts": {
    "dev": "turbo run dev",           // Start all dev servers
    "build": "turbo run build",       // Build all applications
    "lint": "turbo run lint",         // Lint all packages
    "typecheck": "turbo run typecheck" // Type check all packages
  }
}
```

## Development Workflow

### 1. Starting Development Servers

```bash
# Start all applications in parallel
npm run dev

# This runs: turbo run dev
# Which starts:
# - Host app on port 3000
# - Micro-frontend-1 on port 4173
# - Micro-frontend-2 on port 4174
```

### 2. Individual Application Development

```bash
# Start specific applications
npm run dev --filter=@module-federation-vite/host
npm run dev --filter=@module-federation-vite/card-a
npm run dev --filter=@module-federation-vite/card-b
```

### 3. Development Server Features

- **Hot Module Replacement (HMR)**: Changes reflect immediately
- **Cross-Origin Resource Sharing**: Configured for local development
- **File System Access**: Allows serving files from parent directories

## Build Process

### 1. Development Build

```bash
# Build all applications
npm run build

# Build specific applications
npm run build --filter=@module-federation-vite/host
```

### 2. Build Output Structure

```
dist/
├── assets/
│   ├── remoteEntry.js     # Federation entry point
│   ├── index-[hash].js    # Main application bundle
│   └── index-[hash].css   # Styles
└── index.html             # HTML entry point
```

### 3. Federation Entry Points

Each application generates a `remoteEntry.js` file that:
- Exposes the federated modules
- Manages shared dependencies
- Handles module loading and caching

## Runtime Federation

### 1. Component Loading

The host application loads federated components using React.lazy:

```typescript
// apps/host/src/App.tsx
const CardA = React.lazy(() => import('cardA/Card'))
const CardB = React.lazy(() => import('cardB/Card'))
```

### 2. Suspense Integration

Components are wrapped in Suspense for loading states:

```typescript
<Suspense fallback={<div>Loading Card A...</div>}>
  <CardA />
</Suspense>
```

### 3. Error Handling

Fallback components are provided for when remotes are unavailable:

```typescript
const CardA = React.lazy(() => import('cardA/Card').catch(() => {
  return Promise.resolve({
    default: () => <FallbackComponent />
  })
}))
```

## Error Handling & Fallbacks

### 1. Network Failures

- **Remote Unavailable**: Fallback components display
- **Loading Timeouts**: Suspense fallbacks show
- **Module Errors**: Error boundaries catch and handle

### 2. Development vs Production

- **Development**: Detailed error messages and fallbacks
- **Production**: Graceful degradation with user-friendly messages

### 3. Fallback Strategy

```typescript
// Graceful degradation pattern
const FederatedComponent = React.lazy(() => 
  import('remote/Component')
    .catch(() => import('./FallbackComponent'))
)
```

## Shared Dependencies

### 1. Dependency Sharing

```typescript
// All applications share React and React-DOM
shared: ['react', 'react-dom']
```

### 2. Version Consistency

- All applications use the same React version
- Prevents multiple React instances
- Ensures consistent behavior

### 3. Shared UI Package

```typescript
// packages/ui/src/index.ts
export { Button } from './Button'
```

Used across all applications:
```typescript
import { Button } from '@module-federation-vite/ui'
```

## Best Practices

### 1. Configuration

- **Unique Names**: Each application has a unique federation name
- **Consistent Ports**: Fixed ports for predictable URLs
- **Shared Dependencies**: Explicitly declare shared libraries

### 2. Development

- **Parallel Development**: Use `npm run dev` for all applications
- **Hot Reloading**: Leverage Vite's HMR for fast development
- **Error Boundaries**: Implement proper error handling

### 3. Production

- **Build Optimization**: Use production builds for testing
- **CDN Deployment**: Serve remote entry points from CDN
- **Health Checks**: Monitor remote availability

### 4. Architecture

- **Loose Coupling**: Micro-frontends are independent
- **Clear Contracts**: Well-defined component interfaces
- **Shared Standards**: Consistent coding standards across teams

## Troubleshooting

### Common Issues

1. **Remote Not Loading**
   - Check if micro-frontend servers are running
   - Verify port numbers in configuration
   - Check network connectivity

2. **Shared Dependency Conflicts**
   - Ensure all applications use same dependency versions
   - Check for multiple React instances
   - Verify federation configuration

3. **Build Failures**
   - Clear node_modules and reinstall
   - Check TypeScript configuration
   - Verify import paths

### Debugging Tips

1. **Browser DevTools**: Check Network tab for remote loading
2. **Console Logs**: Monitor federation-related messages
3. **Build Outputs**: Inspect generated remoteEntry.js files

## Conclusion

This micro-federation architecture provides:

- **Scalability**: Independent development and deployment
- **Maintainability**: Clear separation of concerns
- **Performance**: Lazy loading and code splitting
- **Developer Experience**: Fast development with HMR
- **Reliability**: Graceful error handling and fallbacks

The combination of Vite, React, and Turborepo creates a powerful foundation for building and managing micro-frontend applications with excellent developer experience and production readiness. 