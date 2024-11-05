import { defineConfig } from 'vite';

export default defineConfig({
  root: 'dist', // Set 'dist' as the root directory
  publicDir: '../public', // Keep publicDir outside 'dist'
  build: {
    outDir: 'dist', // Ensure build output goes to 'dist'
  },
});
