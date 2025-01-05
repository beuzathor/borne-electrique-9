import { z } from 'zod';

// Base schemas for common WordPress fields
export const renderedStringSchema = z.object({
  rendered: z.string(),
  protected: z.boolean().optional()
});

export const mediaSchema = z.object({
  source_url: z.string()
});

// Main content schemas
export const postSchema = z.object({
  id: z.number(),
  title: renderedStringSchema,
  content: renderedStringSchema,
  excerpt: renderedStringSchema,
  date: z.string(),
  slug: z.string(),
  categories: z.array(z.number()),
  featured_media: z.number().optional(),
  _embedded: z.object({
    'wp:featuredmedia': z.array(mediaSchema).optional()
  }).optional()
});

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  count: z.number(),
  description: z.string().optional()
});