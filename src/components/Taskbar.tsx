import { useState, useEffect } from 'react';
import { StartMenuPopup } from './StartMenuPopup';

export interface TaskbarWindow {
  id: string;
  title: string;
  isActive: boolean;
  isMinimized: boolean;
}

interface TaskbarProps {
  windows: TaskbarWindow[];
  onWindowClick: (id: string) => void;
  onStartMenuItemClick?: (itemId: string) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  onWindowClick,
  onStartMenuItemClick,
}) => {
  const [time, setTime] = useState(new Date());
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleStartClick = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const handleStartMenuItemClick = (itemId: string) => {
    onStartMenuItemClick?.(itemId);
    setIsStartMenuOpen(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <StartMenuPopup
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onItemClick={handleStartMenuItemClick}
      />

      <div
        className="fixed bottom-0 left-0 right-0 h-8 flex items-center px-1 z-30"
        style={{
          background: 'linear-gradient(180deg, #245edb 0%, #1941a5 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          borderTop: '1px solid #1a4ba8',
        }}
      >
      {/* Start Button */}
      <button
        className="h-6 px-2 flex items-center gap-1 rounded-sm font-bold text-sm text-white transition-all"
        style={{
          background: isStartMenuOpen
            ? 'linear-gradient(180deg, #1a4ba8 0%, #245edb 100%)'
            : 'linear-gradient(180deg, #3d8e2d 0%, #2d6b1f 100%)',
          boxShadow: isStartMenuOpen
            ? 'inset 1px 1px 3px rgba(0, 0, 0, 0.3)'
            : '0 1px 3px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          fontFamily: 'var(--font-tahoma)',
        }}
        onClick={handleStartClick}
        aria-label="Start menu"
      >
        {/* Windows logo */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="0" y="0" width="7" height="7" fill="#ff0000" />
          <rect x="8" y="0" width="8" height="7" fill="#00ff00" />
          <rect x="0" y="8" width="7" height="8" fill="#0000ff" />
          <rect x="8" y="8" width="8" height="8" fill="#ffff00" />
        </svg>
        <span>start</span>
      </button>

      {/* Window buttons */}
      <div className="flex-1 flex items-center gap-1 ml-1 overflow-x-auto">
        {windows.map((window) => (
          <button
            key={window.id}
            className="h-6 px-3 min-w-[120px] max-w-[160px] flex items-center text-xs text-white truncate rounded-sm transition-all"
            style={{
              background: window.isActive
                ? 'linear-gradient(180deg, #1a4ba8 0%, #245edb 100%)'
                : 'linear-gradient(180deg, #3d6db5 0%, #2d5a96 100%)',
              boxShadow: window.isActive
                ? 'inset 1px 1px 3px rgba(0, 0, 0, 0.3)'
                : '0 1px 2px rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontFamily: 'var(--font-tahoma)',
              fontWeight: window.isActive ? 'bold' : 'normal',
            }}
            onClick={() => onWindowClick(window.id)}
            aria-label={`Window: ${window.title}`}
          >
            {window.title}
          </button>
        ))}
      </div>

      {/* System tray and clock */}
      <div className="flex items-center gap-2">
        {/* Clock */}
        <div
          className="h-6 px-3 flex items-center text-xs text-white rounded-sm"
          style={{
            background: 'linear-gradient(180deg, #3d6db5 0%, #2d5a96 100%)',
            border: '1px solid rgba(0, 0, 0, 0.3)',
            boxShadow: 'inset 1px 1px 2px rgba(0, 0, 0, 0.2)',
            fontFamily: 'var(--font-tahoma)',
          }}
        >
          {formatTime(time)}
        </div>
      </div>
      </div>
    </>
  );
};
