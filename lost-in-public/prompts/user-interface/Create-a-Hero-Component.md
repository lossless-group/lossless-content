---
title: Create a Hero Component
lede: Design and implement a modern, user-friendly hero component with gradient effects, responsive design, customizable content, and smooth scroll-based animations.
date_authored_initial_draft: 2025-04-12
date_authored_current_draft: 2025-04-12
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.2
status: In-Progress
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-16
image_prompt: "A bold hero section UI with a striking headline, vibrant call-to-action button, and an engaging background image. The design is modern, clean, and visually impactful, drawing attention to the main message in a web interface."
portrait_image: "https://img.recraft.ai/HqAvVYPmObtNvXwsXPiKLGpVdZPlV1tloh3e8L7-NfM/rs:fit:1024:1820:0/raw:1/plain/abs://external/images/ba739928-82a6-457c-bc34-845f1358c3c6"
site_uuid: 598c707d-1f50-4c15-87dd-e5ecaca93afd
tags:
  - User-Interface
  - UI-Design
  - User-Experience
  - Animations
authors:
  - Michael Staton
banner_image: https://img.recraft.ai/5Q2bbmTAjxPhZB6zuu_YwSOgTun5fY7T5BVB5Wp3OOg/rs:fit:1024:2048:0/raw:1/plain/abs://external/images/bc80b357-6312-4925-9f66-6d166c3dccdc
---

# Context

The hero component will serve as the primary visual element at the top of key pages in our Astro-based site. It should be visually striking while maintaining our brand identity and supporting dark mode. The component should include smooth, performant scroll-based animations that enhance the user experience.

## Design System Integration

### Existing Styles
Build on our established design system:
- `site/src/styles/global.css` - Contains base variables and typography
- `site/src/styles/lossless-theme.css` - Contains brand-specific colors and gradients
- `site/src/styles/animations.css` - Contains animation definitions (to be created)

