import { useState, useEffect } from 'react';
import type { Project } from '../types/schema';
import { MermaidDiagram } from './MermaidDiagram';
import { analytics } from '../utils/analytics';

interface ProjectDetailProps {
  project: Project;
}

type TabType = 'overview' | 'tools' | 'impact' | 'flow' | 'media';

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Track project open on mount
  useEffect(() => {
    analytics.trackProjectOpen(project.slug);
  }, [project.slug]);

  // Track tab views
  useEffect(() => {
    analytics.trackTabViewed(project.slug, activeTab);
  }, [project.slug, activeTab]);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'tools', label: 'Tools' },
    { id: 'impact', label: 'Impact' },
    { id: 'flow', label: 'Flow' },
    { id: 'media', label: 'Media' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-xs mb-1" style={{ color: '#000080' }}>Problem</h3>
              <p className="text-xs">{project.overview.problem}</p>
            </div>
            <div>
              <h3 className="font-bold text-xs mb-1" style={{ color: '#000080' }}>Solution</h3>
              <p className="text-xs">{project.overview.solution}</p>
            </div>
            <div>
              <h3 className="font-bold text-xs mb-1" style={{ color: '#000080' }}>Outcome</h3>
              <p className="text-xs">{project.overview.outcome}</p>
            </div>
          </div>
        );

      case 'tools':
        return (
          <div className="space-y-2">
            <h3 className="font-bold text-xs" style={{ color: '#000080' }}>Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <div
                  key={tool}
                  className="px-2 py-1 border-2"
                  style={{
                    backgroundColor: '#ece9d8',
                    borderTopColor: '#ffffff',
                    borderLeftColor: '#ffffff',
                    borderRightColor: '#808080',
                    borderBottomColor: '#808080',
                  }}
                  title={`Technology: ${tool}`}
                >
                  <span className="text-xs font-semibold">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'impact':
        return (
          <div className="space-y-3">
            <div className="p-3 border-2" style={{
              backgroundColor: '#ece9d8',
              borderTopColor: '#ffffff',
              borderLeftColor: '#ffffff',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
            }}>
              <h3 className="font-bold text-xs mb-1" style={{ color: '#000080' }}>Primary Impact</h3>
              <p className="text-sm font-bold" style={{ color: '#000080' }}>{project.impact.primary}</p>
            </div>
            <div>
              <h3 className="font-bold text-xs mb-2">Key Metrics</h3>
              <div className="space-y-2">
                {project.impact.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="p-2 border-2 text-xs"
                    style={{
                      backgroundColor: '#ffffff',
                      borderTopColor: '#ffffff',
                      borderLeftColor: '#ffffff',
                      borderRightColor: '#808080',
                      borderBottomColor: '#808080',
                    }}
                  >
                    • {metric}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'flow':
        return (
          <div className="space-y-3">
            {project.flow ? (
              <>
                <h3 className="font-bold text-sm">Process Flow</h3>
                <MermaidDiagram chart={project.flow} />
              </>
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm">
                No flow diagram available for this project
              </div>
            )}
          </div>
        );

      case 'media':
        return (
          <div className="space-y-3">
            {project.media && project.media.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {project.media.map((item, index) => (
                  <div key={index} className="border border-gray-300 p-2">
                    <img
                      src={item.url}
                      alt={item.alt}
                      className="w-full h-auto"
                    />
                    <p className="text-xs text-gray-600 mt-1">{item.alt}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm">
                No media available for this project
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white p-3" style={{ fontFamily: 'var(--font-tahoma)' }}>
      {/* Project title header */}
      <div className="pb-2 mb-3" style={{
        borderBottom: '2px solid #0054e3',
      }}>
        <h2 className="text-base font-bold" style={{ color: '#000080' }}>{project.title}</h2>
        <p className="text-xs text-gray-600">Year: {project.year}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-400 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-2 text-sm border-t-2 border-l-2 border-r-2 relative"
            style={{
              background: activeTab === tab.id ? '#ffffff' : '#c0c0c0',
              borderTopColor: activeTab === tab.id ? '#ffffff' : '#dfdfdf',
              borderLeftColor: activeTab === tab.id ? '#ffffff' : '#dfdfdf',
              borderRightColor: activeTab === tab.id ? '#808080' : '#808080',
              borderBottom: activeTab === tab.id ? '2px solid #ffffff' : 'none',
              marginBottom: activeTab === tab.id ? '-1px' : '0',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};
