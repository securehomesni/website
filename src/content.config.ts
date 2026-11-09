/**
 * CONTENT COLLECTIONS
 * Service, location and guide pages are Markdown files in src/content/.
 * Add a file and a page is created automatically at build time.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(), // H1 and link text, e.g. "CCTV installation"
    shortTitle: z.string(), // used in compact lists, e.g. "CCTV"
    summary: z.string(), // one or two sentences, shown on the homepage and service list
    metaTitle: z.string(),
    metaDescription: z.string().max(160),
    order: z.number().default(99),
    featured: z.boolean().default(false), // featured services get a larger row on the homepage
    placeholder: z.boolean().default(false), // true until real copy is supplied
  }),
});

const locations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/locations' }),
  schema: z.object({
    name: z.string(), // must match a town in site.areas to be linked from the homepage
    county: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string().max(160),
    intro: z.string(),
    nearby: z.array(z.string()).default([]),
    placeholder: z.boolean().default(false),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    placeholder: z.boolean().default(false),
  }),
});

export const collections = { services, locations, guides };
