import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "static",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },

  site: "https://danlevy.net",
  integrations: [
    react(),
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: true,
			nesting: true,
			
    }),
  ],
  // prefetch: {
  // 	defaultStrategy: 'viewport', // 'hover',
  // }
});
