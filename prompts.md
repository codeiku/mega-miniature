# Project Prompts

This file tracks all prompts/assignments received for this project.

## Prompt 1 - Vue 3 SaaS Dashboard Application

Create a Vue 3 application using shadcn-vue components with the following specifications:

FRAMEWORK & STYLING:
- Vue 3 with Composition API and <script setup>
- shadcn-vue for UI components
- Tailwind CSS with bg-blue-700 as the primary brand color
- This is a front-end only app - mock all data and interactions

LAYOUT STRUCTURE:
Create a dashboard layout with:

1. LEFT SIDEBAR (fixed, ~240px wide):
   - App logo/icon and name at top
   - Primary navigation items: Data, Target, Impact, Report (with icons)
   - Secondary navigation: Agent, Studies (with "WIP" badges)
   - Settings and Admin at bottom (with "WIP" badges)
   - Help & support link at very bottom
   - Highlight active nav item with subtle background

2. MAIN CONTENT AREA:
   - Full height, fills remaining space
   - Divided into two sections:

   a) LEFT PANEL (~400px):
      - Section header with title and description
      - Stacked form elements:
        * 3 Select dropdowns (Project, Dataset, Timestamp column)
        * 2 Toggle switches with labels and helper text below
        * Primary blue button at bottom

   b) RIGHT PANEL (flex-1):
      - Empty state: centered database/cylinder icon, "No data selected" heading, instructional text

COMPONENT REQUIREMENTS:
- Use shadcn-vue Select, Switch, Button components
- Create reusable Sidebar and EmptyState components
- Add subtle hover states and transitions
- Include proper spacing and typography hierarchy
- Make it responsive (sidebar should collapse on mobile)

STYLING NOTES:
- Use blue-700 for primary actions and active states
- Neutral grays for text and borders
- Subtle shadows for depth
- Clean, professional aesthetic

Mock at least 5 items for each dropdown. Set up Vue Router with placeholder routes for each nav item.

**Additional note**: Use Serena and Context7 MCP servers to index the codebase and find the latest versions of open source packages and components.

## Prompt 2 - Vue 3 Admin Settings Panel

Create a Vue 3 admin settings panel using shadcn-vue components with the following specifications:

FRAMEWORK & STYLING:
- Vue 3 with Composition API and <script setup>
- shadcn-vue for UI components
- Tailwind CSS with bg-blue-700 as primary brand color
- Front-end only - mock all data and interactions

LAYOUT STRUCTURE:

1. PAGE HEADER:
   - Large heading "Admin Settings"
   - Gray subtitle text below

2. HORIZONTAL LAYOUT:
   - Left sidebar (~280px) with vertical tab navigation
   - Main content area (flex-1) with white background

3. LEFT SIDEBAR TABS:
   - Data management (database icon)
   - Create dataset (file-plus icon)
   - Processing (cog icon)
   Style: Active tab has subtle background, all tabs have icons and labels

4. TAB CONTENT:

   **Data Management Tab:**
   - Section header: "Data" with description and documentation link
   - Settings card with:
     * Dropdown: "Data Collection" with mock dataset options
     * Toggle: "Allow all datasets" with helper text
     * Toggle: "Allow upload" with helper text (csv, excel, parquet)
     * Toggle: "Force data-check" with helper text
     * Toggle: "Allow auto-prepare" with helper text
   - Blue-gray "Save" button at bottom

   **Create Dataset Tab:**
   - Section header: "Create Dataset" with description
   - Radio group or tabs to choose method:
     * Option 1: "Upload File"
     * Option 2: "Connect to Database"

   - When "Upload File" selected:
     * File upload dropzone (drag & drop)
     * Shows selected file name and size
     * "Configure" button when file selected

   - When "Connect to Database" selected:
     * Dropdown: "Connection name" with mock connections
     * Text input: "Database name"
     * "Test Connection" button
     * "Configure" button when connection valid

   - Column Mapping section (appears after Configure):
     * Dropdown: "Case ID" (required)
     * Dropdown: "Activity" (required)
     * Dropdown: "Timestamp" (required)
     * Checkbox: "Provide Sorting column?"
     * Checkbox: "Provide End Timestamp column?"
     * Conditional dropdown: "End Timestamp" (if checked)

   - "Build" button at bottom to create dataset

   **Processing Tab:**
   - Empty state: "Processing settings coming soon"

COMPONENT REQUIREMENTS:
- Use shadcn-vue: Select, Switch, Button, RadioGroup, Tabs, Input, Checkbox components
- Create Card components for settings groups
- Add proper form validation states
- Include hover states and smooth transitions
- Make the column mapping section appear conditionally after configuration step

STYLING NOTES:
- Use blue-700 for primary actions
- Gray-500 for descriptive text
- White cards with border-gray-200
- Consistent spacing (p-6 for cards, gap-6 between sections)
- Icons from lucide-vue-next

