import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setup-tests.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text"],
      exclude: ["src/env.d.ts", "src/index.tsx", "src/react-app-env.d.ts", "src/setup-tests.ts"],
      include: ["src/**"],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
