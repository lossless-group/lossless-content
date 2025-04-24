---
title: Dynamic Image Masking Control in FeatureSideImage Component
lede: Implementing flexible image masking with configurable dimensions via JSON data
date: 2025-04-24
date_authored_initial_draft: 2025-04-24
date_authored_current_draft: 2025-04-24
date_authored_final_draft: 2025-04-24
date_first_published: 2025-04-24
date_last_updated: 2025-04-24
at_semantic_version: 0.0.0.1
status: Completed
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
working_with: Windsurf IDE with Claude 3.5
category: Issue Resolution
date_created: 2025-04-24
date_modified: 2025-04-24
tags:
  - Astro
  - CSS
  - JavaScript
  - Image-Handling
  - Component-Design
authors:
  - Michael Staton
---

# Dynamic Image Masking Control in FeatureSideImage Component

## What We Were Trying to Do and Why

We needed to implement a "mask" or "window" effect for images within the `FeatureSideImage` component. The goal was to control the dimensions of this mask, so the image would be cropped to fit a specific area without needing to resize the image itself. Additionally, we wanted the image container to dynamically match the exact height of the text content section in some cases, while allowing for fixed dimensions in others.

This approach would allow us to:
1. Use original, high-quality images without requiring manual resizing
2. Create a consistent visual presentation across different content sections
3. Control the "viewport" dimensions through which images are viewed
4. Provide flexibility through JSON configuration rather than hardcoded values

## Incorrect Attempts

### Attempt 1: Fixed CSS Class with Hardcoded Dimensions

We initially tried creating a simple CSS class with fixed dimensions:

```css
.image-mask {
  height: 300px;
  width: 100%;
  overflow: hidden;
  position: relative;
}
```

**Problem:** This approach lacked flexibility as all masked images would have the same fixed height.

### Attempt 2: JavaScript-Based Height Matching Without Configurable Dimensions

We then implemented a JavaScript solution to match the image container height to the text content:

```astro
{classes.includes('image-mask') && (
  <script define:vars={{ uniqueId }}>
    // Simple function to match the image container height to the text content
    function adjustImageHeight() {
      const container = document.getElementById(`feature-${uniqueId}`);
      if (!container) return;
      
      const textContent = container.querySelector('.feature-content');
      const imageContainer = container.querySelector('.feature-image-container');
      
      if (textContent && imageContainer && window.innerWidth >= 768) {
        // Get the computed height of the text content
        const textHeight = textContent.offsetHeight;
        
        // Set the image container height to match
        imageContainer.style.height = `${textHeight}px`;
      } else if (imageContainer && window.innerWidth < 768) {
        // On mobile, use a fixed height
        imageContainer.style.height = '250px';
      }
    }
    
    // Run on load and resize events...
  </script>
)}
```

**Problem:** While this worked for matching text height, it didn't provide a way to configure different mask dimensions through the JSON data.

### Attempt 3: Using Percentage Values Without Proper Handling

We added `maskHeight` and `maskWidth` properties to the component and tried using percentage values:

```json
{
  "imageClasses": "image-mask",
  "maskHeight": "80%",
  "maskWidth": "120%"
}
```

**Problem:** The percentage values didn't work as expected because they needed a reference container with a defined size. The image container disappeared entirely when using percentage heights without proper handling.

## The "Aha!" Moment

We realized that we needed to:

1. Handle different types of dimension values differently:
   - Fixed dimensions (e.g., "300px") could be applied directly via inline styles
   - Percentage heights needed to be calculated based on the text content's height
   - An "auto" value should trigger the text content height matching
   - Percentage widths greater than 100% needed special positioning to center the wider container

2. Use JavaScript to perform these calculations and apply the appropriate styles dynamically, while still allowing the configuration to come from the JSON data.

## Final Solution

### 1. Updated Props Interface in FeatureSideImage.astro

```astro
interface Props {
  label: string;
  title: string;
  details: string;
  image: {
    src: string;
    alt?: string;
  };
  imageSide: "left" | "right";
  classes?: string;
  maskHeight?: string;      // Optional height for the image mask (e.g., "300px", "50%")
  maskWidth?: string;       // Optional width for the image mask (e.g., "100%", "400px")
}

const { 
  image, 
  label, 
  title, 
  details, 
  imageSide = "right", 
  classes = "",
  maskHeight = "300px",
  maskWidth = "100%"
} = Astro.props;
```

### 2. Enhanced JavaScript for Dynamic Sizing

