---
title: Module Federation with Docker Architecture
lede: A comprehensive specification for implementing a scalable, distributed architecture using Module Federation for microfrontends, Docker containers for microservices, and federated modules for shared components across the Augment-It platform.
date_authored_initial_draft: 2025-08-12
date_authored_current_draft: 2025-08-12
date_first_published: 
date_last_updated: 2025-08-12
at_semantic_version: 0.1.0
status: Draft
augmented_with: Warp Agent on Claude 3.5 Sonnet
category: Technical-Specification
date_created: 2025-08-12
date_modified: 2025-08-12
publish: true
slug: module-federation-with-docker
tags: [Architecture, Module-Federation, Docker, Microservices, Microfrontends, Kubernetes, DevOps]
authors:
  - Michael Staton
image_prompt: A sophisticated system architecture diagram showing containerized microservices, federated micro frontends, and distributed modules interconnected through API gateways, with Docker containers floating in a cloud-native environment.
---

# Module Federation with Docker Architecture

## 1. Executive Summary

The Module Federation with Docker Architecture provides a comprehensive solution for building scalable, maintainable, and independently deployable applications using Vite Module Federation for microfrontends and Docker containerization for microservices. This architecture enables teams to work independently on different parts of the Augment-It platform while maintaining seamless integration and shared component reusability.

The proposed solution combines:
- **Module Federation** for dynamic microfrontend composition
- **Docker containers** for microservice isolation and deployment
- **Shared federated modules** for common components and utilities
- **API Gateway** for unified service communication
- **Container orchestration** for production deployment

Benefits include improved development velocity, independent deployments, technology flexibility, and horizontal scaling capabilities.

## 2. Background & Motivation

### Problem Statement

The Augment-It platform faces several architectural challenges:

- **Monolithic Frontend Limitations**: Single-page applications become difficult to maintain as teams and features grow
- **Microservice Communication Complexity**: Multiple services (AI Model APIs, Data Store APIs, Integration APIs, AI-Powered Web Crawlers) need coordinated communication
- **Development Team Bottlenecks**: Teams are blocked by shared codebase dependencies
- **Deployment Coupling**: Changes in one area require full application rebuilds and deployments
- **Technology Lock-in**: Difficulty adopting new frontend frameworks or backend technologies
- **Scaling Challenges**: Cannot scale individual features based on usage patterns

### Why This Solution

- **Independent Development**: Teams can work on isolated modules with minimal coordination
- **Technology Flexibility**: Different teams can choose optimal technologies for their domains
- **Scalable Deployment**: Individual services and frontends can be scaled independently
- **Fault Isolation**: Issues in one module don't affect the entire application
- **Code Sharing**: Common components and utilities can be shared across modules
- **DevOps Efficiency**: Containerized deployment with orchestration support

## 3. Goals & Non-Goals

### Goals

1. **Enable Independent Development**: Allow teams to develop and deploy microfrontends and microservices independently
2. **Implement Scalable Architecture**: Support horizontal and vertical scaling of individual components
3. **Ensure Seamless Integration**: Provide smooth user experience despite distributed architecture
4. **Maintain Performance**: Achieve comparable or better performance than monolithic applications
5. **Support Shared Components**: Enable code reuse across different modules and teams
6. **Enable Technology Diversity**: Allow different technologies within the same application ecosystem
7. **Implement Production-Ready Operations**: Include monitoring, logging, and deployment automation

### Non-Goals

1. **Complete Application Rewrite**: Migrate existing functionality incrementally, not all at once
2. **Over-Engineering**: Avoid unnecessary complexity for simple, stable components
3. **Universal Module Federation**: Not every component needs to be federated
4. **Perfect Isolation**: Some shared dependencies and coordination will still be necessary

## 4. Technical Design

### High-Level Architecture

