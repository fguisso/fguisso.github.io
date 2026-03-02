import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { SUPPORTED_LOCALES } from './i18n/config';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			tags: z.array(z.string()).default([]),
			lang: z.enum(SUPPORTED_LOCALES),
			canonicalSlug: z.string(),
			series: z
				.object({
					slug: z.string(),
					title: z.string(),
					part: z.number().int().positive(),
				})
				.optional(),
		}),
});

export const collections = { blog };
