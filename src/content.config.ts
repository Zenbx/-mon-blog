import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    readingTime: z.number().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = { blog };
