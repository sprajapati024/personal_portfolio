import { ReactNode } from 'react';
import { DesktopIcon, DesktopIconProps } from './DesktopIcon';

interface DesktopProps {
  children: ReactNode;
  icons?: DesktopIconProps[];
}

export const Desktop: React.FC<DesktopProps> = ({ children, icons = [] }) => {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{
        background: 'linear-gradient(180deg, #5a7fbe 0%, #3d5a96 100%)',
      }}
    >
      {/* Desktop Icons Area */}
      <div className="absolute top-2 left-2 flex flex-col flex-wrap gap-1 h-[calc(100vh-40px)]">
        {icons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            icon={icon.icon}
            label={icon.label}
            onDoubleClick={icon.onDoubleClick}
            onClick={icon.onClick}
          />
        ))}
      </div>

      {/* Windows Container */}
      {children}
    </div>
  );
};
