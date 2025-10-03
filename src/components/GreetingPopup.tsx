import { useState, useEffect } from 'react';
import { X, Bot } from 'lucide-react';
import { getGreetingMessage } from '../services/chatService';

interface GreetingPopupProps {
  onOpenChat: () => void;
  onClose: () => void;
}

export const GreetingPopup: React.FC<GreetingPopupProps> = ({
  onOpenChat,
  onClose,
}) => {
  const [greeting] = useState(getGreetingMessage());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in after mount
    setTimeout(() => setIsVisible(true), 100);

    // Auto-close after 8 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for fade out animation
  };

  const handleOpenChat = () => {
    handleClose();
    setTimeout(onOpenChat, 200);
  };

  return (
    <div
      className={`fixed right-4 w-80 shadow-lg transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{
        bottom: '100px',
        zIndex: 9999,
        border: '2px solid #0053ee',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{
          background: 'linear-gradient(180deg, #0997ff 0%, #0053ee 100%)',
          borderTopLeftRadius: '6px',
          borderTopRightRadius: '6px',
        }}
      >
        <div className="flex items-center gap-2">
          <Bot size={18} className="text-white" />
          <span className="text-white font-bold text-sm">Chat Assistant</span>
        </div>
        <button
          onClick={handleClose}
          className="text-white hover:bg-white/20 rounded p-1 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex gap-3">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#0053ee' }}
          >
            <Bot size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {greeting}
            </p>
            <button
              onClick={handleOpenChat}
              className="px-4 py-2 rounded text-sm font-bold text-white transition-colors"
              style={{
                background: 'linear-gradient(180deg, #0997ff 0%, #0053ee 100%)',
                border: '1px solid #003399',
              }}
            >
              Open Chat
            </button>
          </div>
        </div>
      </div>

      {/* Footer hint */}
      <div
        className="px-4 py-2 text-xs text-gray-500 border-t"
        style={{ borderColor: '#e0e0e0' }}
      >
        Click the 🤖 Chat Assistant icon anytime to chat!
      </div>
    </div>
  );
};
