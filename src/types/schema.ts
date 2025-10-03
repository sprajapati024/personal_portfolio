import { z } from 'zod';

// Project schema based on design-system.md requirements
export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  year: z.number().int().min(2000).max(2100),
  tools: z.array(z.string()),
  impact: z.object({
    primary: z.string(), // Main metric (e.g., "Saved 10 hours/week")
    metrics: z.array(z.string()).min(2).max(3), // 2-3 impact metrics
  }),
  overview: z.object({
    problem: z.string(),
    solution: z.string(),
    outcome: z.string(),
  }),
  flow: z.string().optional(), // Mermaid diagram code
  media: z.array(z.object({
    type: z.enum(['image', 'gif']),
    url: z.string(),
    alt: z.string(),
  })).optional(),
});

// Site data schema based on site.json structure
export const SiteSchema = z.object({
  name: z.string(),
  title: z.string(),
  company: z.string(),
  tagline: z.string(),
  now: z.object({
    focus: z.string(),
    experiment: z.string(),
    next: z.string(),
  }),
  about: z.object({
    bio: z.string(),
    stack: z.array(z.string()),
    values: z.array(z.string()).length(3), // Exactly 3 values
    resume_url: z.string().url(),
    linkedin_url: z.string().url(),
  }),
  contact: z.object({
    email: z.string().email(),
    linkedin: z.string().url(),
    calendly: z.string().url().optional(),
    subtext: z.string(),
  }),
});

// Changelog schema
export const ChangelogEntrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  note: z.string().max(80), // ≤80 characters
});

// Export types
export type Project = z.infer<typeof ProjectSchema>;
export type SiteData = z.infer<typeof SiteSchema>;
export type ChangelogEntry = z.infer<typeof ChangelogEntrySchema>;

// Data collection schemas
export const ProjectsDataSchema = z.object({
  projects: z.array(ProjectSchema),
});

export const ChangelogDataSchema = z.object({
  changelog: z.array(ChangelogEntrySchema),
});

export type ProjectsData = z.infer<typeof ProjectsDataSchema>;
export type ChangelogData = z.infer<typeof ChangelogDataSchema>;
