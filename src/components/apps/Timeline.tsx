import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Timeline.module.css';
import { analytics } from '../../utils/analytics';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  location: string;
  description: string;
  media: string | null;
  tags: string[];
}

const Timeline: React.FC = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    fetch('/data/timeline.json')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        analytics.trackTimelineOpen();
      })
      .catch(err => console.error('Failed to load timeline:', err));
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(events.length - 1, prev + 1));
  }, [events.length]);

  const jumpToEvent = (index: number) => {
    setCurrentIndex(index);
    if (events[index]) {
      analytics.trackTimelineJump(events[index].id);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - go to next
        goToNext();
      } else {
        // Swiped right - go to previous
        goToPrevious();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  if (events.length === 0) {
    return (
      <div className={styles.timeline}>
        <div className={styles.loading}>Loading timeline...</div>
      </div>
    );
  }

  const currentEvent = events[currentIndex];

  return (
    <div className={styles.timeline}>
      <div className={styles.header}>
        <h2>Timeline — Career Journey</h2>
        <div className={styles.progress}>
          Event {currentIndex + 1} of {events.length}
        </div>
      </div>

      <div className={styles.content}>
        <div
          className={styles.eventCard}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.eventDate}>{currentEvent.date}</div>
          <div className={styles.eventLocation}>{currentEvent.location}</div>
          <h3 className={styles.eventTitle}>{currentEvent.title}</h3>
          <p className={styles.eventDescription}>{currentEvent.description}</p>

          {currentEvent.media && (
            <img src={currentEvent.media} alt={currentEvent.title} className={styles.eventMedia} />
          )}

          <div className={styles.eventTags}>
            {currentEvent.tags.map(tag => (
              <span key={tag} className={styles.tag}>#{tag}</span>
            ))}
          </div>

          {narration && (
            <div className={styles.narration}>
              <strong>AI Narration:</strong>
              <p>{narration}</p>
            </div>
          )}

          {answer && (
            <div className={styles.answer}>
              <strong>AI Answer:</strong>
              <p>{answer}</p>
            </div>
          )}
        </div>

        <div className={styles.controls}>
          <button
            className={styles.arrow}
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            aria-label="Previous event"
          >
            ◀
          </button>

          <div className={styles.dots}>
            {events.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                onClick={() => jumpToEvent(index)}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>

          <button
            className={styles.arrow}
            onClick={goToNext}
            disabled={currentIndex === events.length - 1}
            aria-label="Next event"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
