// vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "./packages/jsx",
  },
  resolve: {
    alias: {
      "@": "./packages",
      "materialthing/core": "./packages/core/index.ts",
      "materialthing/jsx": "./packages/jsx/index.ts",
      "materialthing/ui": "./packages/ui/index.ts",
    },
  },
});
