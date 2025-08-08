---
title: Nested Scroll and Keyboard Behavior Conflicts in Interactive UI Components
lede: Resolving conflicts between parent and child component event handling when nested interactive elements compete for mouse and keyboard control
date: Thu Aug 08 2025 20:27:00 GMT+0200 (Central European Summer Time)
date_authored_initial_draft: 2025-08-08
date_authored_current_draft: 2025-08-08
date_authored_final_draft: 
date_first_published: 2025-08-08
date_last_updated: 
at_semantic_version: 0.0.0.8
status: Complete
augmented_with: Windsurf Cascade on Claude Sonnet 4
working_with: Windsurf IDE with Claude Sonnet 4
category: Input-Event-Hierarchy
date_created: 2025-08-08
date_modified: 2025-08-08
image_prompt: A nested UI diagram showing parent and child components with conflicting scroll behaviors, arrows indicating event flow, and a solution overlay showing proper event delegation and control hierarchy.
site_uuid: a2g8f7c3-3d19-4f05-267f-b5eb837f5f05
tags: [Event-Handling, UI-Components, Scroll-Behavior, Nested-Components, User-Experience, Interactive-Elements, Svelte]
authors:
  - Michael Staton
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/july/Nested-Scroll-and-Keyboard-Behavior-Conflicts_banner_image_1754680757485_tIEJ3HIFP.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/july/Nested-Scroll-and-Keyboard-Behavior-Conflicts_portrait_image_1754680759653_ZRa3yYiGG.webp
square_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/july/Nested-Scroll-and-Keyboard-Behavior-Conflicts_square_image_1754680761581_gTTsi8_4o.webp
---

# Nested Scroll and Keyboard Behavior Conflicts in Interactive UI Components

## The Challenge: Competing Event Handlers

When building interactive UI components with nested elements (like a zoomable canvas containing scrollable file nodes), we encountered conflicts where parent and child components competed for the same user input events. Specifically:

1. **Canvas zoom vs. file content scroll**: Two-finger scroll gestures on Mac were always captured by the parent canvas for zooming, preventing scrolling within selected file nodes
2. **Group hover vs. file hover**: When hovering over a file node inside a group, both the group and file hover states activated simultaneously, creating visual conflicts
3. **Event delegation hierarchy**: The more specific/selected component should take precedence over parent components for user interactions

## The Context: JSON Canvas UI Components

We were working with a JSON Canvas renderer built in Svelte with the following component hierarchy:
- `JSONCanvasRenderer.svelte` - Parent canvas with zoom/pan functionality
- `JSONCanvasGroup.svelte` - Group containers with hover effects
- `JSONCanvasFile.svelte` - File nodes with scrollable content and hover effects

## Incorrect Attempts and Why They Failed

### Attempt 1: CSS `pointer-events: none` on Groups
```css
.canvas-group.child-selected {
  pointer-events: none;
}
```
**Why it failed**: This disabled all interactions with the group, including the ability to select it, but didn't solve the scroll delegation issue.

### Attempt 2: Always Preventing Default on Wheel Events
```javascript
function handleWheel(e: WheelEvent) {
  e.preventDefault(); // This always prevented scroll from reaching children
  // ... zoom logic
}
```
**Why it failed**: The `preventDefault()` call blocked all scroll events from reaching child elements, making file content scrolling impossible.

### Attempt 3: CSS-only Hover State Management
```css
.file-node:hover ~ .group-background {
  /* Attempt to disable group hover when file is hovered */
}
```
**Why it failed**: CSS sibling selectors don't work reliably with complex nested SVG structures and dynamic selection states.

## The "Aha!" Moment

The breakthrough came when we realized we needed **conditional event delegation** based on:

1. **Selection state**: When a child component is selected, it should have priority for relevant events
2. **Spatial awareness**: Event handlers need to know if the mouse is over a selected child component
3. **Event flow control**: Parent components should check if a child should handle the event before processing it themselves

The key insight was that we needed to **conditionally prevent default** rather than always preventing it, and use **state-based CSS classes** to manage hover conflicts.

## Final Solution

### 1. Conditional Scroll Event Delegation

**In `JSONCanvasRenderer.svelte`:**

```javascript
// Check if mouse is over a selected file node
function isMouseOverSelectedFile(mouseX: number, mouseY: number): boolean {
  if (!selectedNodeId) return false;
  
  const selectedNode = canvas.nodes.find(n => n.id === selectedNodeId);
  if (!selectedNode || selectedNode.type !== 'file') return false;
  
  // Convert mouse coordinates to canvas coordinates
  const canvasX = (mouseX - translateX) / scale;
  const canvasY = (mouseY - translateY) / scale;
  
  // Check if mouse is within the selected file node bounds
  const nodeLeft = selectedNode.x;
  const nodeTop = selectedNode.y;
  const nodeRight = selectedNode.x + (selectedNode.width || 200);
  const nodeBottom = selectedNode.y + (selectedNode.height || 150);
  
  return canvasX >= nodeLeft && canvasX <= nodeRight && 
         canvasY >= nodeTop && canvasY <= nodeBottom;
}

// Modified wheel event handler
function handleWheel(e: WheelEvent) {
  const rect = viewportElement.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  
  // If mouse is over a selected file node, allow scroll to pass through
  if (isMouseOverSelectedFile(mouseX, mouseY)) {
    // Don't prevent default - let the scroll event reach the file content
    return;
  }
  
  // Otherwise, handle as canvas zoom
  e.preventDefault();
  
  const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
  const newScale = Math.max(0.1, Math.min(3, scale * zoomFactor));
  
  // Zoom towards mouse position
  const scaleChange = newScale / scale;
  translateX = mouseX - (mouseX - translateX) * scaleChange;
  translateY = mouseY - (mouseY - translateY) * scaleChange;
  
  scale = newScale;
  updateTransform();
}
```