Mock data for dropdowns: 5+ items for datasets, connections, and column names. Use realistic mock data like "PA_datasets (1QgyxLLu)", "local_dku_pg", "Case ID", "Activity", "Timestamp", etc.

## Prompt 3 - Menu Navigation Update

Update the sidebar navigation menu with the following changes:

**Keep:**
- Data (existing functionality)

**Remove:**
- Target
- Impact
- Report
- Agent
- Studies

**Add:**
- Process (process mining features)
- Dashboard (analytics dashboard)
- Conformance (conformance checking)
- Explore (data exploration)

All new menu items should have placeholder views that can remain empty for now. Update router configuration accordingly and use appropriate Lucide icons for each menu item.

## Prompt 4 - Process Mining Implementation & Data Updates

Implement the following enhancements:

**Admin Menu:**
- Reduce admin menu width to 2/3 of current size

**Process Mining:**
- Install and implement vue-flow for process mining visualization
- Create interactive process flow graphs with mock data
- Implement different process flows for:
  * HR Cases (Submit Request → Initial Review → Manager Approval → HR Processing → Final Approval → Complete)
  * IT Cases (Create Ticket → Triage → Assign Tech → Investigation → Resolution → User Testing → Closed)
  * Customer Service Cases (Contact Received → Initial Response/Issue Analysis → Escalation → Resolution → Follow-up → Resolved)
- Include process statistics (total cases, average duration, variants, activities)
- Add dataset selector that dynamically changes the process flow
- Include zoom controls, minimap, and animated edges

**Dataset Updates:**
- Change dataset options from e-commerce to business process data:
  * HR Cases
  * IT Cases
  * Customer Service Cases
  * Leave Requests
  * Support Tickets
- Update all mock data throughout the application
- Make the Data view respond to dataset selection with relevant statistics and activity lists
- Update column names to process-oriented fields (case_created, event_timestamp, etc.)

**Technical Requirements:**
- All changes should be reactive - selecting different datasets should update content dynamically
- Use vue-flow with Background, Controls, and MiniMap components
- Custom node templates for start/end nodes and process activities
- Consistent styling with the existing design system

## Prompt 5 - Enhanced Process Mining & Direction Control

Enhance the process mining visualization with advanced process mining features and direction control:

**Process Graph Enhancements:**
- Add horizontal/vertical direction toggle for process flow layout
- Enhance process nodes with process mining specific design:
  * Frequency counters with colored badges
  * Average duration indicators
  * Throughput/completion rate metrics
  * Performance indicators (Excellent/Good/Average/Poor)
  * Bottleneck detection with visual alerts
  * Activity icons and enhanced styling
- Improve node design with:
  * Gradient backgrounds and enhanced shadows
  * Process mining terminology (Frequency, Duration, Throughput)
  * Performance bars with color coding
  * Hover effects and scaling animations
  * Bottleneck indicators with pulsing red alerts

**Direction Control:**
- Horizontal layout: Traditional left-to-right process flow
- Vertical layout: Top-to-bottom process flow
- Dynamic position calculation based on selected direction
- Reactive updates when direction changes

**Process Mining Focus:**
- Use proper process mining terminology throughout
- Display case frequencies prominently
- Show bottlenecks and performance issues visually
- Include process variants in sidebar with percentages
- Enhanced flow legend with color coding for case volumes
- Real-time performance monitoring indicators

**Technical Implementation:**
- Computed properties for dynamic positioning based on direction
- Helper functions for performance classification and color coding
- Bottleneck detection logic (activities with <80% completion rate)
- Enhanced node templates with process mining metrics
- Responsive design maintaining process mining best practices

## Prompt 6 - Project MultiSelect Enhancement

Update the Project dropdown in the Data view to support multiple project selection:

**Requirements:**
- Change single Project dropdown to MultiSelect component
- Allow users to select multiple projects simultaneously
- Update dataset filtering to combine datasets from all selected projects
- Maintain existing MultiSelect component design consistency
- Update validation logic for multiple project selection

**Technical Changes:**
- Convert `selectedProject` (string) to `selectedProjects` (string[])
- Update `projectOptions` to use `MultiSelectOption[]` type
- Enhance `availableDatasets` computed property to merge datasets from all selected projects
- Update helper text and labels to reflect multiple selection
- Maintain reactive clearing of datasets when project selection changes

## Prompt 7 - Remove Process Chart Animation

Remove the flowing animation effect from connecting lines in the process mining chart:

**Objective:**
- Eliminate the animated flow effect on process chart edges while preserving all other visual elements
- Maintain line styling (colors, thickness, etc.) and process chart functionality

**Implementation:**
- Locate all edge definitions in Process.vue vue-flow implementation
- Change all `animated: true` properties to `animated: false`
- Preserve line colors, thickness variations, and other visual indicators
- Ensure process nodes, metrics, and interactivity remain unchanged