// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://your-name.netlify.app',
  build: {
    format: 'file',
  },
  prefetch: {
    prefetchAll: false,
  },
});
