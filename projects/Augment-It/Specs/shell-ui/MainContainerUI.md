---
tags: [Specifications, Microfrontends]
date_created: 2025-03-02
date_modified: 2025-07-25
site_uuid: d1a829ee-a6ae-496d-bcd5-252a1000600e
publish: true
title: MainContainerUI
slug: main-container-ui
at_semantic_version: 0.0.0.1
lede: The `shell` that creates the windows for other apps to be loaded into.
---

## Purpose
The [[projects/Augment-It/Specs/shell-ui/MainContainerUI|MainContainerUI]] dynamically loads [[Microfrontend Architecture|Microfrontends]] in a columnar layout. Each column functions as a Window, and the root directory uses a [[Vocabulary/Module Federation]] library to load the Microfrontend "Apps" within these Windows. 

###### Barebones Layout
As of February 21st, 2025
![MainContainerUI as of February 21st, 2025](https://i.imgur.com/v4QVUkM.gif)

## Components
[[projects/Augment-It/Specs/shell-ui/AppWindow|AppWindow]]
[[projects/Augment-It/Specs/shared-ui-elements/SharedHeader|SharedHeader]]




### Custom Components
[[OptionsBar]]
[[SharedLeftPanel]]
[[SharedRightPanel]]

### Shared Components


```mermaid
graph LR

class Main internal-link;
class RecordCollector internal-link;
class PromptManager internal-link;
class PromptReviewer internal-link;
class ResponseCollector internal-link;
class HighlightCollector internal-link;
class InsightManager internal-link;

click Main "obsidian://vault/00%20-%20Lossless-at-Laerdal%20Gameplan%2F04.1%20-%20AI%20to%20Insight%20Specifications%2FMainContainerUI";

Main[[MainContainerUI]] --> RecordCollector[[RecordCollector]]
Main[[MainContainerUI]] --> PromptManager[[PromptManager]]
Main[[MainContainerUI]] --> PromptReviewer[[PromptReviewer]]
Main[[MainContainerUI]] --> ResponseCollector[[RecordCollector]]
Main[[MainContainerUI]] --> HighlightCollector[[HighlightCollector]]
Main[[MainContainerUI]] --> InsightManager[[InsightManager]]


```

```mermaid
sequenceDiagram 

participant RecordCollector
participant PromptManager
participant PromptReviewer
participant ResponseCollector
participant HighlightCollector
participant InsightManager 


RecordCollector-->>PromptManager: selectedRecords
PromptManager-->> PromptReviewer: selectedPrompts
PromptReviewer-->> ResponseCollector: apiCallResponseObjects
Note right of PromptReviewer: AI Model LLM APIs<br/>AI Web Scraper APIs
ResponseCollector-->> HighlightCollector: responseObjectContents 
HighlightCollector-->>InsightManager: highlightsList
```
