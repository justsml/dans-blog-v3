import { defineCollection, z } from "astro:content";

// const blog = defineCollection({
// 	type: 'content',
// 	// Type-check frontmatter using a schema
// 	schema: z.object({
// 		title: z.string(),
// 		description: z.string(),
// 		// Transform string to Date object
// 		pubDate: z.coerce.date(),
// 		updatedDate: z.coerce.date().optional(),
// 		heroImage: z.string().optional(),
// 	}),
// });

const category = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: () =>
    z.object({
      category: z.string(),
    })
});

const posts = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subTitle: z.string().optional().default(""),
      // Transform string to Date object
      // date: z.coerce.date(),
      // modified: z.coerce.date().optional(),

      date: z.coerce.string(),
      modified: z.coerce.string().optional(),
      cover: image(), // z.string().optional(),
      cover_mobile: image().optional(),
      cover_tablet: image().optional(),
      cover_desktop: image().optional(),
      cover_imgs: z.object({
        mobile: image().optional(),
        tablet: image().optional(),
        desktop: image().optional(),
      }).optional(),
      
      category: z.string(),
      subCategory: z.string().optional(),

      tags: z.array(z.string()),

      popularity: z.number().min(0).max(1.0).optional(),
      // `related` is a list of post slugs
      related: z.array(z.string()).optional(),

    }),
});

export const collections = { posts, category };
