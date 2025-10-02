# Task Completion Checklist

## Before Completing Any Task

### 1. Code Quality Checks
- **`npm run lint`** - Check and fix ESLint issues
- **`npm run format`** - Format code with Prettier  
- **`npm run build`** - Ensure production build succeeds

### 2. Functionality Testing
- **`npm run dev`** - Start dev server and test changes
- Navigate through affected routes and components
- Test responsive design on different screen sizes
- Verify all interactive elements work correctly

### 3. TypeScript Validation
- Check that all TypeScript errors are resolved
- Ensure proper type annotations are used
- Verify import statements are correct

### 4. Vue Component Validation
- Ensure all Vue components follow composition API patterns
- Check that reactive state updates correctly
- Verify component props and emits are properly typed

### 5. Git Workflow
- **`git status`** - Review changed files
- **`git add .`** - Stage changes (only when ready)
- **`git commit -m "descriptive message"`** - Commit with clear message
- Test the application once more after commit

### 6. Documentation Updates
- Update component documentation if new components added
- Ensure README reflects any new features or requirements
- Update any relevant configuration files

## Quality Standards
- All code must pass ESLint without warnings
- All code must be properly formatted with Prettier
- TypeScript must compile without errors
- Application must build successfully for production
- No console errors or warnings in development
- Responsive design must work on mobile and desktop

## Common Issues to Check
- Import paths are correct (using @/ alias)
- Tailwind classes are applied correctly
- Vue Router routes are properly configured
- Component state management is working
- Event handlers are properly bound
- Conditional rendering works as expected