### Color Palette & Gradients
- Primary brand gradient: `--grd--lossless-eastern-crimson: linear-gradient(107deg, #22A6B5 5.36%, #9138E0 23.14%, #D9233B 47.56%, #F59C49 72.33%);`
- Dark background: `--clr-lossless-primary-dark: var(--bastille);` (#19141D)
- Light text: `--clr-lossless-primary-light: var(--white-catskill);`
- Accent color: `--clr-lossless-accent--brightest: var(--cyan-aqua--brightest);`

### Typography
- Headings: `--ff-base: 'Poppins', sans-serif;`
- Body text: `--ff-legible: 'Krub', sans-serif;`
- Font weights: `--fw-regular: 200;`, `--fw-semi-bold: 400;`, `--fw-bold: 600;`

## Visual Effects

### Gradient & Glossy Effects
- Use the brand gradient as a background or border element
- Apply glass-like effects with semi-transparent overlays:
  - `--clr-lossless-primary-glass: hsla(184, 35%, 92%, .40);`
  - `--clr-lossless-primary-glass--lighter: hsla(184, 35%, 92%, .60);`
- Create depth with subtle shadows and layering
- Add glassmorphic styles with gradient blobs for visual interest

### Animation Effects
- Implement scroll-based animations using Intersection Observer API
- Support fade, slide, and zoom animations with configurable delays
- Add staggered animations for child elements
- Respect reduced motion preferences for accessibility

### Full-Bleed Elements
For elements that extend beyond the main content width:
```css
.full-bleed-element {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  overflow: hidden;
}
```

## Component Structure

### Inspiration Components
Study these existing components for implementation patterns:
- `site/src/components/basics/FeatureSideImage.astro` - For responsive layout patterns
- `site/src/components/basics/separators/ThinGradientBleedSeparator.astro` - For gradient effects
- `site/src/components/MainContent.astro` - For content structure and full-bleed patterns

### Layout Structure
Start with a two-column layout:
- Left column: Text content (heading, subheading, call-to-action)
- Right column: Visual element (image, animation, or decorative graphic)
- Mobile view: Stack vertically with text first, then visual

# Technical Requirements

## Component Interface

```typescript
interface Props {
  title: string;                // Main headline text
  subtitle?: string;            // Optional supporting text
  description?: string;         // Longer description paragraph
  ctaText?: string;             // Call-to-action button text
  ctaUrl?: string;              // Call-to-action button URL
  image?: {                     // Hero image (optional)
    src: string;
    alt: string;
  };
  backgroundStyle?: 'gradient' | 'dark' | 'glass' | 'glassmorphic' | 'glassmorphic-vivid'; // Background style options
  alignment?: 'left' | 'center';  // Text alignment
  fullBleed?: boolean;          // Whether to extend full width
  classes?: string;             // Additional CSS classes
  animate?: boolean;            // Whether to enable animations
}
```

## Animation System

### Animation CSS File
Create a file at `site/src/styles/animations.css` with the following structure:

```css
/**
 * Animation Styles for Lossless Components
 * 
 * This file contains CSS animations for components that use the animation utility.
 * It provides a set of animations that can be applied to elements using data-animate attributes.
 * 
 * The animations are triggered when the element enters the viewport and the animate-active class is added.
 */

/* Base animation setup - initially hidden */
[data-animate] {
  opacity: 0;
  transform: translate(0, 0) scale(1) rotate(0);
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.8s;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  [data-animate] {
    transition-duration: 0.1s;
  }
}

/* Animation active state - visible */
[data-animate].animate-active {
  opacity: 1;
  transform: translate(0, 0) scale(1) rotate(0) !important;
}

/* Fade animations */
[data-animate="fade-in"] {
  opacity: 0;
}

[data-animate="fade-up"] {
  opacity: 0;
  transform: translateY(30px);
}

[data-animate="fade-down"] {
  opacity: 0;
  transform: translateY(-30px);
}

[data-animate="fade-left"] {
  opacity: 0;
  transform: translateX(30px);
}

[data-animate="fade-right"] {
  opacity: 0;
  transform: translateX(-30px);
}

/* Zoom animations */
[data-animate="zoom-in"] {
  opacity: 0;
  transform: scale(0.9);
}

[data-animate="zoom-out"] {
  opacity: 0;
  transform: scale(1.1);
}

/* Slide animations */
[data-animate="slide-up"] {
  transform: translateY(100px);
}

[data-animate="slide-down"] {
  transform: translateY(-100px);
}

[data-animate="slide-left"] {
  transform: translateX(100px);
}

[data-animate="slide-right"] {
  transform: translateX(-100px);
}

/* Staggered animations for child elements */
[data-animate-stagger] > * {
  opacity: 0;
  transform: translateY(20px);
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.5s;
}

[data-animate-stagger].animate-active > *:nth-child(1) { transition-delay: 0.1s; opacity: 1; transform: translateY(0); }
[data-animate-stagger].animate-active > *:nth-child(2) { transition-delay: 0.2s; opacity: 1; transform: translateY(0); }
[data-animate-stagger].animate-active > *:nth-child(3) { transition-delay: 0.3s; opacity: 1; transform: translateY(0); }
[data-animate-stagger].animate-active > *:nth-child(4) { transition-delay: 0.4s; opacity: 1; transform: translateY(0); }
[data-animate-stagger].animate-active > *:nth-child(5) { transition-delay: 0.5s; opacity: 1; transform: translateY(0); }
```

### Animation Utility
Create a file at `site/src/utils/animationUtils.ts` with the following structure:

```typescript
/**
 * Simple Animation Utility for Scroll Animations
 * 
 * This utility provides basic scroll-based animations for components.
 * It's a lightweight alternative to AOS (Animate On Scroll) that doesn't
 * require external dependencies.
 * 
 * Usage:
 * 1. Add data-animate="fade-up|fade-in|slide-in" to elements
 * 2. Optionally add data-animate-delay="0.2" (in seconds)
 * 3. Call initAnimations() in your component's client script
 * 
 * @author Cascade on Claude 3.5 Sonnet
 * @module animationUtils
 */

// Animation class that will be added to elements when they enter viewport
const ANIMATION_ACTIVE_CLASS = 'animate-active';

// Options for the Intersection Observer
const observerOptions = {
  root: null, // Use the viewport as the root
  rootMargin: '0px', // No margin
  threshold: 0.1 // Trigger when 10% of the element is visible
};

// Store observer instance to prevent multiple observers
let observer: IntersectionObserver | null = null;

/**
 * Initialize animations for elements with data-animate attribute
 * 
 * @returns {void}
 */
export function initAnimations(): void {
  // Only run on the client
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  
  console.log('Initializing animations');

  // Disconnect existing observer if it exists
  if (observer) {
    observer.disconnect();
    observer = null;
  }

  // Get all elements with data-animate attribute
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  if (animatedElements.length === 0) {
    console.log('No animated elements found');
    return;
  }
  
  console.log(`Found ${animatedElements.length} elements to animate`);

  // Create observer
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If element is in viewport
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        const delay = element.dataset.animateDelay || '0';
        
        console.log(`Animating element with delay ${delay}s`, element);
        
        // Add animation after delay
        setTimeout(() => {
          element.classList.add(ANIMATION_ACTIVE_CLASS);
        }, parseFloat(delay) * 1000);
        
        // Unobserve after animation is triggered
        observer?.unobserve(element);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  animatedElements.forEach(element => {
    // Reset element state by removing active class
    element.classList.remove(ANIMATION_ACTIVE_CLASS);
    
    // Start observing
    observer?.observe(element);
  });
}

/**
 * Reset animations - useful for view transitions or dynamic content
 * 
 * @returns {void}
 */
export function resetAnimations(): void {
  // Only run on the client
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  
  console.log('Resetting animations');

  // Get all animated elements
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  // Remove animation class
  animatedElements.forEach(element => {
    element.classList.remove(ANIMATION_ACTIVE_CLASS);
  });
  
  // Re-initialize animations
  initAnimations();
}

// Initialize animations when the DOM is loaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initAnimations, 100);
    });
  } else {
    // DOM already loaded, run now with a small delay
    setTimeout(initAnimations, 100);
  }
  
  // Re-initialize on view transitions
  document.addEventListener('astro:page-load', resetAnimations);
  document.addEventListener('astro:after-swap', resetAnimations);
}
```

### Animation Wrapper Component
Create a file at `site/src/components/basics/AnimationWrapper.astro` with the following structure:

```astro
---
/**
 * AnimationWrapper.astro
 * 
 * A wrapper component that initializes animations for its children.
 * This component ensures that animations are properly initialized when the page loads.
 * 
 * @component
 * @example
 * ```astro
 * <AnimationWrapper>
 *   <div data-animate="fade-up">This will animate</div>
 * </AnimationWrapper>
 * ```
 */

// Define the component interface
interface Props {
  /**
   * Whether to enable animations
   * @default true
   */
  enabled?: boolean;
}

const { enabled = true } = Astro.props;
---

<div class:list={["animation-wrapper", { "animations-enabled": enabled }]}>
  <slot />
</div>

<script>
  // Import the animation utility
  import { initAnimations, resetAnimations } from '../../utils/animationUtils';
  
  // Initialize animations when the DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initAnimations, 100);
    });
  } else {
    // DOM already loaded, run now with a small delay
    setTimeout(initAnimations, 100);
  }
  
  // Re-initialize on view transitions
  document.addEventListener('astro:page-load', resetAnimations);
  document.addEventListener('astro:after-swap', resetAnimations);
</script>

<style>
  .animation-wrapper {
    display: contents; /* This makes the wrapper invisible in the DOM tree */
  }
</style>
```

## Data-Driven Configuration

### JSON Data Structure

Create a JSON file at `site/src/content/messages/heroContent.json` with the following structure:

```json
[
  {
    "id": "main-hero",
    "title": "Build Better Experiences",
    "subtitle": "With Lossless Components",
    "description": "Our component library helps you create beautiful, accessible interfaces with minimal effort.",
    "ctaText": "Get Started",
    "ctaUrl": "/docs",
    "imageUrl": "/visuals/Heroes/dashboard-example.png",
    "backgroundStyle": "gradient",
    "alignment": "left",
    "fullBleed": true
  },
  {
    "id": "features-hero",
    "title": "Powerful Features",
    "subtitle": "For Modern Developers",
    "description": "Take advantage of our cutting-edge tools to streamline your workflow and boost productivity.",
    "ctaText": "Explore Features",
    "ctaUrl": "/features",
    "imageUrl": "https://i.imgur.com/ueZ058L.png",
    "backgroundStyle": "glass",
    "alignment": "center",
    "fullBleed": false
  },
  {
    "id": "glassmorphic-hero",
    "title": "Modern Glassmorphic Design",
    "subtitle": "Subtle & Elegant",
    "description": "This style uses a dark background with subtle gradient blobs to create depth and visual interest while maintaining readability.",
    "ctaText": "Explore More",
    "ctaUrl": "/examples",
    "imageUrl": "/visuals/Heroes/dashboard-example.png",
    "backgroundStyle": "glassmorphic",
    "alignment": "left",
    "fullBleed": true
  },
  {
    "id": "glassmorphic-vivid-hero",
    "title": "Vibrant Glassmorphic Design",
    "subtitle": "Bold & Striking",
    "description": "This enhanced style combines our dark background with more prominent gradient elements for a bolder, more vibrant visual impact.",
    "ctaText": "See More Examples",
    "ctaUrl": "/examples",
    "imageUrl": "/visuals/Heroes/dashboard-example.png",
    "backgroundStyle": "glassmorphic-vivid",
    "alignment": "left",
    "fullBleed": true
  }
]
```

### Hero Loader Component

Create a component that loads hero content from JSON:

```typescript
// site/src/components/basics/HeroLoader.astro
interface HeroData {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  imageUrl?: string;
  backgroundStyle?: 'gradient' | 'dark' | 'glass' | 'glassmorphic' | 'glassmorphic-vivid';
  alignment?: 'left' | 'center';
  fullBleed?: boolean;
}

interface Props {
  /**
   * Path to the JSON file containing hero data, relative to src/content/
   * @example "messages/heroContent.json"
   */
  jsonPath: string;
  
  /**
   * ID of the specific hero to display from the JSON array
   * If not provided, the first hero in the array will be used
   */
  heroId?: string;
  
  /**
   * Additional CSS classes to apply to the hero
   */
  classes?: string;
  
  /**
   * Whether to enable animations
   * @default true
   */
  animate?: boolean;
}
```

## Animation Implementation in Hero Component

When implementing the Hero component, add animation attributes to elements:

```typescript
// Animation attributes based on animate prop
const animationAttributes = animate ? {
  'data-animate': 'fade-in',
  'data-animate-delay': '0'
} : {};

// Animation attributes for child elements
const titleAnimationAttributes = animate ? {
  'data-animate': 'fade-up',
  'data-animate-delay': '0.1'
} : {};

const subtitleAnimationAttributes = animate ? {
  'data-animate': 'fade-up',
  'data-animate-delay': '0.2'
} : {};

const descriptionAnimationAttributes = animate ? {
  'data-animate': 'fade-up',
  'data-animate-delay': '0.3'
} : {};

const ctaAnimationAttributes = animate ? {
  'data-animate': 'fade-up',
  'data-animate-delay': '0.4'
} : {};

const imageAnimationAttributes = animate ? {
  'data-animate': 'fade-in',
  'data-animate-delay': '0.5'
} : {};
```

Then apply these attributes to the HTML elements:

```astro
<section class={`hero ${containerClasses.join(' ')}`} {...animationAttributes}>
  <!-- Content -->
  <div class="hero-content">
    <div class="hero-text">
      {subtitle && <p class="hero-subtitle" {...subtitleAnimationAttributes}>{subtitle}</p>}
      <h1 class="hero-title" {...titleAnimationAttributes}>{title}</h1>
      {description && <p class="hero-description" {...descriptionAnimationAttributes}>{description}</p>}
      {hasCta && (
        <div class="hero-cta" {...ctaAnimationAttributes}>
          <a href={ctaUrl} class="hero-cta-button">{ctaText}</a>
        </div>
      )}
    </div>
    <!-- Image container -->
  </div>
</section>
```

## Responsive Behavior

- Mobile (< 768px): Single column, stacked layout
- Tablet (768px - 1024px): Two columns with reduced spacing
- Desktop (> 1024px): Two columns with ample spacing
- Ensure text remains readable at all viewport sizes
- Scale image proportionally to maintain aspect ratio

## Accessibility Considerations

- Maintain sufficient contrast between text and background
- Ensure all interactive elements are keyboard accessible
- Include proper ARIA attributes for screen readers
- Optimize for reduced motion preferences with media queries
- Provide option to disable animations via the `animate` prop

# Implementation Approach

1. Create the animation CSS file in `site/src/styles/animations.css`
2. Create the animation utility in `site/src/utils/animationUtils.ts`
3. Create the animation wrapper in `site/src/components/basics/AnimationWrapper.astro`
4. Create the base component in `site/src/components/basics/Hero.astro`
5. Create the data loader in `site/src/components/basics/HeroLoader.astro`
6. Create the JSON data file in `site/src/content/messages/heroContent.json`
7. Update `site/src/styles/global.css` to import the animations.css file
8. Create example usage in `site/src/pages/examples/hero.astro`
9. Document component with JSDoc comments

# Example Usage

## Direct Component Usage

```astro
<Hero
  title="Build Better Experiences"
  subtitle="With Lossless Components"
  description="Our component library helps you create beautiful, accessible interfaces with minimal effort."
  ctaText="Get Started"
  ctaUrl="/docs"
  image={{
    src: "/visuals/Heroes/dashboard-example.png",
    alt: "Dashboard interface example"
  }}
  backgroundStyle="glassmorphic"
  alignment="left"
  fullBleed={true}
  animate={true}
/>
```

## Data-Driven Usage with Animation Wrapper

```astro
<AnimationWrapper>
  <HeroLoader 
    jsonPath="messages/heroContent.json" 
    heroId="glassmorphic-hero" 
    animate={true}
  />
</AnimationWrapper>
```

# Desired Outcome

A visually striking, accessible, and responsive hero component that:
1. Showcases our brand identity with gradient effects and glassmorphic styles
2. Adapts seamlessly to different screen sizes
3. Supports various content configurations
4. Integrates with our existing design system
5. Features smooth, performant scroll-based animations
6. Respects accessibility best practices including reduced motion preferences
7. Is well-documented and easy to maintain
8. Can be configured through JSON data for easy content management
