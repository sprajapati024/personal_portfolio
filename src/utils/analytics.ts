// Analytics utility for tracking user interactions
// Follows design-system.md analytics events spec

export type AnalyticsEvent =
  | { event: 'desktop_icon_click'; iconId: string }
  | { event: 'project_open'; slug: string }
  | { event: 'tab_viewed'; slug: string; tab: string }
  | { event: 'contact_click'; channel: string }
  | { event: 'resume_click' }
  | { event: 'window_opened'; windowId: string }
  | { event: 'window_closed'; windowId: string };

class Analytics {
  /**
   * Track an analytics event
   */
  track(eventData: AnalyticsEvent): void {
    // Always log in console for development
    console.log('[Analytics]', eventData);

    // In production, also send to analytics service
    if (typeof window !== 'undefined') {
      this.sendToAnalytics(eventData);
    }
  }

  /**
   * Send event to analytics service
   */
  private sendToAnalytics(eventData: AnalyticsEvent): void {
    // Example Plausible implementation
    if (typeof window !== 'undefined' && (window as any).plausible) {
      const { event, ...props } = eventData;
      (window as any).plausible(event, { props });
    }

    // Example custom endpoint
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(eventData),
    // });
  }

  /**
   * Track desktop icon click
   */
  trackDesktopIconClick(iconId: string): void {
    this.track({ event: 'desktop_icon_click', iconId });
  }

  /**
   * Track project opened
   */
  trackProjectOpen(slug: string): void {
    this.track({ event: 'project_open', slug });
  }

  /**
   * Track tab viewed in project detail
   */
  trackTabViewed(slug: string, tab: string): void {
    this.track({ event: 'tab_viewed', slug, tab });
  }

  /**
   * Track contact method clicked
   */
  trackContactClick(channel: string): void {
    this.track({ event: 'contact_click', channel });
  }

  /**
   * Track resume download/view
   */
  trackResumeClick(): void {
    this.track({ event: 'resume_click' });
  }

  /**
   * Track window opened
   */
  trackWindowOpened(windowId: string): void {
    this.track({ event: 'window_opened', windowId });
  }

  /**
   * Track window closed
   */
  trackWindowClosed(windowId: string): void {
    this.track({ event: 'window_closed', windowId });
  }
}

export const analytics = new Analytics();
