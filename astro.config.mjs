// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The live domain. Set SITE_URL in Cloudflare Pages (Settings → Environment variables)
// or change the fallback below. It drives canonical URLs, Open Graph URLs and the sitemap.
// PLACEHOLDER: replace example.co.uk with the real domain.
const SITE_URL = process.env.SITE_URL ?? 'https://www.example.co.uk';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/(thank-you|404)\/?$/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
