---
title: Specification Development Guidelines & Template
lede: Comprehensive guidelines and template for creating clear, consistent, and maintainable technical specifications that work for both human and AI contributors.
date_authored_initial_draft: 2025-07-20
date_authored_current_draft: 2025-07-20
date_first_published: 
date_last_updated: 
at_semantic_version: 0.0.0.1
status: Active
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Guidelines
date_created: 2025-07-20
date_modified: 2025-07-20
site_uuid: c441b7e3-4ba5-4adb-accb-a475b6a70e4b
tags: 
  - Documentation
  - Specifications
  - Best-Practices
  - Contribution-Guide
authors:
  - Michael Staton
image_prompt: A modern, clean document template with structured sections, code examples, and visual diagrams, representing well-organized technical documentation.
category: Prompts
site_uuid: c441b7e3-4ba5-4adb-accb-a475b6a70e4b
tags: [Workflow]
authors:
  - Michael Staton
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/reminders/2025-05-05_portrait_image_Maintain-Consistent-Reporting-Templates_ae2415ec-f54a-48ba-85c2-eaee09d20716_4XNITJvCs.webp
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/reminders/2025-05-05_banner_image_Maintain-Consistent-Reporting-Templates_af226242-a4ff-424d-8702-a7ddbe27103e_vkNe8RMST.webp
---


# Specification Development Guidelines

## Purpose
These guidelines ensure specifications are clear, consistent, and valuable for both human contributors and AI systems. They are designed to:

1. **Standardize Documentation**: Create a consistent structure across all technical specifications
2. **Enable AI Assistance**: Make specifications easily parsable by AI systems for better code generation and analysis
3. **Facilitate Maintenance**: Make it easier to update and extend specifications over time
4. **Improve Onboarding**: Help new contributors understand the project's technical landscape

## When to Create a Specification
Create a specification when:

- Introducing a new major feature or system component
- Making significant architectural changes
- Documenting complex workflows or processes
- Establishing new patterns or standards
- When multiple implementation approaches need evaluation

## Specification Template

```markdown
---
title: Descriptive and Specific Title
lede: 1-2 sentence summary of what this specification covers and its primary goal.
date_authored_initial_draft: YYYY-MM-DD
date_authored_current_draft: YYYY-MM-DD
date_authored_final_draft: YYYY-MM-DD or empty
date_first_published: YYYY-MM-DD or empty
date_last_updated: YYYY-MM-DD or empty
at_semantic_version: 0.1.0
status: Draft | In-Review | Approved | Implemented | Deprecated
augmented_with: {{Tool used to assist with creation}}
category: Technical-Specification | RFC | Guidelines
date_created: YYYY-MM-DD
date_modified: YYYY-MM-DD
site_uuid: {{generate-uuid}}
tags: 
  - {{relevant-tag-1}}
  - {{relevant-tag-2}}
  - {{relevant-tag-3}}
authors:
  - {{Primary Author Name}}
image_prompt: {{Description of an appropriate image that represents the specification}}
---

# [Title]

## 1. Executive Summary
Briefly describe the problem being solved, the proposed solution, and its benefits. This should be understandable to both technical and non-technical stakeholders.

## 2. Background & Motivation
- What problem does this solve?
- Why is this important now?
- What are the current limitations or pain points?

### a) Reference Projects and Starter Code
- List any reference projects or starter code, using backlinks and paths.

### b) Nuances for Consideration
- List any nuances regarding technology stack choices, environment preferences, standards of development or output

### c) Constraints and Applicable Lessons Learned 
- Reference any reminders, standards, issue-resolutions, or any other documents that can provide helpful context to avoid pitfalls in developing for this specification.  Use backlinks and paths where relevant. 
- List any of the above not already developed in our documentation. 

## 3. Goals & Non-Goals
### Goals
- Clear, specific, and measurable objectives
- What success looks like

### Non-Goals
- What's explicitly out of scope
- Related but separate concerns

## 4. Technical Design
### High-Level Architecture
- System diagrams (Mermaid recommended)
- Component interactions
- Data flow

### Detailed Design
- API specifications
- Data models
- Algorithms
- Security considerations
- Performance implications

### Error Handling
- Expected error cases
- Recovery strategies
- Logging and monitoring

## 5. Implementation Plan
### Phases and Step by Step
1. **Phase 1**: Core functionality
	1.**Step 1**: Step one
	2. **Step 2**: Step two 
2. **Phase 2**: Extended features
	1. **Step 1**: Step one
	2. **Step 2**: Step two 
3. **Phase 3**: Optimization and polish

### Dependencies
- Internal/external systems
- Required resources

### Testing Strategy
- Unit tests
- Integration tests
- Performance tests

## 6. Alternatives Considered
- Other approaches that were considered
- Why they weren't chosen
- Trade-offs made

## 7. Open Questions
- Unresolved decisions
- Areas needing further research

## 8. Appendix
### Glossary
### References
### Revision History
```

## Best Practices

### For Humans
1. **Be Precise**: Use clear, unambiguous language
2. **Use Visuals**: Include [[Tooling/Software Development/Frameworks/Web Frameworks/Mermaid.js|Mermaid.js]] diagrams for complex systems
3. **Link to Code**: Reference specific files and line numbers when possible
4. **Keep It Updated**: Update the specification as the implementation evolves
5. **Review Process**: Have at least one other person review before finalizing

### For AI Prompts
When working with AI to generate or update specifications:

1. **Develop the Specification and Prompts** together. 
2. **Provide Context**: Include relevant background information
3. **Be Specific**: Clearly define the scope and requirements
4. **Use Examples**: Provide examples of similar specifications
5. **Iterate**: Review and refine AI-generated content
6. **Verify**: Always validate technical details against the codebase

### Version Control
- Use semantic versioning for specifications
- Update the status field as the specification progresses
- Keep a changelog of significant updates

## Review Process
1. **Draft**: Initial creation and internal review
2. **In-Review**: Open for team feedback
3. **Approved**: Ready for implementation
4. **Implemented**: Feature is complete
5. **Deprecated**: No longer current but kept for reference

## Examples
For reference, see these well-structured specifications:
- [Filesystem Observer for Consistent Metadata in Markdown Files](../../specs/Filesystem-Observer-for-Consistent-Metadata-in-Markdown-files.md)
- [Content Registry for Markdown Files](../../specs/Create-a-Content-Registry-for-Markdown-Files.md)

## Template Usage Instructions
1. Copy the template into a new file in the appropriate directory
2. Fill in the frontmatter with accurate metadata
3. Replace placeholder content with your specification
4. Delete or modify sections as needed for your specific case
5. Update the status as the specification progresses

## Maintenance
- Assign an owner to each specification
- Review specifications periodically for accuracy
- Archive or update deprecated specifications