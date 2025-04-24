---
title: Add Sort by Functionality to Tag Column
lede: Make the tag column more powerful by allowing different kinds of sort patterns
date_authored_initial_draft: 2025-04-15
date_authored_current_draft: 2025-04-15
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Do
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-16
image_prompt: "A dynamic display of floating tags, with a tidy tag column on the left, listing tags in a sorted order."
site_uuid: 394a6a08-3589-4b9d-af05-ad7bea37be30
tags:
  - User-Interface
  - Content-Models
  - Content-Sorting
  - UI-Design
authors:
  - Michael Staton
banner_image: https://img.recraft.ai/MeF_ynouDvjybXINUKr0lHlAFH-EKUCaFTs0RXp_Ly4/rs:fit:1024:2048:0/raw:1/plain/abs://external/images/084a7787-83f0-48fc-94c8-cd9c2c70cf10

# Goal:

To introduce a sorting functionality to the tag column, allowing users to sort tools by different criteria. Default criteria include: 
1. Frequency of tag usage, toggle from most to least and least to most
2. Alphabetic order, toggle from A to Z and Z to A


To make the TagColumn and TagChip components reusable components, and be able to implement them with minimal changes to the Prompts collection rendered in the `site/src/pages/thread/[magazine].astro` page.

# Context

## Our Existing Implementation

The tag column is currently implemented as a simple list of tags, with no sorting functionality. Right now, I think they appear in the order of frequency of tag usage, from most to least. 

### Our Current Render Pipeline:

1. `site/src/pages/toolkit.astro`
2. `site/src/layouts/ToolkitLayout.astro`
3. `site/src/components/tool-components/TagColumn.astro`
   4. `site/src/components/tool-components/TagChip.astro`
5. `site/src/components/tool-components/CardGrid.astro`
   6. `site/src/components/tool-components/ToolCard.astro`
   7. `site/src/components/tool-components/BareToolCard.astro`

## Data Flow and Sorting Logic (Technical Specification)

### Data Flow Overview

- **toolkit.astro**: Loads all tools and their tags from content collections or API.
- **ToolkitLayout.astro**: Receives all tool data as props, extracts tags, and passes them to `TagColumn`.
   -  Does not use hard "Type Safety" per our constraints, as the Content Team does not always maintain perfect metadata. 
- **TagColumn.astro**: Receives an array of tags (with frequency counts) as a prop, displays them, and implements sorting logic and UI.
- **TagChip.astro**: Receives a single tag (and possibly its frequency/count) as a prop, renders it as a clickable or display element.

**Sorting** is handled inside `TagColumn.astro`, so the component is reusable and encapsulates its own sorting logic and UI state.

### Mermaid Diagram

```mermaid
flowchart TD
    A[toolkit.astro] -->|loads tools & tags| B[ToolkitLayout.astro]
    B -->|passes tags prop| C[TagColumn.astro]
    C -->|renders sorted tags| D[TagChip.astro]
    C -- sorts tags by user selection --> D
```

### Implementation Approach

For this purely client-side sorting functionality, we'll use Astro's standard client-side scripting capabilities. While Astro Actions are powerful for server operations, our tag sorting is a purely client-side concern that doesn't require server processing after the initial page load.

### Example Code Snippets

#### 1. toolkit.astro (top-level page)
```astro
---
import ToolkitLayout from '../layouts/ToolkitLayout.astro';
import { getAllTools } from '~/lib/data';

const tools = await getAllTools();
const tags = extractTagsWithCounts(tools); // [{ tag: 'AI', count: 12 }, ...]
---
<ToolkitLayout tools={tools} tags={tags} />
```

#### 2. ToolkitLayout.astro (layout)
```astro
---
const { tools, tags } = Astro.props;
import TagColumn from '../components/tool-components/TagColumn.astro';
---
<div class="toolkit-layout">
  <TagColumn tags={tags} />
  <!-- ...other layout components... -->
</div>
```

