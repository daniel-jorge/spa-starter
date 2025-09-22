++---
goal: "Integrate TanStack Router with TanStack Query (React Query) into the SPA starter"
version: "1.0"
date_created: "2025-09-22"
last_updated: "2025-09-22"
owner: "frontend-team"
status: 'Planned'
tags: ["feature","router","query","tanstack","integration"]
---

# Introduction

![Status: Planned](https://img.shields.io/badge/status-Planned-blue)

This plan documents a deterministic, step-by-step integration of TanStack Router and TanStack Query (React Query) into the existing React TypeScript SPA located at the repository root. The goal is to add routing and first-class server-state management with clear provider wiring, one example route using a data-fetching query, and tests and validation steps so the change is verifiable by automated systems or humans.

## 1. Requirements & Constraints

- **REQ-001**: Add runtime dependencies to enable TanStack Router and TanStack Query in a React v18+ TypeScript app.
- **REQ-002**: Wire providers at application root so all components can access router and query contexts.
- **REQ-003**: Keep changes minimal and opt-in: existing `App` component continues to exist and is used as a route layout.
- **SEC-001**: Do not introduce client secrets. All network requests must be example/demo-only or controlled by the environment.
- **CON-001**: This plan assumes a Vite/React/TypeScript project with `pnpm` available as package manager (confirmed by workspace files).
- **GUD-001**: Follow repository conventions: dashcase for new files, PascalCase for components, and place tests next to subject files.

## 2. Implementation Steps

All tasks are atomic and can be executed in parallel where noted. Each task includes file paths and exact changes to perform. Completion criteria are provided per phase and per task.

### Implementation Phase 1

- GOAL-001: Add dependencies and create shared QueryClient and Router wiring files.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-001 | Install packages: run `pnpm add @tanstack/react-query@^5 @tanstack/react-query-devtools@^5 @tanstack/router` and add types if necessary. (If package names differ in the ecosystem, see TASK-002 to verify before committing.) Completion criteria: `pnpm install` succeeds and packages appear in `package.json` and `pnpm-lock.yaml`. | | |
| TASK-002 | Verify package names and latest stable versions by running `pnpm info <package>` for each package above and by consulting `https://tanstack.com` docs. If `@tanstack/router` is not the correct package, replace with the official package name discovered. Completion criteria: package names resolved and recorded in the task comment in the commit. | | |
| TASK-003 | Create `src/lib/query-client.ts` with the exact export `export const queryClient = new QueryClient({...})` and a small default config. File path: `src/lib/query-client.ts`. Implementation details: import `QueryClient` from `@tanstack/react-query` and export a `queryClient` instance. Completion criteria: file exists and `queryClient` is importable. | | |
| TASK-004 | Create `src/router.tsx` to define routes and export `router` and `RouterProviderWrapper` components. File path: `src/router.tsx`. Implementation details: use the router package's route creation API to define a root route with `App` as the layout and a sample `HomeRoute` component that uses `useQuery` (see Phase 2). Export at least: `export const router = ...` and `export function RouterProviderWrapper({children}: {children: React.ReactNode}) { return <RouterProvider router={router}>{children}</RouterProvider> }`. Completion criteria: file exists and exports `router` and `RouterProviderWrapper`. | | |

Completion criteria for Phase 1: all files created (`src/lib/query-client.ts`, `src/router.tsx`), dependencies installed, and `pnpm install` passes locally.

### Implementation Phase 2

- GOAL-002: Wire providers at app entry, add one data-backed route using React Query, and add tests.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-005 | Update `src/index.tsx` to wrap the app with both Query and Router providers. Exact edit: replace the `root.render(<App />)` call so the tree is: `QueryClientProvider` (client from `src/lib/query-client.ts`) -> `RouterProvider` (from `src/router.tsx`) -> `App`. File path: `src/index.tsx`. Function names: none to change, only adjust render tree. Completion criteria: app starts without runtime errors and TypeScript compiles. | | |
| TASK-006 | Add a new route component `src/components/home/Home.tsx` that exports default function `Home()` and uses `useQuery` with `queryKey: ['demo','repo']` and a `queryFn` that fetches `https://api.github.com/repos/TanStack/query` as a deterministic example. Completion criteria: `Home` renders fetched `name` and `description` when route is visited in dev server. | | |
| TASK-007 | Add a small integration test `src/components/home/Home.test.tsx` that mounts the `RouterProviderWrapper` and `QueryClientProvider` and asserts that the `Home` route renders mocked data. Use Vitest + React Testing Library. File path: `src/components/home/Home.test.tsx`. Completion criteria: `pnpm run test` passes for the new test. | | |
| TASK-008 | Add optional: integrate React Query devtools for local development. Edit `src/index.tsx` to conditionally import and render `ReactQueryDevtools` when `import.meta.env.DEV` is true. Completion criteria: devtools appear in browser in dev server only. | | |

Completion criteria for Phase 2: app boots, the home route loads data via React Query, and tests pass locally.

## 3. Alternatives

- **ALT-001**: Use a lightweight router (React Router) instead of TanStack Router. Not chosen because the team prefers the TanStack API and tight integration with the query-focused work.
- **ALT-002**: Use a separate directory for providers `src/providers/*`. Not chosen to keep the minimal surface area and follow the project's simple layout.

## 4. Dependencies

- **DEP-001**: `@tanstack/react-query@^5` (runtime) — use v5 of TanStack Query (react-query)
- **DEP-002**: `@tanstack/react-query-devtools@^5` (dev, optional)
- **DEP-003**: `@tanstack/router` (runtime) — verify actual package name and stable version prior to install (TASK-002)
- **DEP-004**: `@types/*` packages not expected; TypeScript support is provided by packages where required.

## 5. Files

-- **FILE-001**: `src/lib/query-client.ts` — exports `queryClient` (QueryClient) with default staleTime and cacheTime.
- **FILE-002**: `src/router.tsx` — defines `router` and `RouterProviderWrapper` and registers a sample `Home` route that uses `useQuery`.
- **FILE-003**: `src/index.tsx` — edited to wrap the app with `QueryClientProvider` and the router provider.
- **FILE-004**: `src/components/home/Home.tsx` — new route component that demonstrates querying server data.
-- **FILE-005**: `src/components/home/Home.test.tsx` — tests for route+query integration.

## 6. Testing

-- **TEST-001**: Unit/integration test: `src/components/home/Home.test.tsx` — mounts the provider tree and mocks `fetch` using `vi.stubGlobal('fetch', ...)` to return a deterministic JSON; assert that `Home` renders the `name` and `description` from the mocked response.
- **TEST-002**: Smoke test: run `pnpm run dev` and navigate to `/` to confirm the `Home` route displays fetched data (or a network stub during local development).
- **TEST-003**: Lint/Typecheck: `pnpm run lint` and `pnpm run build` (if available). Completion criteria: no TypeScript errors introduced by edits.

Test commands to run locally (exact):

```
pnpm install
pnpm run test
pnpm run dev
```

Automated validation (CI) expectations:

- `pnpm run test` exits code 0
- `pnpm run lint` exits code 0 (if linter is run in CI)

## 7. Risks & Assumptions

- **RISK-001**: TanStack Router package name or API may have changed (observed partial doc redirects). Mitigation: TASK-002 verifies package names with `pnpm info` and official docs before committing.
- **RISK-002**: Router API surface differs across versions (e.g., route creation API shape). Mitigation: Pin the package version after confirming the correct usage, and include precise imports and usage examples in the commit message.
- **ASSUMPTION-001**: The project uses `pnpm` and the Node toolchain available in the repository attachments; the plan uses `pnpm` commands.
- **ASSUMPTION-002**: The `App` component will remain the layout root and accept children; the plan uses `App` as the router root element (see `src/app.tsx`).

## 8. Related Specifications / Further Reading

- TanStack Query docs (v5 install & React usage): https://tanstack.com/query/v5/docs/framework/react/overview
- TanStack Router docs: https://tanstack.com/router (verify correct subpath for version)

-- Implementation Notes / Example snippets (for engineers executing tasks):

- `src/lib/query-client.ts` (exact suggested contents):

```ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 2, cacheTime: 1000 * 60 * 10 },
  },
})
```

- `src/index.tsx` render tree (exact suggested change):

```tsx
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/router' // or the verified package name
import { queryClient } from './lib/queryClient'
import { router } from './router'

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
```

- `src/router.tsx` (high level example to adapt to exact API):

```tsx
import React from 'react'
import App from './app'
import Home from './components/home/Home'
import { createRouter, RouterProvider } from '@tanstack/router' // adapt to real API

export const router = createRouter({
  routes: [
    { path: '/', element: <App />, children: [{ path: '/', element: <Home /> }] },
  ],
})

export function RouterProviderWrapper({ children }: { children: React.ReactNode }) {
  return <RouterProvider router={router}>{children}</RouterProvider>
}
```

-- Validation Checklist (automatable):

1. `pnpm install` completes with dependencies present.
2. `pnpm run test` passes; the added test asserts `Home` renders mocked data.
3. Dev server (`pnpm run dev`) loads, navigates to `/`, and shows query results (or the demo fallback).

If any of the steps 1-3 fail, the responsible action is to inspect the failing command output, fix missing imports or update package names (likely RISK-001), and re-run the checks.

End of plan.
