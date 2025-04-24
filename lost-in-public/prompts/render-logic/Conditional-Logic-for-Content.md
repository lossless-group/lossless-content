---
title: Conditional Logic for Content
lede: Implement conditional rendering based on content status and user roles
date_authored_initial_draft: 2025-03-19
date_authored_current_draft: 2025-04-11
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.1.0
status: To-Do
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-16
image_prompt: "A visual representation of conditional logic in content rendering, featuring flowcharts, branching arrows, and code snippets. The scene conveys dynamic decision-making, modularity, and the adaptability of digital content systems."
site_uuid: 8dd7a6f2-424d-4007-ace6-d30465b0001f
tags:
  - Render-Logic
authors:
  - Michael Staton
portrait_image: https://img.recraft.ai/JgIyURKxi_VnG5cM6xQSNuE1ClkH3ZTckuGvevkfJFk/rs:fit:1024:2048:0/raw:1/plain/abs://external/images/ca73a923-6834-4092-879c-24da549097a7
---
## The 'status' property values

| Value | isAdmin? | isPublic? |
| ----- | -------- | --------- |
| To-Do | true     | false     |

## Dynamic Route Mapping for Content Paths

### Problem Statement

When using wiki-style backlinks in markdown content (e.g., `[[vocabulary/Software Development]]`), we need a flexible system to map content paths to web routes. For example, content from `content/vocabulary/software-development` should be accessible at `/more-about/software-development`.

### Implementation Requirements

1. Create a centralized route manager that serves as a Single Source of Truth
2. Support dynamic configuration of route mappings without code changes
3. Provide an admin interface for managing mappings
4. Ensure backward compatibility with existing backlinks
5. Follow modular design principles with comprehensive documentation

### Solution Architecture

#### 1. Route Manager Module

Created a centralized route management system (`site/src/utils/routing/routeManager.ts`):

```typescript
interface RouteMapping {
  contentPath: string;  // Content directory path prefix
  routePath: string;    // Corresponding web route
}

// Default mappings with common content types
const defaultRouteMappings: RouteMapping[] = [
  {
    contentPath: 'vocabulary',
    routePath: 'more-about'
  },
  {
    contentPath: 'lost-in-public/prompts',
    routePath: 'prompts'
  }
];

// Core transformation function
export function transformContentPathToRoute(path: string): string {
  // Implementation details...
}

// API for managing mappings
export function addRouteMapping(contentPath: string, routePath: string): void {
  // Implementation details...
}
```

#### 2. Backlinks Plugin Integration

Updated the remark-backlinks plugin (`site/src/utils/markdown/remark-backlinks.ts`) to use the route manager:

```typescript
import { transformContentPathToRoute } from '../routing/routeManager';

// Within the transformer function:
const transformedPath = transformContentPathToRoute(path);
```

#### 3. Admin Interface

Created a component (`site/src/components/admin/RouteManager.astro`) and admin page (`site/src/pages/admin/route-manager.astro`) for managing route mappings:

```astro
<div class="route-manager">
  <!-- Display current mappings -->
  <table>
    {routeMappings.map((mapping) => (
      <!-- Table rows for each mapping -->
    ))}
  </table>
  
  <!-- Form for adding new mappings -->
  <form id="add-mapping-form">
    <!-- Input fields -->
  </form>
</div>
```

#### 4. API Endpoint

Implemented a RESTful API (`site/src/pages/api/route-mappings.ts`) for programmatic management:

```typescript
export const GET: APIRoute = async () => {
  // Return all mappings
};

export const POST: APIRoute = async ({ request }) => {
  // Handle adding/removing mappings
};
```

### Benefits

1. **Flexibility**: Content editors can configure route mappings without developer intervention
2. **Consistency**: All backlinks follow the same routing rules
3. **Modularity**: Each component has a single responsibility
4. **Extensibility**: Easy to add support for new content types

### Usage Examples

#### Before Implementation
```markdown
[[vocabulary/Software Development]] → /content/vocabulary/software-development
```

#### After Implementation
```markdown
[[vocabulary/Software Development]] → /more-about/software-development
```

### Next Steps

1. Add support for more complex path transformations
2. Implement caching for better performance
3. Create automated tests for the route manager
4. Extend the admin UI with additional features like bulk operations