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
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
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

        const newWidth = Math.max(200, size.width + deltaX);
        const newHeight = Math.max(150, size.height + deltaY);

        setSize({ width: newWidth, height: newHeight });
        onSizeChange?.(newWidth, newHeight);
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, position, size, isMaximized, onPositionChange, onSizeChange]);

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (!isMaximized) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
    onFocus?.();
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isMaximized) {
      setIsResizing(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const effectivePosition = isMaximized
    ? { x: 0, y: 0 }
    : position;

  const effectiveSize = isMaximized
    ? { width: window.innerWidth, height: window.innerHeight - 32 }
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

      {/* Resize Handle */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
          style={{
            background: 'transparent',
          }}
          onMouseDown={handleResizeMouseDown}
          aria-label="Resize"
        />
      )}
    </div>
  );
};
