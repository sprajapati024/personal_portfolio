import { useState } from 'react';
import { BootSequence } from './components/BootSequence';
import { Desktop } from './components/Desktop';
import { Window } from './components/Window';
import { Taskbar } from './components/Taskbar';
import { ContactInfo } from './components/sections/Contact';
import { ProjectsExplorer } from './components/ProjectsExplorer';
import { ImpactWindow } from './components/ImpactWindow';
import { NowWindow } from './components/NowWindow';
import { AboutWindow } from './components/AboutWindow';
import { ContactWindow } from './components/ContactWindow';
import { ChatAssistant } from './components/ChatAssistant';
import { GreetingPopup } from './components/GreetingPopup';
import { FloatingChatButton } from './components/FloatingChatButton';
import { MurallPromptWindow } from './components/MurallPromptWindow';
import { MurallPreviewWindow } from './components/MurallPreviewWindow';
import Timeline from './components/apps/Timeline';
import { useWindowManager } from './hooks/useWindowManager';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import type { DesktopIconProps } from './components/DesktopIcon';
import { generateWallpaper, type MurallError } from './services/murallService';

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
  const [showGreeting, setShowGreeting] = useState(false);
  const [chatJustOpened, setChatJustOpened] = useState(false);

  // Murall state
  const [wallpaperUrl, setWallpaperUrl] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [revisedPrompt, setRevisedPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

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
      x: 150,
      y: 50,
      width: 840,
      height: 700,
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
      isMinimized: true,
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
      isMinimized: true,
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
      id: 'chat',
      title: 'Chat Assistant',
      x: window.innerWidth - 360,
      y: window.innerHeight - 540,
      width: 340,
      height: 450,
      zIndex: 7,
      isMinimized: true,
      isMaximized: false,
      visible: true,
    },
    {
      id: 'murall-prompt',
      title: 'Murall — Prompt',
      x: 100,
      y: 100,
      width: 450,
      height: 650,
      zIndex: 8,
      isMinimized: true,
      isMaximized: false,
      visible: true,
    },
    {
      id: 'murall-preview',
      title: 'Murall — Preview',
      x: 570,
      y: 100,
      width: 600,
      height: 650,
      zIndex: 9,
      isMinimized: true,
      isMaximized: false,
      visible: true,
    },
    {
      id: 'timeline',
      title: 'Timeline',
      x: 120,
      y: 80,
      width: 700,
      height: 550,
      zIndex: 10,
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
      id: 'chat',
      icon: '🤖',
      label: 'Chat Assistant',
      isSelected: selectedIconId === 'chat',
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
      id: 'murall',
      icon: '🖼',
      label: 'Murall',
      isSelected: selectedIconId === 'murall',
      onClick: (id) => setSelectedIconId(id),
      onDoubleClick: () => {
        // Open both Murall windows simultaneously
        const promptWin = windows.find(w => w.id === 'murall-prompt');
        const previewWin = windows.find(w => w.id === 'murall-preview');

        if (!promptWin?.visible) reopenWindow('murall-prompt');
        else if (promptWin?.isMinimized) restoreWindow('murall-prompt');
        else bringToFront('murall-prompt');

        if (!previewWin?.visible) reopenWindow('murall-preview');
        else if (previewWin?.isMinimized) restoreWindow('murall-preview');
        else bringToFront('murall-preview');
      },
    },
    {
      id: 'timeline',
      icon: '📅',
      label: 'Timeline',
      isSelected: selectedIconId === 'timeline',
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
      // Trigger animation for chat window
      if (id === 'chat') {
        setChatJustOpened(true);
        setTimeout(() => setChatJustOpened(false), 400);
      }
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

  const handleOpenWindow = (windowId: string) => {
    // Handle Murall.exe specially - open both windows
    if (windowId === 'murall') {
      const promptWin = windows.find(w => w.id === 'murall-prompt');
      const previewWin = windows.find(w => w.id === 'murall-preview');

      if (!promptWin?.visible) reopenWindow('murall-prompt');
      else if (promptWin?.isMinimized) restoreWindow('murall-prompt');
      else bringToFront('murall-prompt');

      if (!previewWin?.visible) reopenWindow('murall-preview');
      else if (previewWin?.isMinimized) restoreWindow('murall-preview');
      else bringToFront('murall-preview');
      return;
    }

    const win = windows.find(w => w.id === windowId);
    if (!win?.visible) {
      reopenWindow(windowId);
    } else if (win?.isMinimized) {
      restoreWindow(windowId);
    } else {
      bringToFront(windowId);
    }
  };

  const handleOpenProject = (_projectSlug: string) => {
    // Logic to open project detail - for now just open projects explorer
    handleOpenWindow('projects-explorer');
  };

  // Murall handlers
  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    setGenerationError(null);

    try {
      const result = await generateWallpaper({ prompt });
      setGeneratedImageUrl(result.imageUrl);
      setRevisedPrompt(result.revisedPrompt || '');
    } catch (error) {
      const murallError = error as MurallError;
      setGenerationError(murallError.message || 'Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSetWallpaper = (imageUrl: string) => {
    setWallpaperUrl(imageUrl);
  };

  const handleClearError = () => {
    setGenerationError(null);
  };

  const renderWindowContent = (id: string) => {
    switch (id) {
      case 'about':
        return <AboutWindow onOpenWindow={handleOpenWindow} />;
      case 'projects-explorer':
        return <ProjectsExplorer />;
      case 'impact':
        return <ImpactWindow />;
      case 'now':
        return <NowWindow />;
      case 'contact':
        return <ContactWindow />;
      case 'chat':
        return (
          <ChatAssistant
            onOpenProject={handleOpenProject}
            onOpenWindow={handleOpenWindow}
          />
        );
      case 'murall-prompt':
        return (
          <MurallPromptWindow
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        );
      case 'murall-preview':
        return (
          <MurallPreviewWindow
            imageUrl={generatedImageUrl}
            revisedPrompt={revisedPrompt}
            error={generationError}
            onSetWallpaper={handleSetWallpaper}
            onClearError={handleClearError}
          />
        );
      case 'timeline':
        return <Timeline />;
      default:
        return null;
    }
  };

  // Boot sequence
  if (stage === 'boot') {
    return <BootSequence onComplete={() => {
      setStage('desktop');
      // Show greeting popup 2 seconds after boot
      setTimeout(() => setShowGreeting(true), 2000);
    }} />;
  }

  // Desktop
  return (
    <Desktop
      icons={desktopIcons}
      onDesktopClick={() => setSelectedIconId(null)}
      wallpaperUrl={wallpaperUrl}
    >
      {windows.map(
        (win) =>
          win.visible && !win.isMinimized && (
            <div
              key={win.id}
              className={win.id === 'chat' && chatJustOpened ? 'chat-window-enter' : ''}
              style={{
                animation: win.id === 'chat' && chatJustOpened
                  ? 'chatPopOut 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  : 'none',
              }}
            >
              <Window
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
            </div>
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

      {/* Floating Chat Button */}
      <FloatingChatButton onClick={() => handleOpenWindow('chat')} />

      {/* Greeting Popup */}
      {showGreeting && (
        <GreetingPopup
          onOpenChat={() => handleOpenWindow('chat')}
          onClose={() => setShowGreeting(false)}
        />
      )}
    </Desktop>
  );
}

export default App
