---
date_created: 2025-02-24
date_modified: 2025-08-08
tags: [Specifications, Prompt-Engineering, Best-Practices, Implementation, React-Ecosystem]
site_uuid: a9719dbc-fac9-4ae4-8694-45c4b2cf5392
publish: true
title: PromptManager
slug: prompt-manager
at_semantic_version: 0.1.0.0
status: Implemented
---

## Purpose
The PromptManager is a comprehensive Next.js-based web application that provides functionalities to allow users to upload prompts, author new ones, and insert _managed variables_ using a modern, responsive interface. The application supports variable templating with `{{variable_name}}` syntax and provides advanced features for prompt management and iteration.

> The **_initial use case_** is using the RecordCollector to pull records from the CRM system about customers.  

This data may be mediated through DataBricks (or another data aggregator service).

The PromptManager empowers users to **select, generate, and iterate** on _meaningful_ prompts likely to have the best results. These prompts specifically make easy the addition of _fields as variables_ to allow the generation of customer specific prompts from a template. 

The Prompt Manager enables users to select the most appropriate prompt to send to the RequestReviewer. 

After processing, the system can interact with existing services like AI-Powered Search models and AI Powered Data Capture techniques, such as using AI Web Crawlers and Web Scrapers through their respective APIs. This integration ensures that the prompt execution can leverage realtime search capabilities and augment customer data effectively.

**Future API Integrations:**
- AI Search Model: An API endpoint (REST or WebSocket) to send prompts and receive search results.
- Web Crawler Service: An API endpoint for triggering web crawls based on provided parameters (e.g., target URLs, variables).


## Core Functionality

The PromptManager provides users with the following tools:

### 1. Prompt Creation and Management
- **Create prompts with variables** using `{{variable_name}}` syntax
- **Rich text editor** with markdown support using @uiw/react-md-editor
- **Automatic variable extraction** from prompt content using regex patterns
- **Variable management interface** with real-time validation
- **Upload markdown files** with automatic parsing and variable detection
- **Save prompt templates** with validation and metadata tracking

### 2. Advanced Features
- **Custom Properties System** for generating structured JSON output from LLM responses
- **Multi-format Export** (JSON, Markdown, CSV) with ZIP bundling
- **Import System** for markdown files with automatic metadata extraction
- **Search and Filter** functionality across name, description, and category
- **Statistics and Analytics** display for prompt usage tracking
- **Bulk Operations** for managing multiple prompts

### 3. User Interface
- **Modern, responsive design** using Tailwind CSS
- **Modal-based workflows** for create, edit, import, and export operations
- **Splash screen** with animated welcome interface
- **Real-time search** with instant filtering
- **Confirmation dialogs** for destructive operations

### 4. Data Management
- **Prompt Validation:** Ensures prompts are syntactically correct and adhere to security guidelines
- **Variable Mapping:** Automatically extracts and manages variables from prompt templates
- **Metadata Tracking:** Records creation date, last used date, and usage count
- **Error Handling:** Comprehensive error collection and user feedback

### 5. Export/Import Capabilities
- **Export Formats:** JSON, Markdown, CSV with optional metadata inclusion
- **Import Support:** Markdown files with automatic title and variable extraction
- **ZIP Bundling:** Multi-file exports with organized structure
- **Remote Integration:** Framework for future API integrations 
## Technical Architecture

### Technology Stack
- **Framework:** Next.js 15.4.4 with React 19.1.0
- **Styling:** Tailwind CSS 4 for responsive design
- **Icons:** Lucide React for consistent visual language
- **Markdown Editor:** @uiw/react-md-editor for rich text editing
- **File Processing:** JSZip for multi-format export bundling
- **Development:** ESLint 9, PostCSS 4

### Component Structure

#### Core Components
- **PromptManager.js** (265 lines) - Main application orchestrator with state management
- **PromptCard.js** (169 lines) - Individual prompt display with actions
- **CreatePromptModal.js** (249 lines) - Form-based prompt creation interface
- **EditPromptModal.js** (265 lines) - In-place prompt editing with validation
- **CustomPropertiesSection.js** (138 lines) - Advanced properties for structured output

#### Data Management Components
- **ExportModal.js** (580 lines) - Multi-format export with ZIP bundling
- **ImportModal.js** (386 lines) - Markdown file import with automatic parsing
- **DeleteConfirmModal.js** (55 lines) - Confirmation dialogs for destructive operations

#### UI Components
- **SearchBar.js** (20 lines) - Real-time search functionality
- **StatisticsSection.js** (59 lines) - Usage analytics and metrics display
- **ActionHeader.js** (40 lines) - Action buttons and bulk operations
- **Navigation.js** (18 lines) - Navigation component
- **SplashScreen.js** (144 lines) - Welcome screen with animations

#### Layout Components
- **layout.js** (17 lines) - Root layout with metadata
- **page.js** (21 lines) - Main page with splash screen integration
- **globals.css** (144 lines) - Global styling and animations

### Data Flow
- **Centralized State:** Main state management in PromptManager component
- **Prop Drilling:** Unidirectional data flow to child components
- **Event Handling:** Consistent callback patterns across all modals
- **File Operations:** Asynchronous processing with progress indicators

### Variable System
- **Syntax:** `{{variable_name}}` pattern for template variables
- **Extraction:** Automatic regex-based variable detection
- **Validation:** Real-time syntax validation and error feedback
- **Management:** Interface for adding and removing variables

### Export/Import System
- **Formats:** JSON, Markdown, CSV with metadata options
- **Bundling:** ZIP archive creation for multi-file exports
- **Parsing:** Intelligent markdown file parsing with metadata extraction
- **Validation:** File format validation and error handling

## Implementation Status

### ✅ Completed Features
- **Core Application:** Fully functional Next.js application with all CRUD operations
- **Variable System:** Complete variable templating with `{{variable_name}}` syntax
- **Rich Text Editor:** Markdown editor integration with syntax highlighting
- **Export/Import:** Multi-format export and markdown import functionality
- **Search & Filter:** Real-time search across all prompt fields
- **Custom Properties:** Advanced structured output generation
- **Responsive UI:** Modern, mobile-friendly interface
- **Error Handling:** Comprehensive validation and user feedback

### 🔄 Future Enhancements
- **API Integration:** Connect with RecordCollector for dynamic variable mapping
- **Real-time Collaboration:** Multi-user editing and version control
- **Advanced Analytics:** Detailed usage statistics and performance metrics
- **Template Library:** Pre-built prompt templates for common use cases
- **AI Integration:** Direct integration with AI models for prompt testing
- **Workflow Automation:** Integration with RequestReviewer and other services
- **Advanced Security:** Role-based access control and audit logging

### 📋 Technical Debt
- **State Management:** Consider migration to Redux or Zustand for complex state
- **Testing:** Add comprehensive unit and integration tests
- **Performance:** Implement virtual scrolling for large prompt collections
- **Accessibility:** Enhance ARIA compliance and keyboard navigation



