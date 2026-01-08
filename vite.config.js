import { defineConfig } from 'vite';
import htmlInject from 'vite-plugin-html-inject';

export default defineConfig({
  root: 'src',
  publicDir: '../public', // We might not need this if we put everything in src/assets, but good practice
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [
    htmlInject(),
  ],
});