#### 3. TagColumn.astro (component)
```astro
---
const { tags } = Astro.props;
import TagChip from './TagChip.astro';

// Initial values for client-side sorting
let sortType = 'frequency-desc';

// Function to sort tags based on sort type
function getSortedTags(tags, sortType) {
  if (sortType === 'frequency-desc') return [...tags].sort((a, b) => b.count - a.count);
  if (sortType === 'frequency-asc') return [...tags].sort((a, b) => a.count - b.count);
  if (sortType === 'alpha-asc') return [...tags].sort((a, b) => a.tag.localeCompare(b.tag));
  if (sortType === 'alpha-desc') return [...tags].sort((a, b) => b.tag.localeCompare(a.tag));
  return tags; // Default fallback
}

// Get initial sorted tags for initial render
const initialSortedTags = getSortedTags(tags, sortType);
---

<div class="tag-column">
  <!-- Sort controls -->
  <div class="sort-controls">
    <button id="sort-alpha" class="sort-button" data-sort-type="alpha-asc" aria-label="Sort alphabetically">
      <span class="icon">A-Z</span>
    </button>
    <button id="sort-freq" class="sort-button active" data-sort-type="frequency-desc" aria-label="Sort by frequency">
      <span class="icon">#</span>
    </button>
  </div>
  
  <!-- Tag list (initial render) -->
  <div id="tag-list" class="tag-list" data-tags={JSON.stringify(tags)}>
    {initialSortedTags.map(tag => (
      <TagChip 
        tag={tag.tag} 
        count={tag.count} 
        id={`tag-${tag.tag}`}
      />
    ))}
  </div>
</div>

<!-- Client-side interactivity with vanilla JS -->
<script>
  // Get DOM elements
  const sortAlphaBtn = document.getElementById('sort-alpha');
  const sortFreqBtn = document.getElementById('sort-freq');
  const tagList = document.getElementById('tag-list');
  
  // Get tag data from the data attribute
  const tags = JSON.parse(tagList.dataset.tags);
  
  // Current sort state
  let currentSortType = 'frequency-desc';
  
  // Sort function (same as in the component front matter)
  function getSortedTags(tags, sortType) {
    if (sortType === 'frequency-desc') return [...tags].sort((a, b) => b.count - a.count);
    if (sortType === 'frequency-asc') return [...tags].sort((a, b) => a.count - b.count);
    if (sortType === 'alpha-asc') return [...tags].sort((a, b) => a.tag.localeCompare(b.tag));
    if (sortType === 'alpha-desc') return [...tags].sort((a, b) => b.tag.localeCompare(a.tag));
    return tags;
  }
  
  // Render function to update the tag list
  function renderTags() {
    const sortedTags = getSortedTags(tags, currentSortType);
    
    // Clear current list
    tagList.innerHTML = '';
    
    // Add sorted tags
    sortedTags.forEach(tag => {
      // Create a new tag chip element
      const chip = document.createElement('div');
      chip.id = `tag-${tag.tag}`;
      chip.className = 'tag-chip';
      
      // Convert train-case to Normal Case for display
      const normalCase = tag.tag
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      chip.innerHTML = `
        ${normalCase}
        <span class="tag-count">${tag.count}</span>
      `;
      
      // Add click event listener
      chip.addEventListener('click', () => {
        window.location.href = `/toolkit/${encodeURIComponent(tag.tag)}`;
      });
      
      tagList.appendChild(chip);
    });
  }
  
  // Event handlers for sort buttons
  sortAlphaBtn.addEventListener('click', () => {
    // Toggle between alpha-asc and alpha-desc
    currentSortType = currentSortType === 'alpha-asc' ? 'alpha-desc' : 'alpha-asc';
    
    // Update active button state
    sortAlphaBtn.classList.add('active');
    sortFreqBtn.classList.remove('active');
    
    // Update button data attribute
    sortAlphaBtn.dataset.sortType = currentSortType;
    
    // Re-render tags
    renderTags();
  });
  
  sortFreqBtn.addEventListener('click', () => {
    // Toggle between frequency-desc and frequency-asc
    currentSortType = currentSortType === 'frequency-desc' ? 'frequency-asc' : 'frequency-desc';
    
    // Update active button state
    sortFreqBtn.classList.add('active');
    sortAlphaBtn.classList.remove('active');
    
    // Update button data attribute
    sortFreqBtn.dataset.sortType = currentSortType;
    
    // Re-render tags
    renderTags();
  });
</script>
```

