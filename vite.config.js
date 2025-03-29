import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative base path for compatibility with Cloudflare Pages
  base: './',
  build: {
    // Ensure CSS is properly handled as assets
    cssCodeSplit: true,
    // Improve compatibility
    target: 'es2015'
  }
}); 