```mermaid
graph TB
    subgraph "Load Balancer / CDN"
        LB[Load Balancer]
    end
    
    subgraph "Shell Application (Host)"
        SHELL[Shell App Container]
        ROUTER[Module Router]
        AUTH[Authentication Module]
    end
    
    subgraph "Federated Microfrontends"
        MF1[Prompt Template Manager MF]
        MF2[Insight Assembler MF]
        MF3[Request Reviewer MF]
        MF4[Record Collector MF]
        MF5[Admin Dashboard MF]
    end
    
    subgraph "Shared Federated Modules"
        SFM1[UI Component Library]
        SFM2[Utility Functions]
        SFM3[API Client]
        SFM4[State Management]
    end
    
    subgraph "API Gateway Layer"
        GATEWAY[API Gateway]
        VALIDATOR[API Request Validator]
        CONNECTOR[API Connector Service]
    end
    
    subgraph "Microservices (Containerized)"
        MS1[User Authorization Service]
        MS2[YAML Parser Service]
        MS3[JSON Parser Service]
        MS4[Markdown Parser Service]
        MS5[Metrics Service]
    end
    
    subgraph "External APIs"
        subgraph "AI Model APIs"
            AI1[OpenAI API]
            AI2[Anthropic API]
            AI3[Groq API]
        end
        
        subgraph "Data Store APIs"
            DS1[NocoDB API]
            DS2[Airtable API]
            DS3[Databricks API]
        end
        
        subgraph "Integration APIs"
            INT1[Webhook Services]
            INT2[Notification APIs]
        end
        
        subgraph "AI Powered Web Crawlers"
            WC1[Intelligent Web Scraper]
            WC2[Content Extractor]
            WC3[Data Harvester]
        end
    end
    
    subgraph "Infrastructure"
        subgraph "Container Orchestration"
            K8S[Kubernetes Cluster]
            DOCKER[Docker Registry]
        end
        
        subgraph "Data Layer"
            CACHE[Redis Cache]
            DB[Database]
            STORAGE[Object Storage]
        end
        
        subgraph "Monitoring"
            METRICS[Metrics Collection]
            LOGS[Centralized Logging]
            ALERTS[Alert Manager]
        end
    end
    
    %% User Flow
    LB --> SHELL
    SHELL --> ROUTER
    ROUTER --> MF1
    ROUTER --> MF2
    ROUTER --> MF3
    ROUTER --> MF4
    ROUTER --> MF5
    
    %% Shared Module Usage
    MF1 --> SFM1
    MF1 --> SFM2
    MF1 --> SFM3
    MF2 --> SFM1
    MF2 --> SFM4
    MF3 --> SFM2
    MF3 --> SFM3
    
    %% API Communication
    SFM3 --> GATEWAY
    GATEWAY --> VALIDATOR
    VALIDATOR --> CONNECTOR
    CONNECTOR --> MS1
    CONNECTOR --> MS2
    CONNECTOR --> MS3
    
    %% External API Integration
    CONNECTOR --> AI1
    CONNECTOR --> AI2
    CONNECTOR --> DS1
    CONNECTOR --> DS2
    CONNECTOR --> INT1
    CONNECTOR --> WC1
    CONNECTOR --> WC2
    
    %% Infrastructure
    SHELL -.-> K8S
    MF1 -.-> K8S
    MF2 -.-> K8S
    MS1 -.-> K8S
    MS2 -.-> K8S
    GATEWAY -.-> K8S
    
    MS1 --> CACHE
    MS2 --> DB
    GATEWAY --> METRICS
    K8S --> LOGS
```

### Detailed Architecture Components

#### Module Federation Configuration

