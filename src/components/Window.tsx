import { useState, useRef, useEffect, ReactNode } from 'react';

interface WindowProps {
  title: string;
  children: ReactNode;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  isMaximized?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  zIndex?: number;
  onFocus?: () => void;
  onPositionChange?: (x: number, y: number) => void;
  onSizeChange?: (width: number, height: number) => void;
}

export const Window: React.FC<WindowProps> = ({
  title,
  children,
  x = 100,
  y = 100,
  width = 400,
  height = 300,
  isMaximized = false,
  onClose,
  onMinimize,
  onMaximize,
  zIndex = 1,
  onFocus,
  onPositionChange,
  onSizeChange,
}) => {
  const [position, setPosition] = useState({ x, y });
  const [size, setSize] = useState({ width, height });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>('');
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialBounds, setInitialBounds] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // Sync external position/size changes
  useEffect(() => {
    setPosition({ x, y });
  }, [x, y]);

  useEffect(() => {
    setSize({ width, height });
  }, [width, height]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        const newX = position.x + deltaX;
        const newY = Math.max(0, position.y + deltaY); // Prevent dragging above screen

        setPosition({ x: newX, y: newY });
        onPositionChange?.(newX, newY);
        setDragStart({ x: e.clientX, y: e.clientY });
      }

      if (isResizing) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        let newX = initialBounds.x;
        let newY = initialBounds.y;
        let newWidth = initialBounds.width;
        let newHeight = initialBounds.height;

        // Handle different resize directions
        if (resizeDirection.includes('e')) {
          newWidth = Math.max(200, initialBounds.width + deltaX);
        }
        if (resizeDirection.includes('w')) {
          newWidth = Math.max(200, initialBounds.width - deltaX);
          if (newWidth > 200) {
            newX = initialBounds.x + deltaX;
          }
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(150, initialBounds.height + deltaY);
        }
        if (resizeDirection.includes('n')) {
          newHeight = Math.max(150, initialBounds.height - deltaY);
          if (newHeight > 150) {
            newY = Math.max(0, initialBounds.y + deltaY);
          }
        }

        setPosition({ x: newX, y: newY });
        setSize({ width: newWidth, height: newHeight });
        onPositionChange?.(newX, newY);
        onSizeChange?.(newWidth, newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection('');
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, position, size, isMaximized, onPositionChange, onSizeChange, resizeDirection, initialBounds]);

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (!isMaximized) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
    onFocus?.();
  };

  const handleResizeMouseDown = (direction: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isMaximized) {
      setIsResizing(true);
      setResizeDirection(direction);
      setDragStart({ x: e.clientX, y: e.clientY });
      setInitialBounds({ x: position.x, y: position.y, width: size.width, height: size.height });
    }
  };

  const effectivePosition = isMaximized
    ? { x: 0, y: 0 }
    : position;

  const effectiveSize = isMaximized
    ? { width: window.innerWidth, height: window.innerHeight - 40 }
    : size;

  return (
    <div
      ref={windowRef}
      className="absolute border-2 shadow-lg"
      style={{
        left: `${effectivePosition.x}px`,
        top: `${effectivePosition.y}px`,
        width: `${effectiveSize.width}px`,
        height: `${effectiveSize.height}px`,
        zIndex,
        background: '#c0c0c0',
        borderTopColor: '#ffffff',
        borderLeftColor: '#ffffff',
        borderRightColor: '#808080',
        borderBottomColor: '#808080',
        boxShadow: 'var(--shadow-window)',
      }}
    >
      {/* Title Bar */}
      <div
        className="h-6 px-1 flex items-center justify-between cursor-move select-none"
        style={{
          background: 'var(--window-title-bg)',
          fontFamily: 'var(--font-tahoma)',
        }}
        onMouseDown={handleTitleBarMouseDown}
        onClick={onFocus}
      >
        <span className="text-xs font-bold text-white">{title}</span>
        <div className="flex gap-0.5">
          {/* Minimize */}
          <button
            className="w-4 h-4 text-xs font-bold flex items-center justify-center"
            style={{
              background: '#c0c0c0',
              border: '1px solid',
              borderTopColor: '#ffffff',
              borderLeftColor: '#ffffff',
              borderRightColor: '#000000',
              borderBottomColor: '#000000',
            }}
            onClick={(e) => {
              e.stopPropagation();
              onMinimize?.();
            }}
            aria-label="Minimize"
          >
            <span className="text-black">_</span>
          </button>
          {/* Maximize/Restore */}
          <button
            className="w-4 h-4 text-xs font-bold flex items-center justify-center"
            style={{
              background: '#c0c0c0',
              border: '1px solid',
              borderTopColor: '#ffffff',
              borderLeftColor: '#ffffff',
              borderRightColor: '#000000',
              borderBottomColor: '#000000',
            }}
            onClick={(e) => {
              e.stopPropagation();
              onMaximize?.();
            }}
            aria-label={isMaximized ? 'Restore' : 'Maximize'}
          >
            <span className="text-black">□</span>
          </button>
          {/* Close */}
          <button
            className="w-4 h-4 text-xs font-bold flex items-center justify-center"
            style={{
              background: '#c0c0c0',
              border: '1px solid',
              borderTopColor: '#ffffff',
              borderLeftColor: '#ffffff',
              borderRightColor: '#000000',
              borderBottomColor: '#000000',
            }}
            onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}
            aria-label="Close"
          >
            <span className="text-black">×</span>
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div
        className="p-2 overflow-auto"
        style={{
          height: 'calc(100% - 24px)',
          background: '#ffffff',
        }}
      >
        {children}
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          {/* Corners */}
          <div
            className="absolute top-0 left-0 w-2 h-2 cursor-nwse-resize"
            onMouseDown={handleResizeMouseDown('nw')}
            aria-label="Resize northwest"
          />
          <div
            className="absolute top-0 right-0 w-2 h-2 cursor-nesw-resize"
            onMouseDown={handleResizeMouseDown('ne')}
            aria-label="Resize northeast"
          />
          <div
            className="absolute bottom-0 left-0 w-2 h-2 cursor-nesw-resize"
            onMouseDown={handleResizeMouseDown('sw')}
            aria-label="Resize southwest"
          />
          <div
            className="absolute bottom-0 right-0 w-2 h-2 cursor-nwse-resize"
            onMouseDown={handleResizeMouseDown('se')}
            aria-label="Resize southeast"
          />

          {/* Edges */}
          <div
            className="absolute top-0 left-2 right-2 h-1 cursor-ns-resize"
            onMouseDown={handleResizeMouseDown('n')}
            aria-label="Resize north"
          />
          <div
            className="absolute bottom-0 left-2 right-2 h-1 cursor-ns-resize"
            onMouseDown={handleResizeMouseDown('s')}
            aria-label="Resize south"
          />
          <div
            className="absolute left-0 top-2 bottom-2 w-1 cursor-ew-resize"
            onMouseDown={handleResizeMouseDown('w')}
            aria-label="Resize west"
          />
          <div
            className="absolute right-0 top-2 bottom-2 w-1 cursor-ew-resize"
            onMouseDown={handleResizeMouseDown('e')}
            aria-label="Resize east"
          />
        </>
      )}
    </div>
  );
};
