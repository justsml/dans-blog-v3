import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory'
  },
  // build: {
  // 	inlineStylesheets: 'always',

  // },
  site: 'https://danlevy.net',
  integrations: [react(), mdx(), sitemap(), tailwind()]
  // prefetch: {
  // 	defaultStrategy: 'viewport', // 'hover',
  // }
});