import { loadSiteData } from '../data/dataLoader';
import { analytics } from '../utils/analytics';

export const AboutWindow: React.FC = () => {
  const siteData = loadSiteData();

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: 'var(--font-tahoma)' }}>
      {/* Tagline */}
      <div className="text-center py-4 border-b-2 border-gray-400 mb-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">
          {siteData.tagline}
        </h2>
      </div>

      {/* Bio */}
      <div className="mb-4 px-2">
        <p className="text-sm leading-relaxed text-gray-800">
          {siteData.about.bio}
        </p>
      </div>

      {/* Stack */}
      <div className="mb-4">
        <h3 className="font-bold text-sm mb-2 border-b border-gray-400 pb-1">
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {siteData.about.stack.map((tech) => (
            <div
              key={tech}
              className="px-3 py-1.5 border-2 text-sm font-semibold"
              style={{
                background: '#ffffff',
                borderTopColor: '#ffffff',
                borderLeftColor: '#ffffff',
                borderRightColor: '#808080',
                borderBottomColor: '#808080',
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="mb-4">
        <h3 className="font-bold text-sm mb-2 border-b border-gray-400 pb-1">
          Core Values
        </h3>
        <div className="flex gap-3">
          {siteData.about.values.map((value, index) => (
            <div
              key={value}
              className="flex-1 p-3 border-2 text-center"
              style={{
                background: index === 0
                  ? 'linear-gradient(180deg, #e8f4ff 0%, #d0e8ff 100%)'
                  : index === 1
                  ? 'linear-gradient(180deg, #fff4e8 0%, #ffd0d0 100%)'
                  : 'linear-gradient(180deg, #e8ffe8 0%, #d0ffd0 100%)',
                borderTopColor: '#ffffff',
                borderLeftColor: '#ffffff',
                borderRightColor: '#808080',
                borderBottomColor: '#808080',
              }}
            >
              <div className="font-bold text-sm">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-auto flex gap-3">
        <a
          href={siteData.about.resume_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => analytics.trackResumeClick()}
          className="flex-1 px-4 py-2 border-2 text-center font-bold text-sm hover:bg-gray-100"
          style={{
            background: '#c0c0c0',
            borderTopColor: '#ffffff',
            borderLeftColor: '#ffffff',
            borderRightColor: '#000000',
            borderBottomColor: '#000000',
            textDecoration: 'none',
            color: '#000000',
          }}
        >
          📄 Resume
        </a>
        <a
          href={siteData.about.linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-2 border-2 text-center font-bold text-sm hover:bg-gray-100"
          style={{
            background: '#c0c0c0',
            borderTopColor: '#ffffff',
            borderLeftColor: '#ffffff',
            borderRightColor: '#000000',
            borderBottomColor: '#000000',
            textDecoration: 'none',
            color: '#000000',
          }}
        >
          💼 LinkedIn
        </a>
      </div>
    </div>
  );
};
