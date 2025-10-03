import { useState } from 'react';
import { BootSequence } from './components/BootSequence';
import { Desktop } from './components/Desktop';
import { Window } from './components/Window';
import { Taskbar } from './components/Taskbar';
import { PopmeltBadge } from './components/PopmeltBadge';
import { ContactInfo } from './components/sections/Contact';
import { ProjectsExplorer } from './components/ProjectsExplorer';
import { ImpactWindow } from './components/ImpactWindow';
import { NowWindow } from './components/NowWindow';
import { AboutWindow } from './components/AboutWindow';
import { ContactWindow } from './components/ContactWindow';
import { ChangelogWindow } from './components/ChangelogWindow';
import { useWindowManager } from './hooks/useWindowManager';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import type { DesktopIconProps } from './components/DesktopIcon';

// Portfolio Data Props Interface
export interface PortfolioData {
  name: string
  bio: string
  contact: ContactInfo
}

type AppStage = 'boot' | 'desktop';

function App() {
  const [stage, setStage] = useState<AppStage>('boot');
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);

  const {
    windows,
    closeWindow,
    reopenWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    bringToFront,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowManager([
    {
      id: 'about',
      title: 'About Me.exe',
      x: 50,
      y: 50,
      width: 500,
      height: 450,
      zIndex: 1,
      isMinimized: false,
      isMaximized: false,
      visible: true,
    },
    {
      id: 'projects-explorer',
      title: 'Projects Explorer.exe',
      x: 100,
      y: 80,
      width: 800,
      height: 600,
      zIndex: 4,
      isMinimized: false,
      isMaximized: false,
      visible: true,
    },
    {
      id: 'contact',
      title: 'Contact.exe',
      x: 200,
      y: 250,
      width: 350,
      height: 350,
      zIndex: 3,
      isMinimized: false,
      isMaximized: false,
      visible: true,
    },
    {
      id: 'impact',
      title: 'Impact.exe',
      x: 150,
      y: 100,
      width: 600,
      height: 450,
      zIndex: 5,
      isMinimized: true,
      isMaximized: false,
      visible: true,
    },
    {
      id: 'now',
      title: 'Now.exe',
      x: 300,
      y: 150,
      width: 450,
      height: 500,
      zIndex: 6,
      isMinimized: true,
      isMaximized: false,
      visible: true,
    },
    {
      id: 'changelog',
      title: 'Changelog.exe',
      x: 400,
      y: 120,
      width: 500,
      height: 400,
      zIndex: 7,
      isMinimized: true,
      isMaximized: false,
      visible: true,
    },
  ]);

  // Desktop icons per design-system.md
  const desktopIcons: DesktopIconProps[] = [
    {
      id: 'projects-explorer',
      icon: '📁',
      label: 'Projects',
      isSelected: selectedIconId === 'projects-explorer',
      onClick: (id) => setSelectedIconId(id),
      onDoubleClick: (id) => {
        const win = windows.find(w => w.id === id);
        if (!win?.visible) {
          reopenWindow(id);
        } else if (win?.isMinimized) {
          restoreWindow(id);
        } else {
          bringToFront(id);
        }
      },
    },
    {
      id: 'about',
      icon: '👤',
      label: 'About',
      isSelected: selectedIconId === 'about',
      onClick: (id) => setSelectedIconId(id),
      onDoubleClick: (id) => {
        const win = windows.find(w => w.id === id);
        if (!win?.visible) {
          reopenWindow(id);
        } else if (win?.isMinimized) {
          restoreWindow(id);
        } else {
          bringToFront(id);
        }
      },
    },
    {
      id: 'impact',
      icon: '📊',
      label: 'Impact',
      isSelected: selectedIconId === 'impact',
      onClick: (id) => setSelectedIconId(id),
      onDoubleClick: (id) => {
        const win = windows.find(w => w.id === id);
        if (!win?.visible) {
          reopenWindow(id);
        } else if (win?.isMinimized) {
          restoreWindow(id);
        } else {
          bringToFront(id);
        }
      },
    },
    {
      id: 'now',
      icon: '🎯',
      label: 'Now',
      isSelected: selectedIconId === 'now',
      onClick: (id) => setSelectedIconId(id),
      onDoubleClick: (id) => {
        const win = windows.find(w => w.id === id);
        if (!win?.visible) {
          reopenWindow(id);
        } else if (win?.isMinimized) {
          restoreWindow(id);
        } else {
          bringToFront(id);
        }
      },
    },
    {
      id: 'contact',
      icon: '📧',
      label: 'Contact',
      isSelected: selectedIconId === 'contact',
      onClick: (id) => setSelectedIconId(id),
      onDoubleClick: (id) => {
        const win = windows.find(w => w.id === id);
        if (!win?.visible) {
          reopenWindow(id);
        } else if (win?.isMinimized) {
          restoreWindow(id);
        } else {
          bringToFront(id);
        }
      },
    },
    {
      id: 'changelog',
      icon: '📝',
      label: 'Changelog',
      isSelected: selectedIconId === 'changelog',
      onClick: (id) => setSelectedIconId(id),
      onDoubleClick: (id) => {
        const win = windows.find(w => w.id === id);
        if (!win?.visible) {
          reopenWindow(id);
        } else if (win?.isMinimized) {
          restoreWindow(id);
        } else {
          bringToFront(id);
        }
      },
    },
  ];

  const handleWindowClick = (id: string) => {
    const win = windows.find(w => w.id === id);
    if (!win?.visible) {
      reopenWindow(id);
    } else if (win?.isMinimized) {
      restoreWindow(id);
    } else {
      bringToFront(id);
    }
  };

  const handleWindowMaximize = (id: string) => {
    const win = windows.find(w => w.id === id);
    if (win?.isMaximized) {
      restoreWindow(id);
    } else {
      maximizeWindow(id);
    }
  };

  // Keyboard shortcuts
  const getActiveWindow = () => {
    const maxZ = Math.max(...windows.map(w => w.zIndex));
    return windows.find(w => w.zIndex === maxZ && w.visible && !w.isMinimized);
  };

  useKeyboardShortcuts({
    onCloseActive: () => {
      const activeWin = getActiveWindow();
      if (activeWin) closeWindow(activeWin.id);
    },
    onMinimizeActive: () => {
      const activeWin = getActiveWindow();
      if (activeWin) minimizeWindow(activeWin.id);
    },
    onCycleWindows: () => {
      const visibleWindows = windows.filter(w => w.visible && !w.isMinimized);
      if (visibleWindows.length > 0) {
        const activeWin = getActiveWindow();
        const currentIndex = visibleWindows.findIndex(w => w.id === activeWin?.id);
        const nextIndex = (currentIndex + 1) % visibleWindows.length;
        bringToFront(visibleWindows[nextIndex].id);
      }
    },
    onOpenStartMenu: () => {
      // Start menu toggle handled by Taskbar component
      console.log('Start menu shortcut pressed');
    },
  });

  const renderWindowContent = (id: string) => {
    switch (id) {
      case 'about':
        return <AboutWindow />;
      case 'projects-explorer':
        return <ProjectsExplorer />;
      case 'impact':
        return <ImpactWindow />;
      case 'now':
        return <NowWindow />;
      case 'contact':
        return <ContactWindow />;
      case 'changelog':
        return <ChangelogWindow />;
      default:
        return null;
    }
  };

  // Boot sequence
  if (stage === 'boot') {
    return <BootSequence onComplete={() => setStage('desktop')} />;
  }

  // Desktop
  return (
    <Desktop
      icons={desktopIcons}
      onDesktopClick={() => setSelectedIconId(null)}
    >
      {windows.map(
        (win) =>
          win.visible && !win.isMinimized && (
            <Window
              key={win.id}
              title={win.title}
              x={win.x}
              y={win.y}
              width={win.width}
              height={win.height}
              isMaximized={win.isMaximized}
              zIndex={win.zIndex}
              onFocus={() => bringToFront(win.id)}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onMaximize={() => handleWindowMaximize(win.id)}
              onPositionChange={(x, y) => updateWindowPosition(win.id, x, y)}
              onSizeChange={(width, height) => updateWindowSize(win.id, width, height)}
            >
              {renderWindowContent(win.id)}
            </Window>
          )
      )}
      <Taskbar
        windows={windows
          .filter(w => w.visible)
          .map(w => ({
            id: w.id,
            title: w.title,
            isActive: w.zIndex === Math.max(...windows.map(win => win.zIndex)),
            isMinimized: w.isMinimized,
          }))}
        onWindowClick={handleWindowClick}
        onStartMenuItemClick={handleWindowClick}
      />
      <PopmeltBadge />
    </Desktop>
  );
}

export default App
