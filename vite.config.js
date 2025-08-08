import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'Petungan',
      formats: ['es', 'cjs', 'iife'],
      fileName: (format) => (format === 'iife' ? 'petungan.browser.min' : 'petungan.min'),
    },
    outDir: 'lib',
    emptyOutDir: false,
    sourcemap: true,
    minify: 'esbuild',
  },
});


