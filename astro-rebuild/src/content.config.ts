import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    audience: z.enum(['recruiter', 'engineering']).optional(),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    projectId: z.string(),
    industry: z.string(),
    year: z.string(),
    role: z.string(),
    stack: z.array(z.string()),
    liveUrl: z.string().url(),
    nexrenaUrl: z.string().url().optional(),
    quote: z
      .object({
        text: z.string(),
        attribution: z.string(),
      })
      .optional(),
    metrics: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    ),
    pubDate: z.coerce.date(),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, 'case-studies': caseStudies };
