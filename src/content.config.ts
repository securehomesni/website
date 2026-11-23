/**
 * CONTENT COLLECTIONS
 * Service and location pages are Markdown files in src/content/.
 * Add a file and a page is created automatically at build time.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: ({ image }) => z.object({
    title: z.string(), // H1 and link text, e.g. "CCTV installation"
    shortTitle: z.string(), // used in compact lists, e.g. "CCTV"
    summary: z.string(), // one or two sentences, shown on the homepage and service list
    metaTitle: z.string(),
    metaDescription: z.string().max(160),
    order: z.number().default(99),
    featured: z.boolean().default(false), // featured services get a larger row on the homepage
    // Service page hero: a photo (path relative to this file) and three short points
    heroImage: image(),
    heroImageAlt: z.string(),
    heroPoints: z.array(z.string()).length(3),
    // What the work is done on, for "CCTV systems we install, repair…" wording, e.g. "CCTV systems"
    noun: z.string(),
    // Service page overview: key facts, what's included, and a short "good to know" note.
    // The note text can contain simple HTML links.
    overview: z.object({
      facts: z.array(z.object({ label: z.string(), value: z.string() })).min(2).max(4),
      included: z.array(z.object({ title: z.string(), text: z.string() })).min(3).max(9),
      note: z.object({ title: z.string(), text: z.string() }).optional(),
    }),
    // Questions shown on the service page. Answers can contain simple HTML links.
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
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

export const collections = { services, locations };
