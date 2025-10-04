import { ReactNode } from 'react';
import { DesktopIcon, DesktopIconProps } from './DesktopIcon';
import { WeatherWidget } from './WeatherWidget';

interface DesktopProps {
  children: ReactNode;
  icons?: DesktopIconProps[];
  onDesktopClick?: () => void;
  wallpaperUrl?: string | null;
}

export const Desktop: React.FC<DesktopProps> = ({
  children,
  icons = [],
  onDesktopClick,
  wallpaperUrl
}) => {
  const handleDesktopClick = () => {
    onDesktopClick?.();
  };

  // Default gradient background
  const defaultBackground = 'linear-gradient(180deg, #5a7fbe 0%, #3d5a96 100%)';

  // Use wallpaper if available, otherwise use default
  const backgroundStyle = wallpaperUrl
    ? {
        backgroundImage: `url(${wallpaperUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : { background: defaultBackground };

  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      onClick={handleDesktopClick}
      style={backgroundStyle}
    >
      {/* Desktop Icons Area */}
      <div className="absolute top-2 left-2 flex flex-col flex-wrap gap-1 h-[calc(100vh-40px)]">
        {icons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            icon={icon.icon}
            label={icon.label}
            isSelected={icon.isSelected}
            onDoubleClick={icon.onDoubleClick}
            onClick={icon.onClick}
          />
        ))}
      </div>

      {/* Weather Widget */}
      <WeatherWidget />

      {/* Windows Container */}
      {children}
    </div>
  );
};
