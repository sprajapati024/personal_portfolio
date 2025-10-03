import { loadSiteData } from '../data/dataLoader';

export const NowWindow: React.FC = () => {
  const siteData = loadSiteData();

  const sections = [
    {
      title: 'Current Focus',
      content: siteData.now.focus,
    },
    {
      title: 'Experimenting With',
      content: siteData.now.experiment,
    },
    {
      title: 'Coming Next',
      content: siteData.now.next,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white p-3" style={{ fontFamily: 'var(--font-tahoma)' }}>
      {/* Header */}
      <div className="pb-2 mb-3" style={{
        borderBottom: '2px solid #0054e3',
      }}>
        <h2 className="text-base font-bold" style={{ color: '#000080' }}>What I'm Doing Now</h2>
        <p className="text-xs text-gray-600">Current focus, experiments, and upcoming projects</p>
      </div>

      {/* Content sections */}
      <div className="flex-1 overflow-auto space-y-3">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="font-bold text-xs mb-1 pb-1" style={{
              color: '#000080',
              borderBottom: '1px solid #d4d0c8',
            }}>
              {section.title}
            </h3>
            <p className="text-xs text-gray-800 leading-relaxed pl-2">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-3 pt-2 text-xs text-gray-600 text-center" style={{
        borderTop: '1px solid #808080',
      }}>
        Updated regularly to reflect current priorities
      </div>
    </div>
  );
};
