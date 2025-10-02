import { loadChangelog } from '../data/dataLoader';

export const ChangelogWindow: React.FC = () => {
  const changelogData = loadChangelog();

  // Sort by date descending (newest first)
  const sortedEntries = [...changelogData.changelog].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: 'var(--font-tahoma)' }}>
      {/* Header */}
      <div className="border-b-2 border-gray-400 pb-3 mb-3">
        <h2 className="text-xl font-bold">Changelog</h2>
        <p className="text-xs text-gray-600">Development history and updates</p>
      </div>

      {/* Changelog entries */}
      <div className="flex-1 overflow-auto">
        <div className="space-y-2">
          {sortedEntries.map((entry, index) => (
            <div
              key={`${entry.date}-${index}`}
              className="flex gap-3 pb-2 border-b border-gray-300 last:border-b-0"
            >
              {/* Date */}
              <div
                className="flex-shrink-0 px-2 py-1 text-xs font-bold border"
                style={{
                  background: '#c0c0c0',
                  borderTopColor: '#ffffff',
                  borderLeftColor: '#ffffff',
                  borderRightColor: '#808080',
                  borderBottomColor: '#808080',
                  minWidth: '90px',
                  textAlign: 'center',
                }}
              >
                {formatDate(entry.date)}
              </div>

              {/* Note */}
              <div className="flex-1 py-1 text-sm text-gray-800">
                {entry.note}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-400 mt-3 pt-2 text-xs text-gray-600">
        {sortedEntries.length} {sortedEntries.length === 1 ? 'entry' : 'entries'}
      </div>
    </div>
  );
};
