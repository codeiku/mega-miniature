# Mega Miniature - Project Overview

## Purpose
Mega Miniature is a Vue 3 SaaS dashboard application designed for process mining and business process analysis. The application provides data visualization, process flow analysis, conformance checking, and dashboard analytics for business processes like HR cases, IT support tickets, and customer service workflows.

## Tech Stack
- **Frontend Framework**: Vue 3 with Composition API and `<script setup>` syntax
- **Build Tool**: Vite 5.4.8
- **UI Components**: shadcn-vue component library
- **Styling**: Tailwind CSS with custom configuration
- **Routing**: Vue Router 4.4.5
- **Icons**: Lucide Vue Next for consistent iconography
- **Process Visualization**: Vue Flow for interactive process mining diagrams
- **Type Safety**: TypeScript 5.6.3

## Application Structure
The app follows a sidebar navigation layout with:
- Fixed left sidebar (64px on large screens) with primary navigation
- Main content area with route-based views
- Responsive design with mobile menu toggle
- Primary brand color: blue-700

## Key Features
1. **Data Selection**: Multi-dataset selection with project filtering
2. **Process Mining**: Interactive process flow visualization with vue-flow
3. **Dashboard Analytics**: Business process metrics and KPIs
4. **Conformance Checking**: Process conformance analysis
5. **Data Exploration**: Advanced data discovery tools
6. **Admin Settings**: Data management and configuration
7. **Settings Panel**: Application configuration

## Navigation Structure
- **Data**: Dataset selection and configuration
- **Process**: Process mining visualization and analysis
- **Dashboard**: Analytics and reporting
- **Conformance**: Process conformance checking
- **Explore**: Data exploration tools
- **Settings**: Application settings (WIP)
- **Admin**: Administrative functions (WIP)