import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	// trailingSlash: 'always',
	// build: {
	// 	inlineStylesheets: 'always',

	// },
	site: 'https://danlevy.net',
	integrations: [mdx(), sitemap()],
	// prefetch: {
	// 	defaultStrategy: 'viewport', // 'hover',
	// }
});
