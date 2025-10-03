import { Bot } from 'lucide-react';
import { useState } from 'react';

interface FloatingChatButtonProps {
  onClick: () => void;
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-10 right-4 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
      style={{
        background: isHovered
          ? 'linear-gradient(180deg, #0bb0ff 0%, #0066ff 100%)'
          : 'linear-gradient(180deg, #0997ff 0%, #0053ee 100%)',
        border: '2px solid #003399',
        zIndex: 9998,
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      }}
      aria-label="Open Chat Assistant"
    >
      <Bot size={28} className="text-white" />

      {/* Pulse animation ring */}
      <div
        className="absolute inset-0 rounded-full animate-ping"
        style={{
          background: 'rgba(9, 151, 255, 0.4)',
          animationDuration: '2s',
        }}
      />
    </button>
  );
};
