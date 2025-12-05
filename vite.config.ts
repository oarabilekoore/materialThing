import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "@materialthing/jsx",
  },
  resolve: {
    alias: {
      "@materialthing/jsx": path.resolve(__dirname, "packages/jsx"),
      "@materialthing/core": path.resolve(__dirname, "packages/core/index.ts"),
      "@materialthing/react": path.resolve(
        __dirname,
        "packages/react/index.ts"
      ),
      react: "@materialthing/react",
      "react-dom": "@materialthing/react",
      "@": path.resolve(__dirname, "packages"),
    },
  },
});
