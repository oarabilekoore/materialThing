import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'index.ts',
    'css-manager.ts',
    'dom-manager.ts',
    'html-elements.ts',
    'state-manager.ts',
    'dom-router.ts'
  ],
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false, // Keep readable for debugging
  target: 'es2022',
  platform: 'browser',
})