```mermaid
graph TD
    subgraph "Shell Application (Host)"
        HOST[Shell App]
        HOST_CONFIG[vite.config.ts]
    end
    
    subgraph "Remote Modules"
        REMOTE1[Prompt Template Manager]
        REMOTE2[Insight Assembler] 
        REMOTE3[Request Reviewer]
        REMOTE4[Record Collector]
    end
    
    subgraph "Shared Libraries"
        SHARED1[UI Components]
        SHARED2[Utilities]
        SHARED3[API Client]
    end
    
    HOST_CONFIG --> |"Consumes"| REMOTE1
    HOST_CONFIG --> |"Consumes"| REMOTE2
    HOST_CONFIG --> |"Consumes"| REMOTE3
    HOST_CONFIG --> |"Consumes"| REMOTE4
    
    REMOTE1 --> |"Uses"| SHARED1
    REMOTE1 --> |"Uses"| SHARED2
    REMOTE2 --> |"Uses"| SHARED1
    REMOTE2 --> |"Uses"| SHARED3
    REMOTE3 --> |"Uses"| SHARED2
    REMOTE3 --> |"Uses"| SHARED3
```

#### Container Architecture

```mermaid
graph TB
    subgraph "Development Environment"
        DEV_COMPOSE[docker-compose.yml]
        DEV_SHELL[Shell App Container]
        DEV_REMOTE1[Remote 1 Container]
        DEV_REMOTE2[Remote 2 Container]
        DEV_GATEWAY[Gateway Container]
        DEV_SERVICE1[Service 1 Container]
    end
    
    subgraph "Production Environment"
        PROD_K8S[Kubernetes Cluster]
        
        subgraph "Frontend Pods"
            PROD_SHELL[Shell Pod]
            PROD_REMOTE1[Remote 1 Pod]
            PROD_REMOTE2[Remote 2 Pod]
        end
        
        subgraph "Backend Pods"
            PROD_GATEWAY[Gateway Pod]
            PROD_SERVICE1[Service 1 Pod]
            PROD_SERVICE2[Service 2 Pod]
        end
        
        subgraph "Infrastructure Pods"
            PROD_INGRESS[Ingress Controller]
            PROD_REDIS[Redis Pod]
            PROD_DB[Database Pod]
        end
    end
    
    DEV_COMPOSE --> PROD_K8S
    DEV_SHELL --> PROD_SHELL
    DEV_REMOTE1 --> PROD_REMOTE1
    DEV_GATEWAY --> PROD_GATEWAY
    DEV_SERVICE1 --> PROD_SERVICE1
```

### Implementation Examples

#### Shell Application Vite Configuration

```typescript
// shell-app/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        promptManager: 'http://localhost:3001/assets/remoteEntry.js',
        insightAssembler: 'http://localhost:3002/assets/remoteEntry.js',
        requestReviewer: 'http://localhost:3003/assets/remoteEntry.js',
        recordCollector: 'http://localhost:3004/assets/remoteEntry.js',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        '@augment-it/ui-components': { singleton: true },
        '@augment-it/api-client': { singleton: true },
        '@augment-it/utils': { singleton: true },
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3000,
    cors: true,
  },
  preview: {
    port: 3000,
  },
});
```

#### Remote Module Vite Configuration

```typescript
// prompt-manager/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'promptManager',
      filename: 'remoteEntry.js',
      exposes: {
        './PromptTemplateManager': './src/PromptTemplateManager.tsx',
        './PromptEditor': './src/components/PromptEditor.tsx',
        './TemplateLibrary': './src/components/TemplateLibrary.tsx',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        '@augment-it/ui-components': { singleton: true },
        '@augment-it/api-client': { singleton: true },
        '@augment-it/utils': { singleton: true },
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3001,
    cors: true,
  },
  preview: {
    port: 3001,
  },
});
```

#### Docker Configuration Examples

##### Shell Application Dockerfile

```dockerfile
# shell-app/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy environment configuration script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
```

##### Remote Module Dockerfile

```dockerfile
# prompt-manager/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the federated module
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Custom nginx configuration for Module Federation
COPY nginx-mf.conf /etc/nginx/conf.d/default.conf

# Copy built federated module
COPY --from=builder /app/dist /usr/share/nginx/html

# Environment configuration
COPY docker-entrypoint-mf.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
```

