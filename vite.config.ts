import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  build: {
    // The example app is normally only run via `vite dev`; build to its own
    // directory so it can never clobber the library build in dist/
    outDir: 'dist-example',
  },
});
