import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const posts = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		subTitle: z.string().optional(),
		// Transform string to Date object
		date: z.coerce.date(),
		updated: z.coerce.date().optional(),
		cover: z.string().optional(),
		category: z.string(),
		tags: z.array(z.string()),

	}),
});

export const collections = { blog, posts };
