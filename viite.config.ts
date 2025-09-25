import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "./packages/jsx",
  },

  resolve: {
    alias: {
      "@core": resolve(__dirname, "packages/core"),
      "@ui": resolve(__dirname, "packages/ui"),
      "@jsx": resolve(__dirname, "packages/jsx"),
      // Add this alias to help with JSX imports
      packages: resolve(__dirname, "packages"),
    },
  },

  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true,
    },
  },

  build: {
    target: "es2022",
    outDir: "dist",
  },
});
