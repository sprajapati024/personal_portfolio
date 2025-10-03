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

      {/* Page content - Hannah style */}
      <div
        className="flex-1 overflow-auto flex items-center justify-center p-8"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div className="bg-white border-2 shadow-lg max-w-3xl w-full" style={{
          borderTopColor: '#ffffff',
          borderLeftColor: '#ffffff',
          borderRightColor: '#808080',
          borderBottomColor: '#808080',
        }}>
          <div className="flex flex-col md:flex-row">
            {/* Left side - Text content */}
            <div className="flex-1 p-8" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}>
              <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-tahoma)' }}>
                hi! i'm {siteData.name.split(' ')[0].toLowerCase()}.
              </h1>

              <h2 className="text-sm uppercase tracking-wider mb-6 opacity-90">
                {siteData.title}
              </h2>

              <div className="space-y-4 text-sm leading-relaxed">
                <p>{siteData.about.bio}</p>

                <p>I especially enjoy working with {siteData.about.stack.slice(0, 3).join(', ')}, and building automation systems.</p>

                <p className="pt-4">
                  <span className="opacity-90">Currently at </span>
                  <a
                    href={siteData.about.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80"
                  >
                    {siteData.company}
                  </a>
                  <span className="opacity-90">, {siteData.now.focus.toLowerCase()}.</span>
                </p>
              </div>

              {/* Links */}
              <div className="mt-8 flex gap-3">
                <a
                  href={siteData.about.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.trackResumeClick()}
                  className="px-4 py-2 border-2 text-center font-bold text-sm hover:bg-white hover:bg-opacity-10 transition-colors"
                  style={{
                    borderColor: 'white',
                    color: 'white',
                    textDecoration: 'none',
                  }}
                >
                  Resume
                </a>
                <a
                  href={siteData.about.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border-2 text-center font-bold text-sm hover:bg-white hover:bg-opacity-10 transition-colors"
                  style={{
                    borderColor: 'white',
                    color: 'white',
                    textDecoration: 'none',
                  }}
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Right side - Profile photo */}
            <div className="flex items-center justify-center p-8 bg-white">
              <img
                src="/avatar.png"
                alt={siteData.name}
                className="rounded-full border-4 border-gray-300 shadow-lg object-cover"
                style={{
                  width: '280px',
                  height: '280px',
                }}
                onError={(e) => {
                  // Fallback if image doesn't load
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
