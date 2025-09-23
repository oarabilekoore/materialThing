import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "./packages/jsx/jsx-runtime",
  },
  resolve: {
    alias: {
      "@core": "/packages/core",
      "@ui": "/packages/ui",
      "@jsx": "/packages/jsx",
    },
  },
});