```astro
{isMasked && (
  <script define:vars={{ uniqueId, useTextHeight: maskHeight === 'auto', maskHeight, maskWidth }}>
    function adjustImageHeight() {
      const container = document.getElementById(`feature-${uniqueId}`);
      if (!container) return;
      
      const textContent = container.querySelector('.feature-content');
      const imageContainer = container.querySelector('.feature-image-container');
      
      if (!textContent || !imageContainer) return;
      
      if (window.innerWidth >= 768) {
        // Handle percentage-based heights
        if (maskHeight.includes('%')) {
          const textHeight = textContent.offsetHeight;
          const percentValue = parseFloat(maskHeight);
          if (!isNaN(percentValue)) {
            const calculatedHeight = (textHeight * percentValue) / 100;
            imageContainer.style.height = `${calculatedHeight}px`;
          }
        } 
        // Handle auto height (match text content)
        else if (maskHeight === 'auto') {
          const textHeight = textContent.offsetHeight;
          imageContainer.style.height = `${textHeight}px`;
        }
        // For fixed heights, the CSS inline style is already applied
      } else if (window.innerWidth < 768) {
        // On mobile, use a fixed height
        imageContainer.style.height = '250px';
      }
      
      // Handle percentage-based widths
      if (maskWidth.includes('%') && parseInt(maskWidth) > 100) {
        const containerWidth = container.offsetWidth / 2; // Assuming 2-column layout
        const percentValue = parseFloat(maskWidth);
        if (!isNaN(percentValue)) {
          const calculatedWidth = (containerWidth * percentValue) / 100;
          imageContainer.style.width = `${calculatedWidth}px`;
          // Center the wider container
          imageContainer.style.transform = 'translateX(-50%)';
          imageContainer.style.position = 'relative';
          imageContainer.style.left = '50%';
        }
      }
    }
    
    // Run on load, resize, and after images load...
  </script>
)}
```

### 3. Updated AlternatingSideImage.astro to Pass Props

```astro
<FeatureSideImage
  label={feature.label}
  title={feature.title}
  details={feature.details}
  image={feature.processedImage}
  imageSide={feature.imageSide}
  classes={feature.imageClasses}
  maskHeight={feature.maskHeight}
  maskWidth={feature.maskWidth}
>
  <div slot="content-footer" class="cta-container">
    <a href={feature.ctaUrl} class="cta-button">{feature.ctaText}</a>
  </div>
</FeatureSideImage>
```

### 4. JSON Configuration Example

```json
{
  "label": "Master Data Fluidics.",
  "title": "Prepare Data and Content for AI",
  "details": "AI requires data not only to exist, but to be orderly, consistent, and fluid. Lossless techniques provide guidance to prepare data and content, as well as keep it ready for AI.",
  "imageSide": "right",
  "ctaText": "Learn More",
  "ctaUrl": "#",
  "imageUrl": "https://ik.imagekit.io/xvpgfijuw/uploads/lossless/imageRep__North-Sea-of-Data_eueEtdpFG.webp",
  "imageClasses": "image-mask",
  "maskHeight": "80%",
  "maskWidth": "120%"
}
```

## Key Learnings

1. **Percentage-Based Dimensions Need Context**: When using percentage values for dimensions, you need a reference container with a defined size. For heights, we used the text content's height as a reference.

2. **Flexible Configuration Through Props**: By adding optional props with sensible defaults, we created a component that can be configured through JSON data, making it highly reusable.

3. **Conditional JavaScript Execution**: We only run the JavaScript height matching when necessary (when using percentage heights or 'auto'), avoiding unnecessary DOM manipulation.

4. **Mobile-Responsive Considerations**: We implemented different behavior for mobile screens, using a fixed height to ensure consistent presentation on smaller devices.

5. **Centering Oversized Elements**: For mask widths greater than 100%, we needed to apply additional positioning styles to center the container properly.

## Best Practices for Future Implementation

1. **Default to Fixed Dimensions**: Use fixed dimensions (e.g., "300px") as defaults to ensure consistent behavior when specific values aren't provided.

2. **Document Special Values**: Make sure to document special values like 'auto' that trigger specific behaviors.

3. **Handle Edge Cases**: Always include checks for null or missing elements to prevent JavaScript errors.

4. **Consider Performance**: For components that might appear multiple times on a page, ensure the JavaScript is efficient and doesn't cause layout thrashing.

5. **Provide Clear CSS Classes**: Use descriptive class names (like 'image-mask') to make it clear when special behaviors are being applied.