##### Microservice Dockerfile

```dockerfile
# api-connector-service/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Create app user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built application
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist

# Health check
COPY --chown=nodejs:nodejs healthcheck.js ./
RUN chmod +x healthcheck.js

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

CMD ["node", "dist/index.js"]
```

##### Docker Compose for Development

```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  # Shell Application
  shell-app:
    build:
      context: ./shell-app
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./shell-app/src:/app/src
      - ./shared/ui-components:/app/node_modules/@augment-it/ui-components
    environment:
      - NODE_ENV=development
      - PROMPT_MANAGER_URL=http://prompt-manager:3001
      - INSIGHT_ASSEMBLER_URL=http://insight-assembler:3002
    depends_on:
      - api-gateway
    networks:
      - augment-it-network

  # Remote Modules
  prompt-manager:
    build:
      context: ./prompt-manager
      dockerfile: Dockerfile.dev
    ports:
      - "3001:3001"
    volumes:
      - ./prompt-manager/src:/app/src
      - ./shared/ui-components:/app/node_modules/@augment-it/ui-components
    environment:
      - NODE_ENV=development
      - API_GATEWAY_URL=http://api-gateway:8080
    networks:
      - augment-it-network

  insight-assembler:
    build:
      context: ./insight-assembler
      dockerfile: Dockerfile.dev
    ports:
      - "3002:3002"
    volumes:
      - ./insight-assembler/src:/app/src
      - ./shared/ui-components:/app/node_modules/@augment-it/ui-components
    environment:
      - NODE_ENV=development
      - API_GATEWAY_URL=http://api-gateway:8080
    networks:
      - augment-it-network

  request-reviewer:
    build:
      context: ./request-reviewer
      dockerfile: Dockerfile.dev
    ports:
      - "3003:3003"
    volumes:
      - ./request-reviewer/src:/app/src
    environment:
      - NODE_ENV=development
      - API_GATEWAY_URL=http://api-gateway:8080
    networks:
      - augment-it-network

  record-collector:
    build:
      context: ./record-collector
      dockerfile: Dockerfile.dev
    ports:
      - "3004:3004"
    volumes:
      - ./record-collector/src:/app/src
    environment:
      - NODE_ENV=development
      - API_GATEWAY_URL=http://api-gateway:8080
    networks:
      - augment-it-network

  # Microservices
  api-gateway:
    build:
      context: ./api-gateway
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=development
      - REDIS_URL=redis://redis:6379
      - USER_AUTH_SERVICE_URL=http://user-auth-service:3000
      - API_CONNECTOR_SERVICE_URL=http://api-connector-service:3000
    depends_on:
      - redis
      - user-auth-service
      - api-connector-service
    networks:
      - augment-it-network

  user-auth-service:
    build:
      context: ./user-auth-service
      dockerfile: Dockerfile
    ports:
      - "3010:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/augment_it
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - postgres
    networks:
      - augment-it-network

  api-connector-service:
    build:
      context: ./api-connector-service
      dockerfile: Dockerfile
    ports:
      - "3011:3000"
    environment:
      - NODE_ENV=development
      - REDIS_URL=redis://redis:6379
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - GROQ_API_KEY=${GROQ_API_KEY}
    depends_on:
      - redis
    networks:
      - augment-it-network

  yaml-parser-service:
    build:
      context: ./yaml-parser-service
      dockerfile: Dockerfile
    ports:
      - "3012:3000"
    environment:
      - NODE_ENV=development
    networks:
      - augment-it-network

  json-parser-service:
    build:
      context: ./json-parser-service
      dockerfile: Dockerfile
    ports:
      - "3013:3000"
    environment:
      - NODE_ENV=development
    networks:
      - augment-it-network

  markdown-parser-service:
    build:
      context: ./markdown-parser-service
      dockerfile: Dockerfile
    ports:
      - "3014:3000"
    environment:
      - NODE_ENV=development
    networks:
      - augment-it-network

  # Infrastructure
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - augment-it-network

  postgres:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=augment_it
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - augment-it-network

  # Monitoring
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    networks:
      - augment-it-network

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-data:/var/lib/grafana
    networks:
      - augment-it-network

volumes:
  redis-data:
  postgres-data:
  prometheus-data:
  grafana-data:

networks:
  augment-it-network:
    driver: bridge
```

