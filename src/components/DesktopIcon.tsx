import { useState } from 'react';
import { analytics } from '../utils/analytics';

export interface DesktopIconProps {
  id: string;
  icon: string; // Emoji or image URL
  label: string;
  isSelected?: boolean;
  onDoubleClick: (id: string) => void;
  onClick?: (id: string) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  icon,
  label,
  isSelected = false,
  onDoubleClick,
  onClick,
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<number | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent desktop click handler from firing
    onClick?.(id);

    // Handle double-click detection
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    if (newClickCount === 2) {
      // Double-click detected
      analytics.trackDesktopIconClick(id);
      onDoubleClick(id);
      setClickCount(0);
      setClickTimer(null);
    } else {
      // Wait for potential second click
      const timer = setTimeout(() => {
        setClickCount(0);
        setClickTimer(null);
      }, 300);
      setClickTimer(timer);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onDoubleClick(id);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-20 h-20 p-2 cursor-pointer group"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Desktop icon: ${label}`}
      style={{
        background: isSelected ? 'rgba(0, 84, 227, 0.3)' : 'transparent',
        border: isSelected ? '1px dotted rgba(255, 255, 255, 0.5)' : '1px solid transparent',
      }}
    >
      {/* Icon */}
      <div className="text-4xl mb-1 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
        {icon.startsWith('http') ? (
          <img src={icon} alt={label} className="w-8 h-8" />
        ) : (
          <span>{icon}</span>
        )}
      </div>

      {/* Label */}
      <div
        className="text-center text-xs text-white font-semibold max-w-full break-words leading-tight"
        style={{
          fontFamily: 'var(--font-tahoma)',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
        }}
      >
        {label}
      </div>
    </div>
  );
};
