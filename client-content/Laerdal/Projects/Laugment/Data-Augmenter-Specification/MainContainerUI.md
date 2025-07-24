---
tags: [Specifications]
date_created: 2025-02-24
date_modified: 2025-07-24
---

## Purpose
The [[client-content/Laerdal/Projects/Laugment/Data-Augmenter-Specification/MainContainerUI|MainContainerUI]] dynamically loads [[Microfrontend Architecture|Microfrontends]] in a columnar layout. Each column functions as a Window, and the root directory uses a [[Module Federation]] library to load the Microfrontend "Apps" within these Windows. 

## Components
[[AppWindow]]


### Custom Components
[[OptionsBar]]


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
