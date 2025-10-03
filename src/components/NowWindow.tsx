import { loadSiteData } from '../data/dataLoader';

export const NowWindow: React.FC = () => {
  const siteData = loadSiteData();

  const cards = [
    {
      title: 'Focus',
      content: siteData.now.focus,
      icon: '🎯',
      color: 'blue',
    },
    {
      title: 'Experiment',
      content: siteData.now.experiment,
      icon: '🧪',
      color: 'purple',
    },
    {
      title: 'Next',
      content: siteData.now.next,
      icon: '🚀',
      color: 'green',
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

      {/* Cards */}
      <div className="flex-1 overflow-auto space-y-2">
        {cards.map((card) => (
          <div
            key={card.title}
            className="p-3 border-2"
            style={{
              backgroundColor: '#ece9d8',
              borderTopColor: '#ffffff',
              borderLeftColor: '#ffffff',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{card.icon}</span>
              <h3 className="font-bold text-sm" style={{ color: '#000080' }}>
                {card.title}
              </h3>
            </div>
            <p className="text-xs text-gray-800 leading-relaxed">
              {card.content}
            </p>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-3 pt-2 text-xs text-gray-600" style={{
        borderTop: '1px solid #808080',
      }}>
        Updated regularly to reflect current priorities
      </div>
    </div>
  );
};
