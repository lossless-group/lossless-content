---
title: Create a Price Card
lede: Design and implement a responsive pricing card component with modern styling
date_authored_initial_draft: 2025-03-17
date_authored_current_draft: 2025-03-17
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Prompt
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-16
image_prompt: "A modern price card UI component with clear pricing tiers, feature checklists, and a prominent call-to-action button. The design uses soft gradients, clean lines, and visually distinct sections for each pricing option."
site_uuid: 553c54e2-ce52-4d8f-a472-91508466770d
tags:
  - User-Interface
  - UI-Elements
  - Pricing-Components
  - CSS
  - Responsive-Design
authors:
  - Michael Staton
banner_image: https://img.recraft.ai/45cFAgOhJgp43t1Vvc-g27z1C9nGyziDVsGOCCY5Krc/rs:fit:1024:2048:0/raw:1/plain/abs://external/images/23de3e25-7106-4333-a106-88c40cdceb86

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