import { loadProjects } from '../data/dataLoader';

export const ImpactWindow: React.FC = () => {
  const projectsData = loadProjects();

  // Calculate total hours saved (extract numbers from primary impact)
  const totalHoursSaved = projectsData.projects.reduce((total, project) => {
    const match = project.impact.primary.match(/(\d+)\s*hours?/i);
    return match ? total + parseInt(match[1]) : total;
  }, 0);

  // Count total automations
  const totalAutomations = projectsData.projects.reduce((total, project) => {
    const match = project.impact.primary.match(/(\d+)\s*(?:automations?|processes?)/i);
    return match ? total + parseInt(match[1]) : total;
  }, 0);

  // Calculate average error reduction (extract percentages)
  const errorReductions = projectsData.projects
    .map(project => {
      const metrics = project.impact.metrics.join(' ');
      const match = metrics.match(/(\d+)%\s*error/i);
      return match ? parseInt(match[1]) : 0;
    })
    .filter(val => val > 0);

  const avgErrorReduction = errorReductions.length > 0
    ? Math.round(errorReductions.reduce((a, b) => a + b, 0) / errorReductions.length)
    : 0;

  // Get top 3 projects by impact
  const top3Projects = [...projectsData.projects]
    .sort((a, b) => b.year - a.year)
    .slice(0, 3);

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: 'var(--font-tahoma)' }}>
      {/* Header */}
      <div className="border-b-2 border-gray-400 pb-3 mb-4">
        <h2 className="text-xl font-bold">Impact Dashboard</h2>
        <p className="text-xs text-gray-600">Automation & efficiency metrics</p>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {/* Hours Saved */}
        <div
          className="p-3 border-2 text-center"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #e8f4ff 100%)',
            borderTopColor: '#ffffff',
            borderLeftColor: '#ffffff',
            borderRightColor: '#808080',
            borderBottomColor: '#808080',
          }}
        >
          <div className="text-3xl font-bold text-blue-700">{totalHoursSaved}+</div>
          <div className="text-xs text-gray-700 mt-1">Hours/Week Saved</div>
        </div>

        {/* Error Reduction */}
        <div
          className="p-3 border-2 text-center"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #fff4e8 100%)',
            borderTopColor: '#ffffff',
            borderLeftColor: '#ffffff',
            borderRightColor: '#808080',
            borderBottomColor: '#808080',
          }}
        >
          <div className="text-3xl font-bold text-orange-700">{avgErrorReduction}%</div>
          <div className="text-xs text-gray-700 mt-1">Avg Error Reduction</div>
        </div>

        {/* Automations */}
        <div
          className="p-3 border-2 text-center"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #e8ffe8 100%)',
            borderTopColor: '#ffffff',
            borderLeftColor: '#ffffff',
            borderRightColor: '#808080',
            borderBottomColor: '#808080',
          }}
        >
          <div className="text-3xl font-bold text-green-700">{totalAutomations}+</div>
          <div className="text-xs text-gray-700 mt-1">Automations Created</div>
        </div>
      </div>

      {/* Top 3 Wins */}
      <div className="flex-1 overflow-auto">
        <h3 className="font-bold text-sm mb-2 border-b border-gray-400 pb-1">
          Top 3 Project Wins
        </h3>
        <div className="space-y-2">
          {top3Projects.map((project, index) => (
            <div
              key={project.slug}
              className="p-3 border-2 bg-white"
              style={{
                borderTopColor: '#ffffff',
                borderLeftColor: '#ffffff',
                borderRightColor: '#808080',
                borderBottomColor: '#808080',
              }}
            >
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm mb-1">{project.title}</div>
                  <div className="text-xs text-blue-700 font-semibold mb-1">
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