#### Kubernetes Deployment Example

```yaml
# k8s/shell-app-deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: shell-app
  labels:
    app: shell-app
    tier: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: shell-app
  template:
    metadata:
      labels:
        app: shell-app
        tier: frontend
    spec:
      containers:
      - name: shell-app
        image: augment-it/shell-app:latest
        ports:
        - containerPort: 80
        env:
        - name: PROMPT_MANAGER_URL
          value: "http://prompt-manager-service:80"
        - name: INSIGHT_ASSEMBLER_URL
          value: "http://insight-assembler-service:80"
        - name: API_GATEWAY_URL
          value: "http://api-gateway-service:8080"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: shell-app-service
spec:
  selector:
    app: shell-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: shell-app-ingress
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - app.augment-it.com
    secretName: shell-app-tls
  rules:
  - host: app.augment-it.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: shell-app-service
            port:
              number: 80
```

### Module Communication Patterns

```mermaid
sequenceDiagram
    participant User
    participant Shell as Shell App
    participant Router as Module Router
    participant Remote as Remote Module
    participant Shared as Shared Library
    participant API as API Gateway
    participant Service as Microservice
    
    User->>Shell: Navigate to /prompt-manager
    Shell->>Router: Route request
    Router->>Remote: Load prompt-manager module
    Remote->>Shared: Import UI components
    Shared-->>Remote: Return components
    Remote->>API: Fetch template data
    API->>Service: Forward to template service
    Service-->>API: Return template data
    API-->>Remote: Return formatted response
    Remote-->>Router: Return rendered component
    Router-->>Shell: Display component
    Shell-->>User: Show prompt manager interface
```

### Error Handling & Recovery

#### Module Federation Error Boundaries

