import { resolve } from "node:path";
import { defineConfig } from "@rsbuild/core";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginTypedCSSModules } from "@rsbuild/plugin-typed-css-modules";

export default defineConfig({
  plugins: [
    pluginTypedCSSModules(),
    pluginReact(),
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
      babelLoaderOptions(opts) {
        opts.plugins?.unshift("babel-plugin-react-compiler");
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  html: {
    tags: [
      //   {
      //     tag: "script",
      //     attrs: {
      //       src: "https://cdn.jsdelivr.net/npm/react-scan/dist/auto.global.js",
      //     },
      //     append: false,
      //   },
    ],
  },
});
