import { useEffect, useState } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
  duration?: number; // in milliseconds
}

export const BootSequence: React.FC<BootSequenceProps> = ({
  onComplete,
  duration = 2000,
}) => {
  const [progress, setProgress] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    const interval = 50; // Update every 50ms
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300); // Small delay after reaching 100%
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration, onComplete]);

  const handleSkip = () => {
    if (!isSkipped) {
      setIsSkipped(true);
      onComplete();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
      handleSkip();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black"
      onClick={handleSkip}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label="Boot sequence, click or press any key to skip"
    >
      <div className="text-center">
        {/* Windows XP Logo */}
        <div className="mb-12 text-white">
          <div className="text-5xl font-bold mb-2" style={{ fontFamily: 'var(--font-trebuchet)' }}>
            Microsoft
            <span style={{ color: '#4a9eff' }}> Windows</span>
          </div>
          <div className="text-2xl font-light" style={{ fontFamily: 'var(--font-trebuchet)' }}>
            <span style={{ color: '#4a9eff' }}>XP</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <div
            className="h-4 bg-gray-800 rounded-sm overflow-hidden"
            style={{
              border: '1px solid #555',
            }}
          >
            <div
              className="h-full transition-all duration-100 ease-linear"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #0054e3 0%, #4a9eff 100%)',
                boxShadow: '0 0 10px rgba(74, 158, 255, 0.5)',
              }}
            />
          </div>

          {/* Loading text */}
          <div className="mt-4 text-white text-sm" style={{ fontFamily: 'var(--font-tahoma)' }}>
            Loading...
          </div>
        </div>

        {/* Skip hint */}
        <div className="mt-8 text-gray-500 text-xs" style={{ fontFamily: 'var(--font-tahoma)' }}>
          Press any key to skip
        </div>
      </div>
    </div>
  );
};