```typescript
// shell-app/src/components/ModuleErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  moduleName: string;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ModuleErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Module ${this.props.moduleName} failed to load:`, error, errorInfo);
    
    // Report to monitoring service
    this.reportError(error, errorInfo);
  }

  private reportError(error: Error, errorInfo: ErrorInfo) {
    // Send error to monitoring service
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        module: this.props.moduleName,
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
      }),
    }).catch(console.error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="module-error">
          <h3>Module Failed to Load</h3>
          <p>The {this.props.moduleName} module is currently unavailable.</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ModuleErrorBoundary;
```

#### Module Loading with Fallback

```typescript
// shell-app/src/components/ModuleLoader.tsx
import React, { Suspense, lazy } from 'react';
import ModuleErrorBoundary from './ModuleErrorBoundary';
import LoadingSpinner from './LoadingSpinner';

const loadModule = (scope: string, module: string) => {
  return lazy(() =>
    import(scope)
      .then((container: any) => container[module])
      .catch((error) => {
        console.error(`Failed to load module ${scope}/${module}:`, error);
        // Return fallback component
        return import('./FallbackComponent');
      })
  );
};

interface ModuleLoaderProps {
  scope: string;
  module: string;
  moduleName: string;
  fallback?: React.ComponentType;
}

const ModuleLoader: React.FC<ModuleLoaderProps> = ({ 
  scope, 
  module, 
  moduleName, 
  fallback 
}) => {
  const LazyComponent = loadModule(scope, module);

  return (
    <ModuleErrorBoundary moduleName={moduleName} fallback={fallback && <fallback />}>
      <Suspense fallback={<LoadingSpinner />}>
        <LazyComponent />
      </Suspense>
    </ModuleErrorBoundary>
  );
};

export default ModuleLoader;
```

### Security Considerations

#### Container Security

```dockerfile
# Secure base image
FROM node:18-alpine@sha256:specific-hash AS builder

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy package files with proper ownership
COPY --chown=nodejs:nodejs package*.json ./

# Install dependencies as root (needed for some packages)
RUN npm ci --only=production && npm cache clean --force

# Copy source code with proper ownership
COPY --chown=nodejs:nodejs . .

# Build application
RUN npm run build

# Production stage with minimal image
FROM nginx:alpine@sha256:specific-hash AS production

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx-secure.conf /etc/nginx/conf.d/

# Copy built application
COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html

# Set up proper permissions
RUN chmod -R 755 /usr/share/nginx/html

# Use non-root user
USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
```

#### Nginx Security Configuration

```nginx
# nginx-secure.conf
server {
    listen 8080;
    server_name _;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' http://api-gateway:8080";
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/css application/javascript application/json;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Module federation remotes
    location /remoteEntry.js {
        expires 1d;
        add_header Cache-Control "public, must-revalidate";
    }
    
    # Health check
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
    
    # Default location
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

## 5. Implementation Plan

### Phase 1: Foundation Setup (Weeks 1-2)

1. **Development Environment Setup**
   - Set up Docker development environment
   - Create base Dockerfile templates
   - Configure docker-compose for local development
   - Set up shared component library structure

2. **Shell Application Development**
   - Create shell application with basic routing
   - Implement Module Federation host configuration
   - Set up authentication and navigation
   - Create error boundaries and loading states

3. **First Remote Module**
   - Convert Prompt Template Manager to federated module
   - Implement Vite Module Federation configuration
   - Test loading and communication with shell app
   - Set up CI/CD pipeline for the module

### Phase 2: Core Modules & Services (Weeks 3-6)

1. **Additional Remote Modules**
   - Convert Insight Assembler to federated module
   - Convert Request Reviewer to federated module
   - Convert Record Collector to federated module
   - Implement shared state management

2. **Microservice Containerization**
   - Containerize API Gateway
   - Containerize User Authorization Service
   - Containerize API Connector Service
   - Containerize Parser Services (YAML, JSON, Markdown)

3. **Service Communication**
   - Implement service discovery
   - Set up inter-service communication
   - Add monitoring and health checks
   - Implement distributed logging

### Phase 3: Production Readiness (Weeks 7-8)

1. **Kubernetes Deployment**
   - Create Kubernetes manifests
   - Set up ingress and load balancing
   - Configure auto-scaling policies
   - Implement secrets management

2. **Monitoring & Observability**
   - Set up Prometheus metrics collection
   - Configure Grafana dashboards
   - Implement distributed tracing
   - Set up alerting rules

3. **Security & Compliance**
   - Implement container security scanning
   - Set up vulnerability monitoring
   - Configure network policies
   - Add audit logging

### Dependencies

#### Internal Dependencies
- Existing Augment-It application components
- Current API services and databases
- Development and deployment infrastructure

#### External Dependencies
- Docker and Docker Compose
- Kubernetes cluster (for production)
- Container registry (Docker Hub, ECR, or GCR)
- Monitoring stack (Prometheus, Grafana)
- CI/CD pipeline tools

#### Technology Stack
- **Frontend**: React 18+, TypeScript, Vite, @originjs/vite-plugin-federation
- **Backend**: Node.js, TypeScript, Express.js
- **Containerization**: Docker, Docker Compose
- **Orchestration**: Kubernetes
- **Monitoring**: Prometheus, Grafana, Jaeger
- **Caching**: Redis
- **Database**: PostgreSQL

### Testing Strategy

#### Unit Testing
```typescript
// __tests__/ModuleLoader.test.tsx
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import ModuleLoader from '../src/components/ModuleLoader';

// Mock module federation
jest.mock('promptManager/PromptTemplateManager', () => {
  return {
    default: () => <div>Prompt Template Manager</div>
  };
});

describe('ModuleLoader', () => {
  test('loads module successfully', async () => {
    render(
      <ModuleLoader
        scope="promptManager"
        module="./PromptTemplateManager"
        moduleName="Prompt Manager"
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Prompt Template Manager')).toBeInTheDocument();
    });
  });

  test('shows fallback on module load error', async () => {
    // Mock module loading failure
    jest.mock('promptManager/PromptTemplateManager', () => {
      throw new Error('Module not found');
    });

    render(
      <ModuleLoader
        scope="promptManager"
        module="./NonExistentModule"
        moduleName="Prompt Manager"
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Module Failed to Load/)).toBeInTheDocument();
    });
  });
});
```

#### Integration Testing
- End-to-end testing of module loading and communication
- API integration testing between microservices
- Container integration testing with docker-compose
- Service mesh communication testing

#### Load Testing
- Performance testing of module loading times
- Scalability testing of containerized services
- Network latency testing between services
- Memory usage testing for federated modules

## 6. Alternatives Considered

### Single-SPA vs Module Federation
- **Single-SPA Approach**: Framework-agnostic microfrontend orchestration
  - **Pros**: Technology flexibility, mature ecosystem, good documentation
  - **Cons**: Complex setup, runtime overhead, limited code sharing
  - **Decision**: Vite Module Federation chosen for better performance, faster builds, and modern development experience

### Iframe-based Microfrontends
- **Approach**: Isolate microfrontends using iframes
  - **Pros**: Complete isolation, security, easy integration
  - **Cons**: Poor user experience, communication complexity, styling limitations
  - **Decision**: Module Federation provides better UX and integration

### Monolithic Deployment with Microservice Backend
- **Approach**: Keep frontend monolithic, only split backend services
  - **Pros**: Simpler frontend development, fewer deployment complexities
  - **Cons**: Frontend team bottlenecks, limited technology choices, scaling issues
  - **Decision**: Full microfrontend approach enables better team autonomy

### Serverless Functions vs Containerized Microservices
- **Approach**: Use AWS Lambda, Azure Functions, or Google Cloud Functions
  - **Pros**: Auto-scaling, cost efficiency, no infrastructure management
  - **Cons**: Vendor lock-in, cold starts, limited execution time
  - **Decision**: Containerized approach provides more control and flexibility

## 7. Open Questions

1. **Module Versioning Strategy**: How should we handle version compatibility between shell and remote modules?
2. **State Management**: Should we use a centralized state store or distributed state across modules?
3. **Performance Optimization**: What caching strategies should we implement for module loading?
4. **Development Experience**: How can we optimize the developer experience for working with multiple modules?
5. **Monitoring Granularity**: What level of monitoring do we need for individual modules vs. the entire application?
6. **Security Boundaries**: How should we handle sensitive data sharing between federated modules?

## 8. Appendix

### Glossary

- **Module Federation**: Webpack feature that allows applications to share modules at runtime
- **Microfrontend**: Independent frontend application that can be composed with other microfrontends
- **Shell Application**: Host application that loads and orchestrates remote microfrontend modules
- **Remote Module**: Independently deployable microfrontend module consumed by the shell app
- **Shared Library**: Common code shared between multiple federated modules
- **Container Orchestration**: Automated deployment, scaling, and management of containerized applications
- **Service Mesh**: Infrastructure layer that handles service-to-service communication
- **Circuit Breaker**: Design pattern that prevents cascade failures in distributed systems

### References

- [Webpack Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [Docker Best Practices](https://docs.docker.com/develop/best-practices/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Microfrontend Patterns](https://micro-frontends.org/)
- [API Related Services Specification](projects/Augment-It/Specs/API%20Related%20Services.md)
- [API Connector Service Specification](./shared-services/apiConnectorService.md)

### Revision History

- v0.1.0 (2025-08-12): Initial comprehensive specification with Module Federation, Docker architecture, and implementation examples
