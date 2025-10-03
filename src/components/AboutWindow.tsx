import { useState, useEffect } from 'react';
import { loadSiteData } from '../data/dataLoader';

interface AboutWindowProps {
  onOpenWindow?: (windowId: string) => void;
}

export const AboutWindow: React.FC<AboutWindowProps> = ({ onOpenWindow }) => {
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
        className="flex-1 overflow-auto flex items-center justify-center p-4"
        style={{
          background: '#c0c0c0',
        }}
      >
        <div className="bg-white border-2 shadow-lg w-full h-full" style={{
          borderTopColor: '#ffffff',
          borderLeftColor: '#ffffff',
          borderRightColor: '#808080',
          borderBottomColor: '#808080',
        }}>
          <div className="flex flex-col md:flex-row h-full">
            {/* Left side - Text content */}
            <div className="flex-1 p-6 overflow-auto" style={{
              background: '#c0c0c0',
              color: '#000000',
            }}>
              <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-tahoma)' }}>
                hi! i'm {siteData.name.split(' ')[0].toLowerCase()}.
              </h1>

              <h2 className="text-xs uppercase tracking-wider mb-4" style={{ color: '#000080' }}>
                {siteData.title}
              </h2>

              <div className="space-y-3 text-xs leading-relaxed">
                <p>{siteData.about.bio}</p>

                <p>I especially enjoy working with {siteData.about.stack.slice(0, 3).join(', ')}, and building automation systems.</p>

                <p className="pt-2">
                  <span>Currently at </span>
                  <a
                    href={siteData.about.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    style={{ color: '#000080' }}
                  >
                    {siteData.company}
                  </a>
                  <span>, {siteData.now.focus.toLowerCase()}.</span>
                </p>

                <p className="pt-2 font-semibold" style={{ color: '#000080' }}>
                  Feel free to explore the website and have fun with it!
                </p>
              </div>

              {/* Links */}
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={siteData.about.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 border-2 text-center font-bold text-xs hover:bg-gray-300"
                  style={{
                    borderTopColor: '#ffffff',
                    borderLeftColor: '#ffffff',
                    borderRightColor: '#808080',
                    borderBottomColor: '#808080',
                    backgroundColor: '#c0c0c0',
                    color: '#000000',
                    textDecoration: 'none',
                  }}
                >
                  LinkedIn
                </a>
                <button
                  onClick={() => onOpenWindow?.('projects-explorer')}
                  className="px-3 py-1 border-2 text-center font-bold text-xs hover:bg-gray-300"
                  style={{
                    borderTopColor: '#ffffff',
                    borderLeftColor: '#ffffff',
                    borderRightColor: '#808080',
                    borderBottomColor: '#808080',
                    backgroundColor: '#c0c0c0',
                    color: '#000000',
                  }}
                >
                  Projects
                </button>
                <button
                  onClick={() => onOpenWindow?.('impact')}
                  className="px-3 py-1 border-2 text-center font-bold text-xs hover:bg-gray-300"
                  style={{
                    borderTopColor: '#ffffff',
                    borderLeftColor: '#ffffff',
                    borderRightColor: '#808080',
                    borderBottomColor: '#808080',
                    backgroundColor: '#c0c0c0',
                    color: '#000000',
                  }}
                >
                  Impact
                </button>
              </div>

              {/* Fun Features Section */}
              <div className="mt-6 pt-4 border-t border-gray-400">
                <p className="text-xs font-bold mb-3" style={{ color: '#000080' }}>
                  Hidden Features (Go ahead, explore!)
                </p>

                <div className="space-y-2 text-xs text-gray-700">
                  <p>
                    <span
                      onClick={() => onOpenWindow?.('chat')}
                      className="underline font-bold hover:text-blue-700 cursor-pointer"
                      style={{ color: '#000080' }}
                    >
                      Chat Assistant
                    </span>
                    {' '}- An AI that knows embarrassingly detailed facts about my projects.
                    Ask it anything... or just say hi.
                  </p>

                  <p>
                    <span
                      onClick={() => onOpenWindow?.('murall')}
                      className="underline font-bold hover:text-blue-700 cursor-pointer"
                      style={{ color: '#000080' }}
                    >
                      Murall.exe
                    </span>
                    {' '}- Feeling artsy? Generate custom AI wallpapers and watch your desktop
                    transform. Warning: may cause excessive creativity.
                  </p>
                </div>

                <p className="text-xs text-gray-600 mt-3 italic">
                  This whole site is basically a retro Windows playground. Click around,
                  have fun, and yes - it's supposed to look like Windows XP.
                </p>
              </div>
            </div>

            {/* Right side - Profile photo */}
            <div className="flex items-center justify-center p-6 bg-white">
              <img
                src="/avatar.png"
                alt={siteData.name}
                className="rounded-full border-4 border-gray-300 shadow-lg object-cover"
                style={{
                  width: '200px',
                  height: '200px',
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
