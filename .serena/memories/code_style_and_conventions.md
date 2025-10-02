# Code Style and Conventions

## Vue Components
- **Composition API**: Use `<script setup>` syntax consistently
- **TypeScript**: All components use TypeScript with proper type annotations
- **Single File Components**: `.vue` files with template, script, and style sections

## Code Structure
- **Template First**: Template section at the top of Vue components
- **Script Setup**: Use `<script setup lang="ts">` for all components
- **Imports**: Organized with Vue imports first, then external libraries, then local imports
- **Component Naming**: PascalCase for component names and file names

## Styling Conventions
- **Tailwind CSS**: Utility-first approach with consistent class usage
- **Primary Color**: `bg-blue-700` and `text-blue-700` for brand colors
- **Spacing**: Consistent use of Tailwind spacing utilities (p-6, gap-6, etc.)
- **Responsive Design**: Mobile-first with `lg:` prefixes for desktop

## TypeScript Patterns
- **Type Imports**: Use type-only imports where appropriate
- **Reactive References**: Use `ref()` and `reactive()` from Vue
- **Component Props**: Define props with proper TypeScript interfaces
- **Event Handling**: Strongly typed event handlers

## Component Architecture
- **Reusable Components**: Located in `src/components/` and `src/components/ui/`
- **View Components**: Page-level components in `src/views/`
- **Composable Logic**: Shared logic in composable functions
- **Router Integration**: Use Vue Router with type-safe route definitions

## File Organization
- **Assets**: Static assets in `src/assets/`
- **Components**: Reusable components in `src/components/`
- **UI Components**: Design system components in `src/components/ui/`
- **Views**: Page components in `src/views/`
- **Router**: Route configuration in `src/router/`
- **Utils**: Utility functions in `src/lib/`

## Import Aliases
- **@/**: Resolves to `src/` directory for clean imports

## Naming Conventions
- **Components**: PascalCase (e.g., `DataTabs.vue`, `MultiSelect.vue`)
- **Variables**: camelCase (e.g., `selectedProject`, `availableDatasets`)
- **Constants**: UPPER_SNAKE_CASE for true constants
- **Files**: PascalCase for Vue components, camelCase for utilities