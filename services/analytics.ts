/**
 * Analytics Service for AcuSeek Ramadan Challenge
 * Centralizes tracking for searches, navigation, and conversions.
 */

type EventName = 
  | 'search_performed' 
  | 'tab_view' 
  | 'learn_more_click' 
  | 'share_to_facebook' 
  | 'result_selected';

interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

class AnalyticsService {
  private isDevelopment = true;

  /**
   * Track a custom event
   */
  public trackEvent(eventName: EventName, params?: EventParams) {
    const timestamp = new Date().toISOString();
    const eventData = { eventName, params, timestamp };

    // 1. Log to console for debugging
    if (this.isDevelopment) {
      console.log(`[Analytics] 📊 Event: ${eventName}`, params);
    }

    // 2. Persist to localStorage for demo "persistence"
    try {
      const history = JSON.parse(localStorage.getItem('acuseek_analytics_logs') || '[]');
      history.push(eventData);
      // Keep last 100 events
      if (history.length > 100) history.shift();
      localStorage.setItem('acuseek_analytics_logs', JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save tracking data locally', e);
    }

    /** 
     * 3. PRODUCTION INTEGRATION 
     * Here is where you would call your actual provider:
     * window.gtag('event', eventName, params); // Google Analytics
     * mixpanel.track(eventName, params);       // Mixpanel
     */
  }

  /**
   * Helper to retrieve local logs for auditing
   */
  public getLogs() {
    return JSON.parse(localStorage.getItem('acuseek_analytics_logs') || '[]');
  }
}

export const analytics = new AnalyticsService();