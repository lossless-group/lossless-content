---
tags: [Specifications]
date_created: 2025-02-24
date_modified: 2025-04-10
---

## Purpose
The [[client-content/Laerdal/Projects/Laugment/04.1 - AI to Insight Specifications/RecordCollector]] is a [[Microfrontend Architecture|Microfrontend]] that gives users the ability to upload, import, or connect to data sources. 
## Components
### Custom Components
[[RecordPropertiesTable]]

### Shared Components
[[SearchContainer]]
[[FilterContainer]]
[[client-content/Laerdal/Projects/Laugment/04.1 - AI to Insight Specifications/shared/ModalWrapper]]

# RecordCollector Remote (Federated Microfrontend)

The RecordCollector remote microfrontend is the entry point of the Data Augmenter application, responsible for displaying and managing customer records. This component provides a comprehensive interface for viewing, searching, importing, and deleting records.

## Component Structure and Functionality

The RecordCollector remote is a React functional component that:

1. **Displays a list of customer records** from the application's state
2. **Provides search functionality** to filter records by name
3. **Allows importing records** from CSV files
4. Allows connecting to data sources through API, through a DataSourceConnector component. 
5. **Enables deletion** of individual records or all records at once
6. **Integrates with the data model configuration** system

## Key Features in Detail

### State Management

The component uses Zustand for state management, accessing several state variables and functions:

- `records`: Array of customer records
- `selectedRecord`: Currently selected record
- `setSelectedRecord`: Function to update the selected record
- `addRecords`: Function to add new records
- `deleteRecord`: Function to delete a specific record
- `deleteAllRecords`: Function to delete all records

### UI Elements

The component renders:

- Components either use @laerdal components or recreate them using Stylex, consistent with the @laerdal design tokens.   
- A header section with the title "Records" and action buttons
- A search input field with a search icon
- A scrollable list of records or an empty state message
- Modal dialogs for import and delete confirmation

### Record Display

Each record is displayed as a card showing:

- The record name as the primary identifier
- Additional record properties as secondary details
- A delete button for removing the record

### Search Functionality

The search feature:

- Filters records based on the name property
- Updates in real-time as the user types
- Is case-insensitive for better user experience

## Data Sources Toolbar

The `DataSourceToolbar` is a single bar, from 24px to 48px high, with a `DataSourceConnector` aligned left, and a `DataSourceImporter` aligned right. 
### CSV Import System

The `DataSourceImporter` import functionality:

- Opens a `DataImportModal` dialog with instructions
- Accepts CSV files with specific formatting requirements
- Parses CSV data with proper handling of quoted fields
- Validates that the CSV contains a required 'name' column
- Converts appropriate values to numbers when possible
- Generates unique IDs for new records
- Adds the parsed records to the application state

### Data Source Connector System

The `DataSourceConnector` functionality:
- Opens a `DataConnectModal` dialog with instructions
-  Accepts API specifications, such as an provider name, provider url, API key, url formatter (must include interpolated variables), and example API connection code (in JavaScript). 
	- Saves provider with a favicon and appIcon if possible (for display elegance)
	- Accepts SQL and GraphQL queries that can specify data to be imported. 
- Parses data from the response.
- Validates that the CSV contains a required 'name' column
- Converts appropriate values to numbers when possible
-  Generates unique IDs where there is none
-  Adds the parsed records to the application state




### Deletion Capabilities

The component provides two deletion options:

- Individual record deletion with a direct button click
- Bulk deletion of all records with a confirmation dialog

### Data Model Integration

The component connects to the data model system through:

- An "Open Data Model" button that triggers the parent component's callback
- This allows users to define computed properties based on record data

## Technical Implementation Details

### CSV Parsing Logic

The component includes a sophisticated CSV parsing function that:

- Handles quoted fields correctly (including embedded commas)
- Manages escaped quotes within quoted fields
- Properly splits CSV lines into individual values

### Modal Dialogs

The component implements two modal dialogs:

- Import Records modal with detailed instructions
- Confirm Delete modal with warning about irreversible actions

### Responsive Design

The UI is designed to be responsive with:

- Flexible layouts using Tailwind CSS
- Proper overflow handling for the record list
- Clear visual hierarchy for information display

### Error Handling

The component includes error handling for:

- CSV parsing errors
- Missing required columns
- Database operation failures

## Integration with Other Rmotes

The RecordCollector

- Communicates with the parent component through the `onOpenDataModel` prop
- Interacts with the global state to update selected records
- Works in conjunction with other components like DataModelModal

This component serves as the primary interface for managing customer data in the application, providing a robust set of features for data manipulation while maintaining a clean and intuitive user experience.

