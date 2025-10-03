import { loadProjects } from '../data/dataLoader';

export const ImpactWindow: React.FC = () => {
  const projectsData = loadProjects();

  // Calculate total hours saved annually (extract from primary impact and metrics)
  const totalHoursSaved = projectsData.projects.reduce((total, project) => {
    const text = project.impact.primary + ' ' + project.impact.metrics.join(' ');
    const annualMatch = text.match(/(\d+)\+?\s*hours?\s+(?:annually|per year)/i);
    if (annualMatch) return total + parseInt(annualMatch[1]);

    const dailyMatch = text.match(/(\d+(?:\.\d+)?)\s*hours?\s+(?:daily|per day)/i);
    if (dailyMatch) return total + Math.round(parseFloat(dailyMatch[1]) * 250); // workdays

    return total;
  }, 0);

  // Count total projects (as "automations created")
  const totalAutomations = projectsData.projects.length;

  // Calculate average time reduction percentage
  const timeReductions = projectsData.projects
    .map(project => {
      const text = project.impact.primary + ' ' + project.impact.metrics.join(' ');
      const percentMatch = text.match(/(\d+)%/i);
      return percentMatch ? parseInt(percentMatch[1]) : 0;
    })
    .filter(val => val > 0);

  const avgTimeReduction = timeReductions.length > 0
    ? Math.round(timeReductions.reduce((a, b) => a + b, 0) / timeReductions.length)
    : 0;

  // Get top 3 projects by impact
  const top3Projects = [...projectsData.projects]
    .sort((a, b) => b.year - a.year)
    .slice(0, 3);

  return (
    <div className="flex flex-col h-full bg-white p-3" style={{ fontFamily: 'var(--font-tahoma)' }}>
      {/* Header */}
      <div className="pb-2 mb-3" style={{
        borderBottom: '2px solid #0054e3',
      }}>
        <h2 className="text-base font-bold" style={{ color: '#000080' }}>Impact Dashboard</h2>
        <p className="text-xs text-gray-600">Automation & efficiency metrics</p>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {/* Hours Saved */}
        <div
          className="p-2 border-2 text-center"
          style={{
            backgroundColor: '#ece9d8',
            borderTopColor: '#ffffff',
            borderLeftColor: '#ffffff',
            borderRightColor: '#808080',
            borderBottomColor: '#808080',
          }}
        >
          <div className="text-2xl font-bold" style={{ color: '#000080' }}>{totalHoursSaved}+</div>
          <div className="text-xs text-gray-700 mt-1">Hours/Year Saved</div>
        </div>

        {/* Time Reduction */}
        <div
          className="p-2 border-2 text-center"
          style={{
            backgroundColor: '#ece9d8',
            borderTopColor: '#ffffff',
            borderLeftColor: '#ffffff',
            borderRightColor: '#808080',
            borderBottomColor: '#808080',
          }}
        >
          <div className="text-2xl font-bold" style={{ color: '#000080' }}>{avgTimeReduction}%</div>
          <div className="text-xs text-gray-700 mt-1">Avg Time Reduction</div>
        </div>

        {/* Automations */}
        <div
          className="p-2 border-2 text-center"
          style={{
            backgroundColor: '#ece9d8',
            borderTopColor: '#ffffff',
            borderLeftColor: '#ffffff',
            borderRightColor: '#808080',
            borderBottomColor: '#808080',
          }}
        >
          <div className="text-2xl font-bold" style={{ color: '#000080' }}>{totalAutomations}+</div>
          <div className="text-xs text-gray-700 mt-1">Automations Created</div>
        </div>
      </div>

      {/* Top 3 Wins */}
      <div className="flex-1 overflow-auto">
        <h3 className="font-bold text-sm mb-2 pb-1" style={{
          borderBottom: '1px solid #808080',
        }}>
          Top 3 Project Wins
        </h3>
        <div className="space-y-2">
          {top3Projects.map((project, index) => (
            <div
              key={project.slug}
              className="p-2 border-2"
              style={{
                backgroundColor: '#ffffff',
                borderTopColor: '#ffffff',
                borderLeftColor: '#ffffff',
                borderRightColor: '#808080',
                borderBottomColor: '#808080',
              }}
            >
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center font-bold text-xs border-2"
                  style={{
                    backgroundColor: '#ece9d8',
                    borderTopColor: '#ffffff',
                    borderLeftColor: '#ffffff',
                    borderRightColor: '#808080',
                    borderBottomColor: '#808080',
                    color: '#000080',
                  }}
                >
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs mb-1">{project.title}</div>
                  <div className="text-xs mb-1" style={{ color: '#000080', fontWeight: '600' }}>
                    {project.impact.primary}
                  </div>
                  <div className="text-xs text-gray-600">
                    {project.impact.metrics[0]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
