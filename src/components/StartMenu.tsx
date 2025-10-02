import React, { useState } from 'react'

interface StartMenuProps {
  onMenuItemClick?: (item: string) => void
}

export const StartMenu: React.FC<StartMenuProps> = ({ onMenuItemClick }) => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { name: 'Programs', icon: '📁' },
    { name: 'Documents', icon: '📄' },
    { name: 'Settings', icon: '⚙️' },
    { name: 'Find', icon: '🔍' },
    { name: 'Help', icon: '❓' },
    { name: 'Run...', icon: '▶️' },
    { separator: true },
    { name: 'Shut Down...', icon: '🔌' },
  ]

  return (
    <div className="fixed bottom-0 left-0 w-full">
      {/* Start Menu Popup */}
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-0.5 bg-win95-gray border-2 border-win95-white shadow-window w-48">
          {/* Menu Header */}
          <div className="bg-gradient-to-r from-win95-navy to-[#1084d0] text-white px-2 py-4 font-bold text-win95-lg flex items-end">
            <span className="rotate-[-90deg] origin-bottom-left translate-y-[-20px] translate-x-2">
              Windows 95
            </span>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item, index) => {
              if ('separator' in item && item.separator) {
                return (
                  <div
                    key={index}
                    className="border-t border-win95-darkgray mx-1 my-1"
                  />
                )
              }
              return (
                <button
                  key={index}
                  className="w-full text-left px-8 py-1 text-win95-sm hover:bg-win95-navy hover:text-white flex items-center gap-2"
                  onClick={() => {
                    if (item.name) {
                      onMenuItemClick?.(item.name)
                    }
                    setIsOpen(false)
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="bg-win95-gray border-t-2 border-win95-white h-7 flex items-center px-0.5 shadow-[inset_0_2px_0_#ffffff]">
        <button
          className={`bg-win95-gray border-2 border-win95-white shadow-raised px-2 py-0.5 flex items-center gap-1 text-win95-sm font-bold hover:bg-[#d4d4d4] ${
            isOpen ? 'shadow-pressed' : ''
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Crect fill='%23ff0000' width='6' height='6' x='0' y='0'/%3E%3Crect fill='%2300ff00' width='6' height='6' x='8' y='0'/%3E%3Crect fill='%230000ff' width='6' height='6' x='0' y='8'/%3E%3Crect fill='%23ffff00' width='6' height='6' x='8' y='8'/%3E%3C/svg%3E"
            alt="Windows"
            className="w-4 h-4"
          />
          Start
        </button>

        {/* Taskbar time */}
        <div className="ml-auto border-2 border-win95-darkgray bg-white px-2 text-win95-sm">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}
