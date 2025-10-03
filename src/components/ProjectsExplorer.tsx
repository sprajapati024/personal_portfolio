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

  // Extract all unique tools
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
      results = filterProjectsByTool(projectsData, filterTool);
    }

    // Apply search
    if (searchQuery) {
      results = searchProjects(projectsData, searchQuery);
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
              borderRightColor: '#000000',
              borderBottomColor: '#000000',
            }}
          >
            ← Back to List
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          <ProjectDetail project={selectedProject} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white p-3" style={{ fontFamily: 'var(--font-tahoma)' }}>
      {/* Header */}
      <div className="pb-2 mb-3" style={{
        borderBottom: '2px solid #0054e3',
      }}>
        <h2 className="text-base font-bold" style={{ color: '#000080' }}>Projects Explorer</h2>
        <p className="text-xs text-gray-600">View and search all projects</p>
      </div>

      {/* Toolbar */}
      <div className="flex gap-2 mb-2 p-2" style={{
        backgroundColor: '#ece9d8',
        border: '1px solid #808080',
      }}>
        {/* Search */}
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-2 py-1 border text-xs flex-1"
          style={{
            fontFamily: 'var(--font-tahoma)',
            borderColor: '#808080',
          }}
        />

        {/* Filter by tool */}
        <select
          value={filterTool}
          onChange={(e) => setFilterTool(e.target.value)}
          className="px-2 py-1 border text-xs"
          style={{
            fontFamily: 'var(--font-tahoma)',
            borderColor: '#808080',
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
            className="px-2 py-1 border text-xs"
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
      <div className="flex-1 overflow-y-auto overflow-x-hidden border-2" style={{
        borderTopColor: '#808080',
        borderLeftColor: '#808080',
        borderRightColor: '#ffffff',
        borderBottomColor: '#ffffff',
      }}>
        <table className="w-full text-xs" style={{
          tableLayout: 'fixed',
          borderCollapse: 'collapse',
          fontFamily: 'Tahoma, sans-serif',
        }}>
          <thead>
            <tr style={{
              backgroundColor: '#ece9d8',
              borderBottom: '2px solid #808080',
            }}>
              <th
                className="text-left px-3 py-2 cursor-pointer font-bold"
                onClick={() => handleSort('title')}
                style={{
                  color: '#000080',
                  borderRight: '1px solid #d4d0c8',
                }}
              >
                Title{getSortIndicator('title')}
              </th>
              <th
                className="text-left px-3 py-2 font-bold"
                style={{
                  color: '#000080',
                  width: '180px',
                  borderRight: '1px solid #d4d0c8',
                }}
              >
                Tools
              </th>
              <th
                className="text-left px-3 py-2 cursor-pointer font-bold"
                onClick={() => handleSort('impact')}
                style={{
                  color: '#000080',
                  borderRight: '1px solid #d4d0c8',
                }}
              >
                Impact{getSortIndicator('impact')}
              </th>
              <th
                className="text-right px-3 py-2 cursor-pointer font-bold"
                onClick={() => handleSort('year')}
                style={{
                  color: '#000080',
                  width: '80px',
                }}
              >
                Year{getSortIndicator('year')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedProjects.map((project, index) => (
              <tr
                key={project.slug}
                className="cursor-pointer transition-colors"
                onClick={() => handleRowClick(project)}
                style={{
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9',
                  borderBottom: '1px solid #d4d0c8',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5f3ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f9f9f9';
                }}
              >
                <td
                  className="px-3 py-3 font-bold align-top"
                  style={{
                    color: '#000080',
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                    lineHeight: '1.4',
                    borderRight: '1px solid #e8e8e8',
                  }}
                >
                  {project.title}
                </td>
                <td
                  className="px-3 py-3 align-top"
                  style={{
                    color: '#505050',
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                    lineHeight: '1.4',
                    borderRight: '1px solid #e8e8e8',
                  }}
                >
                  {project.tools.slice(0, 2).join(', ')}
                  {project.tools.length > 2 && ` +${project.tools.length - 2}`}
                </td>
                <td
                  className="px-3 py-3 align-top"
                  style={{
                    color: '#505050',
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                    lineHeight: '1.4',
                    borderRight: '1px solid #e8e8e8',
                  }}
                >
                  {project.impact.primary}
                </td>
                <td
                  className="px-3 py-3 text-right align-top"
                  style={{
                    color: '#000080',
                    fontWeight: '500',
                  }}
                >
                  {project.year}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAndSortedProjects.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            No projects found matching your criteria.
          </div>
        )}
      </div>

      {/* Footer stats */}
      <div className="pt-2 mt-2 text-xs text-gray-600" style={{
        borderTop: '1px solid #808080',
      }}>
        Showing {filteredAndSortedProjects.length} of {projectsData.projects.length} projects
      </div>
    </div>
  );
};
