# Application Architecture

## Overall Structure
Mega Miniature is a single-page application (SPA) built with Vue 3, following a component-based architecture with clear separation of concerns.

## Directory Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Design system components (shadcn-vue)
│   ├── Sidebar.vue     # Main navigation component
│   └── EmptyState.vue  # Empty state component
├── views/              # Page-level components (routes)
│   ├── Data.vue        # Data selection and configuration
│   ├── Process.vue     # Process mining visualization
│   ├── Dashboard.vue   # Analytics dashboard
│   ├── Conformance.vue # Conformance checking
│   ├── Explore.vue     # Data exploration
│   ├── Settings.vue    # Application settings
│   └── Admin.vue       # Admin panel
├── router/             # Vue Router configuration
├── lib/                # Utility functions and helpers
├── assets/             # Static assets
├── App.vue             # Root component
├── main.ts             # Application entry point
└── style.css           # Global styles
```

## Component Hierarchy
```
App.vue
├── Sidebar.vue (navigation)
└── router-view (dynamic content)
    ├── Data.vue
    │   ├── Select components
    │   ├── MultiSelect.vue
    │   └── Various UI components
    ├── Process.vue
    │   └── Vue Flow components
    ├── Dashboard.vue
    ├── Conformance.vue
    ├── Explore.vue
    ├── Settings.vue
    └── Admin.vue
```

## Data Flow
1. **Mock Data**: All data is mocked at component level
2. **Reactive State**: Vue 3 reactive state management
3. **Route-based Views**: Each major section is a route
4. **Component Communication**: Props down, events up pattern

## Key Design Patterns
- **Composition API**: All components use `<script setup>`
- **TypeScript First**: Strong typing throughout
- **Utility-First CSS**: Tailwind CSS for styling
- **Component Library**: shadcn-vue for consistent UI
- **Responsive Design**: Mobile-first approach

## Business Domain Focus
The application is specifically designed for process mining and business process analysis:
- **Process Datasets**: HR Cases, IT Cases, Customer Service Cases
- **Process Mining**: Flow visualization with vue-flow
- **Analytics**: Business process metrics and KPIs
- **Conformance**: Process compliance checking
- **Data Management**: Dataset configuration and management