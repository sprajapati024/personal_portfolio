import { useEffect, useState } from 'react';

interface LoginSplashProps {
  onComplete: () => void;
  autoAdvanceDelay?: number; // in milliseconds
}

export const LoginSplash: React.FC<LoginSplashProps> = ({
  onComplete,
  autoAdvanceDelay = 1500,
}) => {
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    // Auto-advance after delay
    const timer = setTimeout(() => {
      if (!isSkipped) {
        onComplete();
      }
    }, autoAdvanceDelay);

    return () => clearTimeout(timer);
  }, [autoAdvanceDelay, onComplete, isSkipped]);

  const handleSkip = () => {
    setIsSkipped(true);
    onComplete();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
      handleSkip();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #5a7fbe 0%, #3d5a96 100%)',
      }}
      onClick={handleSkip}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label="Login splash screen, click or press any key to skip"
    >
      <div className="text-center text-white">
        {/* Windows XP Logo Style */}
        <div className="mb-8">
          <div className="text-6xl font-bold mb-2" style={{ fontFamily: 'var(--font-trebuchet)' }}>
            Windows
          </div>
          <div className="text-4xl font-light" style={{ fontFamily: 'var(--font-trebuchet)' }}>
            <span style={{ color: '#4a9eff' }}>XP</span>
          </div>
        </div>

        {/* Welcome message */}
        <div className="text-xl mb-4" style={{ fontFamily: 'var(--font-tahoma)' }}>
          Welcome
        </div>

        {/* Loading indicator */}
        <div className="flex justify-center items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
        </div>

        {/* Skip hint */}
        <div className="mt-8 text-sm opacity-70" style={{ fontFamily: 'var(--font-tahoma)' }}>
          Click anywhere or press any key to skip
        </div>
      </div>
    </div>
  );
};
