import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import App from "./app";
import Home from "./components/home/Home";

// Create the root route
const rootRoute = createRootRoute({
  component: App,
});

// Create the home route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

// Create the route tree
const routeTree = rootRoute.addChildren([indexRoute]);

// Create the router
export const router = createRouter({ routeTree });

// Declare the router instance for TypeScript
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
