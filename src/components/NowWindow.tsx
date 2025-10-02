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

  const getGradient = (color: string) => {
    switch (color) {
      case 'blue':
        return 'linear-gradient(180deg, #e8f4ff 0%, #d0e8ff 100%)';
      case 'purple':
        return 'linear-gradient(180deg, #f4e8ff 0%, #e8d0ff 100%)';
      case 'green':
        return 'linear-gradient(180deg, #e8ffe8 0%, #d0ffd0 100%)';
      default:
        return 'linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%)';
    }
  };

  const getTextColor = (color: string) => {
    switch (color) {
      case 'blue':
        return '#1e40af';
      case 'purple':
        return '#7c3aed';
      case 'green':
        return '#15803d';
      default:
        return '#374151';
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: 'var(--font-tahoma)' }}>
      {/* Header */}
      <div className="border-b-2 border-gray-400 pb-3 mb-4">
        <h2 className="text-xl font-bold">What I'm Doing Now</h2>
        <p className="text-xs text-gray-600">Current focus, experiments, and upcoming projects</p>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-auto space-y-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="p-4 border-2"
            style={{
              background: getGradient(card.color),
              borderTopColor: '#ffffff',
              borderLeftColor: '#ffffff',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{card.icon}</span>
              <h3
                className="font-bold text-lg"
                style={{ color: getTextColor(card.color) }}
              >
                {card.title}
              </h3>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed">
              {card.content}
            </p>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="border-t border-gray-400 mt-3 pt-2 text-xs text-gray-600">
        Updated regularly to reflect current priorities
      </div>
    </div>
  );
};
