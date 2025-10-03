import { useState, useEffect } from 'react';
import { loadSiteData } from '../data/dataLoader';
import { analytics } from '../utils/analytics';

export const AboutWindow: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const siteData = loadSiteData();

  useEffect(() => {
    // Simulate browser loading
    const duration = 1500;
    const interval = 50;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-white" style={{ fontFamily: 'var(--font-tahoma)' }}>
        {/* Browser chrome */}
        <div className="bg-gray-100 border-b border-gray-300 p-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-1">
              <div className="w-4 h-4 bg-gray-300 border border-gray-400"></div>
              <div className="w-4 h-4 bg-gray-300 border border-gray-400"></div>
              <div className="w-4 h-4 bg-gray-300 border border-gray-400"></div>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white border border-gray-400 px-2 py-1">
            <span className="text-xs text-gray-500">🌐</span>
            <span className="text-xs text-gray-600">about://me</span>
          </div>
        </div>

        {/* Loading content */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white">
          <div className="text-6xl mb-4">🌐</div>
          <div className="text-lg font-bold text-gray-700 mb-2">Loading...</div>

          {/* Progress bar */}
          <div className="w-64 h-6 border-2 bg-white" style={{
            borderTopColor: '#808080',
            borderLeftColor: '#808080',
            borderRightColor: '#ffffff',
            borderBottomColor: '#ffffff',
          }}>
            <div
              className="h-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #000080 0%, #1084d0 100%)',
              }}
            />
          </div>

          <div className="text-xs text-gray-500 mt-2">
            {Math.round(progress)}% complete
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: 'var(--font-tahoma)' }}>
      {/* Browser chrome */}
      <div className="bg-gray-100 border-b border-gray-300 p-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-1">
            <button className="w-6 h-5 bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-400 text-xs hover:bg-gray-300">←</button>
            <button className="w-6 h-5 bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-400 text-xs hover:bg-gray-300">→</button>
            <button className="w-6 h-5 bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-400 text-xs hover:bg-gray-300">⟳</button>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-400 px-2 py-1">
          <span className="text-xs text-gray-500">🌐</span>
          <span className="text-xs text-gray-600">about://me</span>
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1 overflow-auto bg-gray-200 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Profile section */}
          <div className="bg-white border-2 border-gray-400 p-6 mb-4" style={{
            borderTopColor: '#ffffff',
            borderLeftColor: '#ffffff',
            borderRightColor: '#808080',
            borderBottomColor: '#808080',
          }}>
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src="/avatar.png"
                  alt="Avatar"
                  className="w-32 h-32 border-2 border-gray-400 bg-white"
                  style={{
                    borderTopColor: '#808080',
                    borderLeftColor: '#808080',
                    borderRightColor: '#ffffff',
                    borderBottomColor: '#ffffff',
                  }}
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {siteData.name}
                </h1>
                <h2 className="text-xl text-blue-700 mb-3">
                  {siteData.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  {siteData.company}
                </p>
                <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500">
                  <p className="text-sm font-semibold text-blue-900 italic">
                    "{siteData.tagline}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white border-2 border-gray-400 p-5 mb-4" style={{
            borderTopColor: '#ffffff',
            borderLeftColor: '#ffffff',
            borderRightColor: '#808080',
            borderBottomColor: '#808080',
          }}>
            <h3 className="font-bold text-lg mb-3 border-b-2 border-gray-300 pb-2">
              About Me
            </h3>
            <p className="text-sm leading-relaxed text-gray-800">
              {siteData.about.bio}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="bg-white border-2 border-gray-400 p-5 mb-4" style={{
            borderTopColor: '#ffffff',
            borderLeftColor: '#ffffff',
            borderRightColor: '#808080',
            borderBottomColor: '#808080',
          }}>
            <h3 className="font-bold text-lg mb-3 border-b-2 border-gray-300 pb-2">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {siteData.about.stack.map((tech) => (
                <div
                  key={tech}
                  className="px-3 py-1.5 border-2 text-sm font-semibold bg-white"
                  style={{
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
          <div className="bg-white border-2 border-gray-400 p-5 mb-4" style={{
            borderTopColor: '#ffffff',
            borderLeftColor: '#ffffff',
            borderRightColor: '#808080',
            borderBottomColor: '#808080',
          }}>
            <h3 className="font-bold text-lg mb-3 border-b-2 border-gray-300 pb-2">
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

          {/* Links */}
          <div className="bg-white border-2 border-gray-400 p-5" style={{
            borderTopColor: '#ffffff',
            borderLeftColor: '#ffffff',
            borderRightColor: '#808080',
            borderBottomColor: '#808080',
          }}>
            <h3 className="font-bold text-lg mb-3 border-b-2 border-gray-300 pb-2">
              Connect
            </h3>
            <div className="flex gap-3">
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
        </div>
      </div>
    </div>
  );
};