#### 4. TagChip.astro (component)
```astro
---
// Define props interface
interface Props {
  tag: string;
  count?: number;
  includeCount?: boolean;
  id?: string;
}

// Destructure props
const { tag, count, includeCount = false, id } = Astro.props;

// Convert train-case to Normal Case for display
function trainCaseToNormalCase(tag) {
  return tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const normalCase = trainCaseToNormalCase(tag);
---

<button
  class="tag-chip"
  id={id}
  data-tag={tag}
  aria-label={`Click to see content tagged with ${normalCase}`}
  title={`Click to see content tagged with ${normalCase}`}
>
  {normalCase}
  {includeCount && count !== undefined && <span class="tag-count">{count}</span>}
</button>

<script>
  // Get all tag chips
  const tagChips = document.querySelectorAll('.tag-chip');
  
  // Add click event listeners
  tagChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const tag = chip.dataset.tag;
      // Navigate to filtered view or trigger filter action
      window.location.href = `/toolkit/${encodeURIComponent(tag)}`;
    });
  });
</script>
```

## UI/UX Requirements

### Sort Controls

- **Placement**: At the top of the tag column, above the list of tags.
- **Appearance**: Simple, icon-based buttons that clearly indicate their purpose.
- **Functionality**:
  - Clicking the "A-Z" button toggles between alphabetical ascending (A-Z) and descending (Z-A).
  - Clicking the "#" button toggles between frequency descending (most used first) and ascending (least used first).
  - The currently active sort criterion should be visually indicated.

**Example structure:**
```astro
<div class="tag-sort-toggle">
  <button class="sort-alpha" id="sort-alpha">
    <Icon name="tabler:list-letters" />
    <!-- Optionally indicate direction/state -->
  </button>
  <button class="sort-frequency" id="sort-freq">
    <Icon name="tabler:sort-descending-numbers" />
    <!-- Optionally indicate direction/state -->
  </button>
</div>
```

### Tag Chip Accessibility

- Each TagChip should have appropriate ARIA attributes and title for accessibility.
- The text displayed should be in Normal Case for readability, even if the tag is stored in train-case.

### Usage Example in TagChip (Astro)

```astro
const normalCase = trainCaseToNormalCase(tag);

<button
  class="tag-chip"
  aria-label={`Click to see content tagged with ${normalCase}`}
  title={`Click to see content tagged with ${normalCase}`}
>
  {normalCase}
  {count && <span class="tag-count">{count}</span>}
</button>
```

- This ensures screen readers and tooltips provide a human-friendly, descriptive label for each tag.

### Mobile Responsiveness

- On mobile devices, the tag column should be collapsible to save space.
- **Default (Mobile):** TagColumn is collapsed, visible as a slim tab or icon on the left.
- **User taps tab/icon:** TagColumn expands, showing all tags and sorting controls.
- **User selects a tag:** TagColumn immediately collapses, revealing filtered results in the main content area.
- **User can re-expand TagColumn at any time to change selection.**

- The collapse/expand state should be managed in client-side JavaScript using a `<script>` block with event listeners.

## Reusability & Abstraction Guidelines

- **TagColumn** must accept a prop named `collectionExtractedTagArray`, which is an array of tag objects from any collection or data source.
    - Example:
      ```js
      [
        { tag: "AI", count: 12 },
        { tag: "Productivity", count: 5 }
      ]
      ```
    - The source of the tag array (content collection, API, static data, etc.) is not the concern of TagColumn.
    - The component should not assume anything about the parent context except that it receives this array.

- **TagChip** should be presentational by default, but may optionally accept additional props for:
    - Its current sort state (e.g., through data attributes)
    - Its index/order in the current sort (e.g., through data attributes)
    - Any other metadata useful for accessibility or UI (e.g., `aria-label`, `title`, etc.)
    - These props should be optional and documented, so TagChip can be used in both simple and advanced scenarios.

- **State Management**:
    - Use Astro's client-side scripting with standard `<script>` blocks for interactive functionality.
    - TagColumn should manage its own sort state with client-side JavaScript.
    - Store the current sort state in a variable and use it to update the UI when the user interacts with the sort controls.
    - Use DOM manipulation to update the tag list when the sort order changes.

