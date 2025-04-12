---
title: 'Create a Price Card'
lede: 'Design and implement a responsive pricing card component with modern styling'
date_authored_initial_draft: 2025-03-18
date_authored_current_draft: 2025-03-18
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: '0.0.0.1'
authors: 
- Michael Staton
status: To-Prompt
augmented_with: 'Windsurf Cascade on Claude 3.5 Sonnet'
category: Prompts
tags:
- User-Interface
- UI-Elements
- Pricing-Components
- CSS
- Responsive-Design
date_created: 2025-03-18
date_modified: 2025-04-11
---
# Inspiration Set
A [[Pricing Card]] from [[GNews]] found at https://gnews.io/#pricing
```css
card--price: {
    display: flex;
    cursor: pointer;
    flex-direction: column;
    overflow: hidden;
    border-radius: .5rem;
    border-width: 1px;
    --tw-border-opacity: 1;
    border-color: rgb(210 212 237 / var(--tw-border-opacity));
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
    transition-property: color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;
    transition-property: color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;
    transition-property: color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;
    transition-duration: .15s;
    transition-timing-function: cubic-bezier(.4,0,.2,1);
}
