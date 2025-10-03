import { useState, useCallback } from 'react';

export interface WindowState {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  visible: boolean;
  // Store original dimensions for restore
  originalX?: number;
  originalY?: number;
  originalWidth?: number;
  originalHeight?: number;
}

export interface UseWindowManagerResult {
  windows: WindowState[];
  openWindow: (window: Omit<WindowState, 'zIndex' | 'isMinimized' | 'isMaximized'>) => void;
  closeWindow: (id: string) => void;
  reopenWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  bringToFront: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
}

export const useWindowManager = (
  initialWindows: WindowState[] = []
): UseWindowManagerResult => {
  const [windows, setWindows] = useState<WindowState[]>(initialWindows);
  const [maxZIndex, setMaxZIndex] = useState(
    Math.max(...initialWindows.map((w) => w.zIndex), 0)
  );

  const openWindow = useCallback(
    (window: Omit<WindowState, 'zIndex' | 'isMinimized' | 'isMaximized'>) => {
      const newZIndex = maxZIndex + 1;
      setMaxZIndex(newZIndex);
      setWindows((prev) => [
        ...prev,
        {
          ...window,
          zIndex: newZIndex,
          isMinimized: false,
          isMaximized: false,
        },
      ]);
    },
    [maxZIndex]
  );

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, visible: false } : w)));
  }, []);

  const reopenWindow = useCallback(
    (id: string) => {
      const newZIndex = maxZIndex + 1;
      setMaxZIndex(newZIndex);
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? {
                ...w,
                visible: true,
                isMinimized: false,
                isMaximized: false,
                zIndex: newZIndex,
                // Restore original dimensions if window was maximized
                ...(w.isMaximized && w.originalWidth ? {
                  x: w.originalX!,
                  y: w.originalY!,
                  width: w.originalWidth,
                  height: w.originalHeight!,
                } : {})
              }
            : w
        )
      );
    },
    [maxZIndex]
  );

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              isMaximized: true,
              // Store original dimensions before maximizing
              originalX: w.x,
              originalY: w.y,
              originalWidth: w.width,
              originalHeight: w.height,
              x: 0,
              y: 0,
              width: window.innerWidth,
              height: window.innerHeight - 32, // Account for taskbar
            }
          : w
      )
    );
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              isMinimized: false,
              isMaximized: false,
              // Restore original dimensions if they exist
              ...(w.originalWidth ? {
                x: w.originalX!,
                y: w.originalY!,
                width: w.originalWidth,
                height: w.originalHeight!,
              } : {})
            }
          : w
      )
    );
  }, []);

  const bringToFront = useCallback(
    (id: string) => {
      const newZIndex = maxZIndex + 1;
      setMaxZIndex(newZIndex);
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, zIndex: newZIndex } : w))
      );
    },
    [maxZIndex]
  );

  const updateWindowPosition = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, x, y } : w))
    );
  }, []);

  const updateWindowSize = useCallback((id: string, width: number, height: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, width, height } : w))
    );
  }, []);

  return {
    windows,
    openWindow,
    closeWindow,
    reopenWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    bringToFront,
    updateWindowPosition,
    updateWindowSize,
  };
};
