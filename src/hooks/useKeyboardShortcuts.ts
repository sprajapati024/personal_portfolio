import { useEffect } from 'react';

interface KeyboardShortcutsConfig {
  onMinimizeActive?: () => void;
  onCloseActive?: () => void;
  onCycleWindows?: () => void;
  onOpenStartMenu?: () => void;
}

export const useKeyboardShortcuts = (config: KeyboardShortcutsConfig) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + F4 - Close active window
      if (e.altKey && e.key === 'F4') {
        e.preventDefault();
        config.onCloseActive?.();
      }

      // Alt + Space - Minimize active window
      if (e.altKey && e.key === ' ') {
        e.preventDefault();
        config.onMinimizeActive?.();
      }

      // Alt + Tab - Cycle through windows
      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        config.onCycleWindows?.();
      }

      // Ctrl + Esc or Windows key - Open Start menu
      if ((e.ctrlKey && e.key === 'Escape') || e.key === 'Meta') {
        e.preventDefault();
        config.onOpenStartMenu?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [config]);
};
