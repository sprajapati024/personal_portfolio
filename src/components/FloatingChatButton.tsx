import styles from './FloatingChatButton.module.css';

interface FloatingChatButtonProps {
  onClick: () => void;
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={styles.floatingButton}
      aria-label="Open Chat Assistant"
    >
      <div className={styles.iconContainer}>
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Robot head */}
          <rect x="6" y="8" width="12" height="10" rx="2" fill="white" />
          {/* Eyes */}
          <circle cx="9" cy="12" r="1.5" fill="#0054e3" className={styles.eye} />
          <circle cx="15" cy="12" r="1.5" fill="#0054e3" className={styles.eye} />
          {/* Antenna */}
          <line x1="12" y1="8" x2="12" y2="5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="4" r="1.5" fill="white" className={styles.antenna} />
          {/* Mouth */}
          <path d="M 9 15 Q 12 16 15 15" stroke="#0054e3" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>

        {/* Message bubble */}
        <div className={styles.bubble}>
          <div className={styles.bubbleDot}></div>
          <div className={styles.bubbleDot}></div>
          <div className={styles.bubbleDot}></div>
        </div>
      </div>
    </button>
  );
};
