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