- **Example Prop Interface**:
    ```ts
    // For TagColumn
    type TagColumnProps = {
      collectionExtractedTagArray: Array<{ tag: string; count?: number; [key: string]: any }>;
      // ...other config options
    }

    // For TagChip
    type TagChipProps = {
      tag: string;
      count?: number;
      id?: string;
      // ...other UI/accessibility props
    }
    ```

- **Flexibility**:
    - TagColumn and TagChip should not be tightly coupled to any specific data source or sort logic.
    - Document the expected shape of the tag array and optional props for maximum developer clarity.

This abstraction ensures TagColumn and TagChip can be reused across different collections and contexts without modification.

### Selected Tags Feature Implementation

To enhance the tag filtering experience, we need to implement a feature where selected tags "pop up" to the top of the TagColumn, and users can select multiple tags simultaneously.

#### 1. Approach Overview

1. **Track Selected Tags**: Add a mechanism to track which tags are currently selected
2. **Modify Sort Logic**: Update the sorting logic to prioritize selected tags
3. **Visual Indicators**: Enhance the UI to clearly show selected tags
4. **Multiple Selection**: Enable multiple tag selection with appropriate URL handling
5. **Card Sorting**: Sort tool cards based on how many selected tags they match

#### 2. Implementation Details

The implementation will involve:

1. **Update the TagColumn Component**:
   - Add functionality to track selected tags in client-side state
   - Modify the sort function to prioritize selected tags
   - Update the rendering logic to visually distinguish selected tags
   - Implement "OR" logic for filtering (show cards matching ANY selected tag)
   - Sort cards by match count (cards matching more tags appear first)

2. **Enhance the TagChip Component**:
   - Add a "selected" state that can be toggled
   - Update the styling to show a clear visual difference for selected tags

3. **URL and Navigation Handling**:
   - Modify the URL structure to support multiple tag parameters
   - Update the click handlers to toggle tags rather than navigate directly
   - Preserve state in the URL for bookmarking and sharing

#### 3. Code Implementation Examples

**Client-side Tag Selection State**:
```javascript
// In TagColumn.astro client script
let selectedTags = [];

// Check URL for already selected tags
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('tags')) {
  selectedTags = urlParams.get('tags').split(',');
}

// Function to toggle tag selection
function toggleTagSelection(tag) {
  if (selectedTags.includes(tag)) {
    selectedTags = selectedTags.filter(t => t !== tag);
  } else {
    selectedTags.push(tag);
  }
  
  // Update URL
  const newUrl = new URL(window.location);
  if (selectedTags.length > 0) {
    newUrl.searchParams.set('tags', selectedTags.join(','));
  } else {
    newUrl.searchParams.delete('tags');
  }
  history.pushState({}, '', newUrl);
  
  // Re-render tags with new selection state
  renderTags();
  
  // Trigger content filtering
  filterContent(selectedTags);
}
```

**Updated Sorting Logic**:
```javascript
// Modified sort function to prioritize selected tags
function getSortedTags(tags, sortType, selectedTags) {
  // First sort by selection status
  const sortedTags = [...tags].sort((a, b) => {
    const aSelected = selectedTags.includes(a.tag);
    const bSelected = selectedTags.includes(b.tag);
    
    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;
    
    // If both have same selection status, sort by the chosen criteria
    if (sortType === 'frequency-desc') return b.count - a.count;
    if (sortType === 'frequency-asc') return a.count - b.count;
    if (sortType === 'alpha-asc') return a.tag.localeCompare(b.tag);
    if (sortType === 'alpha-desc') return b.tag.localeCompare(a.tag);
    return 0;
  });
  
  return sortedTags;
}
```

**Updated TagChip Component**:
```astro
---
// In TagChip.astro
interface Props {
  tag: string;
  count?: number;
  selected?: boolean;
  onToggle?: () => void;
}

const { tag, count, selected = false } = Astro.props;
---

<div 
  class={`tool-tag ${selected ? 'selected' : ''}`}
  data-tag={tag}
>
  <p>{tag}</p>
  {count !== undefined && <span class="count">{count}</span>}
</div>

<script>
  // Client-side event handling
  document.querySelectorAll('.tool-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      // Dispatch a custom event that TagColumn will listen for
      const tagValue = tag.dataset.tag;
      const event = new CustomEvent('tagToggled', { 
        detail: { tag: tagValue },
        bubbles: true
      });
      tag.dispatchEvent(event);
    });
  });
</script>
```

