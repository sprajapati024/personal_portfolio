import { useState, useMemo } from 'react';
import { loadProjects, filterProjectsByTool, searchProjects } from '../data/dataLoader';
import type { Project } from '../types/schema';
import { ProjectDetail } from './ProjectDetail';

type SortField = 'title' | 'year' | 'impact';
type SortDirection = 'asc' | 'desc';

interface ProjectsExplorerProps {
  onProjectSelect?: (project: Project) => void;
}

export const ProjectsExplorer: React.FC<ProjectsExplorerProps> = ({ onProjectSelect }) => {
  const projectsData = loadProjects();

  const [sortField, setSortField] = useState<SortField>('year');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterTool, setFilterTool] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get all unique tools for filter dropdown
  const allTools = useMemo(() => {
    const toolsSet = new Set<string>();
    projectsData.projects.forEach(project => {
      project.tools.forEach(tool => toolsSet.add(tool));
    });
    return Array.from(toolsSet).sort();
  }, [projectsData.projects]);

  // Apply filters and sorting
  const filteredAndSortedProjects = useMemo(() => {
    let results = projectsData.projects;

    // Apply tool filter
    if (filterTool) {
      const filtered = filterProjectsByTool(projectsData, filterTool);
      results = filtered;
    }

    // Apply search
    if (searchQuery) {
      const searched = searchProjects(projectsData, searchQuery);
      results = searched;
    }

    // Apply sorting
    results = [...results].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'year':
          comparison = a.year - b.year;
          break;
        case 'impact':
          // Sort by primary impact metric (alphabetically for now)
          comparison = a.impact.primary.localeCompare(b.impact.primary);
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return results;
  }, [projectsData, filterTool, searchQuery, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to desc
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIndicator = (field: SortField) => {
    if (sortField !== field) return '';
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

  const handleRowClick = (project: Project) => {
    setSelectedProject(project);
    onProjectSelect?.(project);
  };

  const handleBackToList = () => {
    setSelectedProject(null);
  };

  // If a project is selected, show detail view
  if (selectedProject) {
    return (
      <div className="flex flex-col h-full" style={{ fontFamily: 'var(--font-tahoma)' }}>
        <div className="border-b border-gray-400 pb-2 mb-2">
          <button
            onClick={handleBackToList}
            className="px-3 py-1 text-sm border"
            style={{
              background: '#c0c0c0',
              borderTopColor: '#ffffff',
              borderLeftColor: '#ffffff',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
            }}
          >
            ← Back to Projects
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <ProjectDetail project={selectedProject} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: 'var(--font-tahoma)' }}>
      {/* Toolbar */}
      <div className="flex gap-2 mb-2 p-2 bg-gray-100 border-b border-gray-300">
        {/* Search */}
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-2 py-1 border border-gray-400 text-sm flex-1"
          style={{
            fontFamily: 'var(--font-tahoma)',
          }}
        />

        {/* Filter by tool */}
        <select
          value={filterTool}
          onChange={(e) => setFilterTool(e.target.value)}
          className="px-2 py-1 border border-gray-400 text-sm"
          style={{
            fontFamily: 'var(--font-tahoma)',
          }}
        >
          <option value="">All Tools</option>
          {allTools.map(tool => (
            <option key={tool} value={tool}>{tool}</option>
          ))}
        </select>

        {/* Clear filters */}
        {(filterTool || searchQuery) && (
          <button
            onClick={() => {
              setFilterTool('');
              setSearchQuery('');
            }}
            className="px-3 py-1 border text-sm"
            style={{
              background: '#c0c0c0',
              borderTopColor: '#ffffff',
              borderLeftColor: '#ffffff',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
              fontFamily: 'var(--font-tahoma)',
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 border-b-2 border-gray-400">
              <th
                className="text-left px-2 py-1 cursor-pointer hover:bg-gray-300"
                onClick={() => handleSort('title')}
              >
                Title{getSortIndicator('title')}
              </th>
              <th className="text-left px-2 py-1">
                Tools
              </th>
              <th
                className="text-left px-2 py-1 cursor-pointer hover:bg-gray-300"
                onClick={() => handleSort('impact')}
              >
                Impact{getSortIndicator('impact')}
              </th>
              <th
                className="text-left px-2 py-1 cursor-pointer hover:bg-gray-300"
                onClick={() => handleSort('year')}
              >
                Year{getSortIndicator('year')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedProjects.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No projects found
                </td>
              </tr>
            ) : (
              filteredAndSortedProjects.map((project) => (
                <tr
                  key={project.slug}
                  className="border-b border-gray-300 hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleRowClick(project)}
                >
                  <td className="px-2 py-2 font-semibold">{project.title}</td>
                  <td className="px-2 py-2">
                    <div className="flex flex-wrap gap-1">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-1.5 py-0.5 bg-gray-200 text-xs rounded"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-2 py-2">{project.impact.primary}</td>
                  <td className="px-2 py-2">{project.year}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Status bar */}
      <div className="border-t border-gray-400 px-2 py-1 bg-gray-100 text-xs text-gray-600">
        {filteredAndSortedProjects.length} project{filteredAndSortedProjects.length !== 1 ? 's' : ''}
        {(filterTool || searchQuery) && ` (filtered from ${projectsData.projects.length})`}
      </div>
    </div>
  );
};
