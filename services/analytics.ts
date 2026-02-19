/**
 * Analytics Service for AcuSeek Ramadan Challenge
 * Centralizes tracking for searches, navigation, and conversions.
 * Now integrated with Meta Pixel tracking.
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

declare global {
  interface Window {
    fbq: any;
  }
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

    // 3. META PIXEL INTEGRATION
    if (typeof window !== 'undefined' && window.fbq) {
      try {
        switch (eventName) {
          case 'search_performed':
            window.fbq('track', 'Search', {
              search_string: params?.query || params?.search_string,
              ...params
            });
            break;
          case 'result_selected':
            window.fbq('track', 'ViewContent', {
              content_name: params?.camera || params?.id,
              content_ids: [params?.id],
              content_type: 'video_moment',
              ...params
            });
            break;
          case 'share_to_facebook':
            window.fbq('trackCustom', 'ShareToFacebook', params);
            break;
          case 'learn_more_click':
            window.fbq('trackCustom', 'LearnMore', params);
            break;
          case 'tab_view':
            window.fbq('trackCustom', 'TabView', params);
            break;
          default:
            window.fbq('trackCustom', eventName, params);
        }
      } catch (fbError) {
        console.error('Meta Pixel tracking error:', fbError);
      }
    }
  }

  /**
   * Helper to retrieve local logs for auditing
   */
  public getLogs() {
    return JSON.parse(localStorage.getItem('acuseek_analytics_logs') || '[]');
  }
}

export const analytics = new AnalyticsService();