**Event Listening in TagColumn**:
```javascript
// In TagColumn.astro client script
document.addEventListener('tagToggled', (event) => {
  const { tag } = event.detail;
  toggleTagSelection(tag);
});
```

**Content Filtering Function**:
```javascript
// Function to filter content based on selected tags
function filterContent(selectedTags) {
  // Get all tool cards
  const toolCards = document.querySelectorAll('.tool-card');
  
  // If no tags selected, show all cards
  if (selectedTags.length === 0) {
    toolCards.forEach(card => {
      card.style.display = '';
    });
    return;
  }
  
  // Create an array to track cards and their match counts
  const cardMatches = [];
  
  // Filter cards based on selected tags
  toolCards.forEach(card => {
    // Get the card's tags
    const cardTagsStr = card.dataset.tags;
    if (!cardTagsStr) return;
    
    const cardTags = JSON.parse(cardTagsStr);
    
    // Count how many selected tags match this card's tags
    const matchCount = selectedTags.filter(tag => cardTags.includes(tag)).length;
    
    // If the card has at least one matching tag, add it to our array with its match count
    if (matchCount > 0) {
      cardMatches.push({
        card: card,
        matchCount
      });
    } else {
      // Hide cards with no matches
      card.style.display = 'none';
    }
  });
  
  // Sort cards by match count (descending)
  cardMatches.sort((a, b) => b.matchCount - a.matchCount);
  
  // Get the parent container of the cards
  const cardContainer = toolCards[0]?.parentElement;
  if (!cardContainer) return;
  
  // Remove all cards from the DOM
  toolCards.forEach(card => card.remove());
  
  // Add cards back in the new sorted order
  cardMatches.forEach(({card, matchCount}) => {
    // Show the card
    card.style.display = '';
    
    // Add a data attribute showing the match count (useful for debugging)
    card.setAttribute('data-match-count', matchCount.toString());
    
    // Add the card back to the container
    cardContainer.appendChild(card);
  });
}
```

### Dynamic Rendering based on selected "TagChip" as a filter. 

From `site/src/layouts/ToolkitLayout.astro`,
```javascript
// Filter entries by tag if filterTag is provided
const filteredEntries = filterTag
  ? toolEntries.filter(entry => entry.data.tags?.includes(filterTag))
  : toolEntries;

// Get all unique tags
const allTags = Array.from(
  new Set(
    toolEntries.flatMap(entry => entry.data.tags || [])
  )
).sort();

// Map entries to tools format with filePath
const toolsWithFilePath = filteredEntries.map(entry => ({
  ...entry.data,
  id: entry.id,
  filePath: `../content/tooling/${entry.id}`,
}));
```

```html
<Layout title={title} description={description}>
  <main>
    <div class="toolkit-container">
      <div class="sidebar">
        <TagColumn allRenderedTags={allTags} tools={toolEntries.map(entry => entry.data)} />
      </div>
      <div class="tools-container">
        <CardGrid
          tools={toolsWithFilePath}
          gap={gap}
          minCardWidth={minCardWidth}
        />
      </div>
    </div>
  </main>
</Layout>

```

### Summary

This implementation provides the following key benefits:

1. **Enhanced Tag Selection**:
   - Selected tags appear at the top of the tag list for easy visibility
   - Multiple tags can be selected simultaneously
   - Visual highlighting clearly indicates which tags are selected

2. **Improved Content Filtering**:
   - Uses "OR" logic to show cards matching ANY selected tag
   - Cards are sorted by relevance (number of matching tags)
   - Cards with more matching tags appear at the top

3. **State Preservation**:
   - The URL reflects the current selection state
   - Users can bookmark or share specific tag combinations
   - Selection state is preserved during page navigation

4. **Responsive User Experience**:
   - All filtering and sorting happens client-side without page reloads
   - Tag selection provides immediate visual feedback
   - Mobile-friendly design with collapsible tag column

This implementation maintains the existing sort functionality while adding powerful multi-tag selection and relevance-based content ordering.
