import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://jeff-belekotan.github.io',
  base: '/mon-blog',          // ← nom exact de ton repo GitHub
  integrations: [react(), tailwind(), mdx()],
});