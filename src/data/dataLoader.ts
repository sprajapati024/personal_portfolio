import { ProjectsDataSchema, SiteSchema, ChangelogDataSchema } from '../types/schema';
import type { ProjectsData, SiteData, ChangelogData } from '../types/schema';

import projectsJson from './projects.json';
import siteJson from './site.json';
import changelogJson from './changelog.json';

/**
 * Load and validate projects data
 */
export function loadProjects(): ProjectsData {
  try {
    const validated = ProjectsDataSchema.parse(projectsJson);
    return validated;
  } catch (error) {
    console.error('Failed to validate projects.json:', error);
    throw new Error('Invalid projects data');
  }
}

/**
 * Load and validate site data
 */
export function loadSiteData(): SiteData {
  try {
    const validated = SiteSchema.parse(siteJson);
    return validated;
  } catch (error) {
    console.error('Failed to validate site.json:', error);
    throw new Error('Invalid site data');
  }
}

/**
 * Load and validate changelog data
 */
export function loadChangelog(): ChangelogData {
  try {
    const validated = ChangelogDataSchema.parse(changelogJson);
    return validated;
  } catch (error) {
    console.error('Failed to validate changelog.json:', error);
    throw new Error('Invalid changelog data');
  }
}

/**
 * Get all projects sorted by impact (primary metric) and year descending
 */
export function getProjectsSorted(projectsData: ProjectsData) {
  return [...projectsData.projects].sort((a, b) => {
    // Sort by year descending
    return b.year - a.year;
  });
}

/**
 * Get project by slug
 */
export function getProjectBySlug(projectsData: ProjectsData, slug: string) {
  return projectsData.projects.find(p => p.slug === slug);
}

/**
 * Filter projects by tool
 */
export function filterProjectsByTool(projectsData: ProjectsData, tool: string) {
  return projectsData.projects.filter(p =>
    p.tools.some(t => t.toLowerCase().includes(tool.toLowerCase()))
  );
}

/**
 * Search projects by title or impact
 */
export function searchProjects(projectsData: ProjectsData, query: string) {
  const lowerQuery = query.toLowerCase();
  return projectsData.projects.filter(p =>
    p.title.toLowerCase().includes(lowerQuery) ||
    p.impact.primary.toLowerCase().includes(lowerQuery) ||
    p.impact.metrics.some(m => m.toLowerCase().includes(lowerQuery))
  );
}
