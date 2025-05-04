---
title: 'Create a Dynamic Footer'
lede: 'Design and implement a modern, user-friendly dynamic footer interface that handles both code and content changes'
date_authored_initial_draft: 2025-04-19
date_authored_current_draft: 2025-04-19
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: In-Progress
augmented_with: 'Windsurf Cascade on Claude 3.5 Sonnet'
category: Prompts
date_created: 2025-04-19
date_modified: 2025-04-19
image_prompt: "A zoomed in view of a soccer shoe, the soccer player is kicking the soccer ball."
portrait_image: 'https://img.recraft.ai/79Yv2_9WeSPdRsu9dG2AEqwabenvwKFPfaisrswYPCM/rs:fit:1024:2048:0/raw:1/plain/abs://external/images/ad31f707-5948-4d0b-921d-44845bf0b1b3'
banner_image: 'https://img.recraft.ai/nnKIxsX_PMiYRFTUrO_XJNK9j4gv_2DQ93KYujN9JBQ/rs:fit:2048:1024:0/raw:1/plain/abs://external/images/119a68cd-1379-414b-b0c1-d65ca5c95260'
site_uuid: 2ab7ee71-fb2c-462d-a341-8f83a98f3d20
tags:
  - User-Interface
  - UI-Design
  - Navigation
authors:
  - Michael Staton
---

# Higher-Order Objective

Create a dynamic footer that is responsive and adaptive to the content of the page. 

It should have two divs, one that floats left and one that floats right.  

# Working File:

`site/src/components/basics/Footer.astro`

Other components will need to be created if we need them. 

# The Right Column

The right column should have a list of links, with the link text and the link path.

Use a similar JSON syntax to the 
`site/src/content/basics/.json` file.

```json
{
   "Column Header One": [
      "Link Label" : "Link Path",
      "Link Label" : "Link Path",
      "Link Label" : "Link Path"
   ],
   "Column Header Two": [
      "Link Label" : "Link Path",
      "Link Label" : "Link Path",
      "Link Label" : "Link Path"
   ]
}
```

Pull the columns in order from right to left.  

## The Left Column

The left column should have a flex column display, with two divs that are rows.  

### The Top Row

A flex row display, with divs that are filled with "social" icons.

It should also pull from a JSON file that contains the icons and their links, and dynamically generate as many icons as are in the file.

`site/src/content/basics/social-profiiles.json`

### The Bottom Row

A flex column display, with the company name, locations and addresses. Addresses should also be pulled from a JSON file.  

#### Locations:
`site/src/content/basics/orgLocations.json`
```json
{
   "company_name": "Company Name",
   "locations": [
      "Location 1": {
         "street": "123 Main St",
         "city": "City",
         "state": "State",
         "zip": "12345"
      },
      "Location 2": {
         "street": "123 Main St",
         "city": "City",
         "state": "State",
         "zip": "12345"
      }
   ]
}
```



***

# Implementation Details & Data Flow (Expanded)

## Data Loading
- The footer loads its link columns from `site/src/content/footer/footerLinks.json`.
- Social icons are loaded from `site/src/content/footer/socialIcons.json`.
- Both files should be structured for easy extensibility and localization.

## Example: footerLinks.json
```json
{
  "Resources": {
    "Docs": "/docs",
    "API Reference": "/api",
    "Support": "/support"
  },
  "Company": {
    "About Us": "/about",
    "Careers": "/careers",
    "Blog": "/blog"
  }
}
```

## Example: socialIcons.json
```json
[
  { "label": "Twitter", "icon": "/icons/twitter.svg", "url": "https://twitter.com/yourhandle" },
  { "label": "GitHub", "icon": "/icons/github.svg", "url": "https://github.com/yourorg" }
]
```

***

# Component Structure & Flow

- The footer component is composed of two main flex containers: left and right.
- **Right column:**
  - Iterates over each key in the loaded JSON (ordered right-to-left), rendering a header and its links.
  - Each link uses semantic anchor tags and is accessible.
- **Left column:**
  - Top row: Iterates over social icons, rendering each as a clickable icon with ARIA labels and alt text.
  - Bottom row: Reserved for copyright, tagline, or additional content (can be a slot or prop).

***

# Props & Extensibility

- The component should accept optional props for overriding the JSON file paths, enabling reuse in other contexts.
- All logic for mapping and rendering is handled in the script/frontmatter block, not hardcoded in the template.
- The component should be easily themeable via CSS variables or classes.

***

# Acceptance Criteria (Expanded)

- [ ] Footer renders all columns and links from the JSON file, in correct order.
- [ ] All social icons from the JSON file are rendered in the left column.
- [ ] No hardcoded links, icons, or column headers in the template.
- [ ] Fully responsive and visually modern.
- [ ] Passes accessibility checks (screen reader, keyboard nav, color contrast).
- [ ] All code is fully commented, with a summary of data flow at the top of the file.
- [ ] Additional content (e.g., tagline) can be slotted or passed as a prop.

***

# Example Data Flow Diagram

```text
Footer.astro (entry)
  → Loads footerLinks.json and socialIcons.json (content source)
    → Maps links and icons to columns/rows
      → Renders left and right columns
        → Final HTML output
```

***

# Notes for Remote Dev Team
- If any requirements are unclear or you identify edge cases, please document questions and propose enhancements before implementation.
- Follow project conventions for code style, file structure, and commenting. Do not introduce new dependencies without approval.
- Reference [Improve-on-a-User-Prompt-through-Iteration.md] for further prompt improvement guidance.
