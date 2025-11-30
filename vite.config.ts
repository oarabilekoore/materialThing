import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  esbuild: {
    // 1. This connects your JSX to your custom runtime
    jsx: "automatic",
    jsxImportSource: "@materialthing/jsx",
  },
  resolve: {
    alias: {
      // 2. Map the package names to their actual folder locations
      // We point 'jsx' to the directory so imports like '@materialthing/jsx/jsx-runtime' work
      "@materialthing/jsx": path.resolve(__dirname, "packages/jsx"),

      // Point 'core' and 'ui' to their index files (or directories if you prefer)
      "@materialthing/core": path.resolve(__dirname, "packages/core/index.ts"),
      "@materialthing/ui": path.resolve(__dirname, "packages/ui/index.ts"),

      // 3. Keep a generic alias for the packages folder if you need it
      "@": path.resolve(__dirname, "packages"),
    },
  },
});