### 2. Child Selection Detection for Groups

**In `JSONCanvasRenderer.svelte`:**

```javascript
// Check if any child nodes of a group are selected
function hasSelectedChild(groupNode: any): boolean {
  if (!selectedNodeId || !groupNode || groupNode.type !== 'group') return false;
  
  // Find nodes that are visually inside this group
  const groupLeft = groupNode.x;
  const groupTop = groupNode.y;
  const groupRight = groupNode.x + (groupNode.width || 200);
  const groupBottom = groupNode.y + (groupNode.height || 150);
  
  return canvas.nodes.some(node => {
    if (node.id === selectedNodeId && node.id !== groupNode.id) {
      // Check if this selected node is within the group bounds
      const nodeLeft = node.x;
      const nodeTop = node.y;
      const nodeRight = node.x + (node.width || 200);
      const nodeBottom = node.y + (node.height || 150);
      
      return nodeLeft >= groupLeft && nodeTop >= groupTop && 
             nodeRight <= groupRight && nodeBottom <= groupBottom;
    }
    return false;
  });
}
```

**Pass child selection state to group:**

```svelte
<JSONCanvasGroup 
  {node}
  isSelected={selectedNodeId === node.id}
  hasSelectedChild={hasSelectedChild(node)}
  onClick={() => selectNode(node.id)}
  onKeydown={(e) => e.key === 'Enter' || e.key === ' ' ? selectNode(node.id) : null}
/>
```

### 3. State-Based Hover Management

**In `JSONCanvasGroup.svelte`:**

```javascript
export let node: GroupNode;
export let isSelected: boolean = false;
export let hasSelectedChild: boolean = false; // New prop
export let onClick: ((event: MouseEvent) => void) | undefined = undefined;
export let onKeydown: ((event: KeyboardEvent) => void) | undefined = undefined;
```

**Template with conditional classes:**

```svelte
<g 
  class="canvas-group" 
  class:selected={isSelected}
  class:child-selected={hasSelectedChild}
  role="group"
  aria-label={node.label || 'Canvas group'}
  tabindex="0"
  on:click={handleClick}
  on:keydown={handleKeydown}
  transform="translate({x}, {y})"
>
  <!-- Group content -->
</g>
```

**CSS for conditional hover behavior:**

```css
.canvas-group {
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Only allow hover when no child is selected */
.canvas-group:hover:not(.child-selected) .group-background {
  stroke: var(--clr-lossless-accent--brightest);
  stroke-width: 2;
}

/* Disable hover when a child is selected */
.canvas-group.child-selected {
  pointer-events: none;
}

/* Re-enable pointer events for child elements when group has child-selected */
.canvas-group.child-selected * {
  pointer-events: auto;
}
```

### 4. Scrollable File Content

**In `JSONCanvasFile.svelte`:**

```css
.file-content {
  width: 100%;
  height: 100%;
  padding: 8px;
  background: var(--clr-primary-bg);
  border: 1px solid var(--clr-lossless-primary-glass--lighter);
  border-radius: 6px;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: var(--ff-legible);
  font-size: var(--fs-200);
  line-height: 1.5;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* Custom scrollbar styling */
.file-content::-webkit-scrollbar {
  width: 6px;
}

.file-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.file-content::-webkit-scrollbar-thumb {
  background: var(--clr-lossless-accent--brightest);
  border-radius: 3px;
  opacity: 0.7;
}

.file-content::-webkit-scrollbar-thumb:hover {
  background: var(--clr-lossless-accent--bright);
  opacity: 1;
}
```

## Key Learnings

1. **Event delegation hierarchy**: More specific/selected components should take precedence over parent components for user interactions
2. **Conditional preventDefault()**: Don't always prevent default on events - check if a child component should handle them first
3. **State-based CSS classes**: Use component state to conditionally apply CSS rules rather than trying to solve everything with CSS selectors
4. **Spatial awareness**: Event handlers need coordinate transformation logic to determine if events occur within specific component bounds
5. **Pointer events management**: Use `pointer-events: none` strategically with `pointer-events: auto` on children to create proper interaction hierarchies

## Best Practices for Next Time

1. **Design event flow first**: Before implementing interactions, map out which component should handle which events under different states
2. **Use coordinate transformation**: Always convert mouse coordinates to the appropriate coordinate system when checking bounds
3. **Implement state communication**: Parent components need to know about child selection states to make proper delegation decisions
4. **Test interaction combinations**: Verify behavior when multiple interactive elements are nested and in different states
5. **Progressive enhancement**: Start with basic functionality and layer on advanced interaction patterns
6. **Document event precedence**: Clearly document which components have priority for different types of events

## Browser Compatibility Notes

- The `pointer-events` CSS property is well-supported in modern browsers
- Webkit scrollbar styling (`-webkit-scrollbar-*`) only works in Webkit-based browsers
- Consider fallbacks for non-Webkit browsers if custom scrollbar styling is critical
- Touch event handling may need additional consideration for mobile devices
