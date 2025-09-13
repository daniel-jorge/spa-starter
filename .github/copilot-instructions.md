# Available tools

The following tools are available in this repository:

- [node v24](https://nodejs.org/) - Node engine
- [pnpm v10.8](https://pnpm.io/pnpm-cli) - PNPM package manager

# Available packages

The following packages are available in this repository:

- [React v19](https://reactjs.org/) - JavaScript library for building user interfaces
- [Biome v2](https://biomejs.dev/) - Code formatter and linter
- [Vitest v3](https://vitest.dev/) - Testing framework
- [React Testing Library v16](https://testing-library.com/docs/react-testing-library/intro/) - Testing utilities for React components
- [React Testing Library User Event v14](https://testing-library.com/docs/user-event/intro/) - Testing utilities for simulating user interactions
- [TypeScript v5.9](https://www.typescriptlang.org/) - Typed superset of JavaScript
# Available Commands

- Run the formatter (Biome) on a specific file: `pnpm run format -- path/to/file`
- Run the formatter (Biome) on all files: `pnpm run format`
- Run the linter (Biome) on a specific file: `pnpm run lint -- path/to/file`
- Run the linter (Biome) on all files: `pnpm run lint`
- Run all tests once: `pnpm run test`
- Run tests in watch mode: `pnpm run test:watch`
- Run tests with coverage: `pnpm run test:coverage`
- Run a specific test file: `pnpm run test -- path/to/test/file`
- Run the development server: `pnpm run dev`
- Build the project: `pnpm run build`
- Preview the production build: `pnpm run preview`

# Naming Conventions

- Use dashcase for folder names and file names.
- Use camelCase for variable and function names.
- Use PascalCase for component names.
- Use UPPER_SNAKE_CASE for constants.

# React Conventions

- Do not import React at the top of the file.
- Only use `.tsx` for React components.
- Name component files with the same name as the component.
- Use index files for exporting components from a folder.
- Use functional components only.
- Use arrow functions for event handlers and callbacks inside components.
- Use destructuring for props and state.
- Use PropsWithChildren for components that accept children.

# Typescript Conventions

- Use the nullish coalescing operator (??) for default values.
- Use template literals for strings that include variables.
- Use async/await for asynchronous code.
- Use the spread operator for arrays and objects.

# Testing Conventions

- Use Vitest as the testing framework.
- Use React Testing Library for testing React components.
- Use `jsdom` as the test environment for tests that involve the DOM.
- Do not use `@vitest-environment` comments at the top of test files.
- Put test files in the same folder as the file being tested.
- Name test files with the same name as the file being tested, with a `.test.tsx` extension.
- Use `describe` blocks to group related tests.
- Use `it` blocks for individual test cases.
- Use `beforeEach` and `afterEach` for setup and teardown.
- Use `screen` from React Testing Library to query elements.
- Use `userEvent` from React Testing Library for simulating user interactions.
- Use `expect` for assertions.
- Use React Testing Library matchers for assertions (e.g., `toBeInTheDocument`, `toHaveTextContent`).
- Use React Testing Library hook functions for testing hooks (e.g., `renderHook`).
