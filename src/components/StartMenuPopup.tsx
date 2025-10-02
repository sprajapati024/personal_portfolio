interface StartMenuPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (itemId: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  separator?: boolean;
}

export const StartMenuPopup: React.FC<StartMenuPopupProps> = ({
  isOpen,
  onClose,
  onItemClick,
}) => {
  if (!isOpen) return null;

  const menuItems: MenuItem[] = [
    { id: 'projects-explorer', label: 'Projects', icon: '📁' },
    { id: 'impact', label: 'Impact', icon: '📊' },
    { id: 'now', label: 'Now', icon: '🎯' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'contact', label: 'Contact', icon: '📧' },
    { id: 'changelog', label: 'Changelog', icon: '📝' },
  ];

  const handleItemClick = (itemId: string) => {
    onItemClick(itemId);
    onClose();
  };

  return (
    <>
      {/* Backdrop to close menu when clicking outside */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        style={{ background: 'transparent' }}
      />

      {/* Start Menu */}
      <div
        className="fixed bottom-8 left-0 z-50 w-64 border-2 shadow-lg"
        style={{
          background: '#c0c0c0',
          borderTopColor: '#ffffff',
          borderLeftColor: '#ffffff',
          borderRightColor: '#000000',
          borderBottomColor: '#000000',
          fontFamily: 'var(--font-tahoma)',
        }}
      >
        {/* Sidebar */}
        <div
          className="flex"
          style={{
            background: 'linear-gradient(90deg, #245edb 0%, #1941a5 100%)',
            padding: '8px',
            borderBottom: '1px solid #808080',
          }}
        >
          <div
            className="text-white font-bold text-lg transform -rotate-90 origin-bottom-left"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              paddingLeft: '8px',
            }}
          >
            Windows XP
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-blue-600 hover:text-white transition-colors"
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '14px',
              }}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}

          {/* Separator */}
          <div className="border-t border-gray-400 my-2 mx-2" />

          {/* System items */}
          <button
            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-blue-600 hover:text-white transition-colors opacity-50 cursor-not-allowed"
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '14px',
            }}
            disabled
          >
            <span className="text-xl">⚙️</span>
            <span>Settings</span>
          </button>
        </div>
      </div>
    </>
  );
};
