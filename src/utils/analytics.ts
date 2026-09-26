/**
 * Simple, Privacy-Friendly Event & Conversion Tracker for Rawaya
 * Stores aggregate metrics in localStorage and dispatches window events.
 */

export interface EventMetrics {
  totalVisits: number;
  whatsappClicks: number;
  enrollmentSubmissions: number;
  quizCompletions: number;
  programViews: Record<string, number>;
  lastUpdated: string;
}

const STORAGE_KEY = 'rawaya_analytics_metrics';

export const getMetrics = (): EventMetrics => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        totalVisits: 1,
        whatsappClicks: 0,
        enrollmentSubmissions: 0,
        quizCompletions: 0,
        programViews: {},
        lastUpdated: new Date().toISOString(),
      };
    }
    return JSON.parse(raw);
  } catch (e) {
    return {
      totalVisits: 1,
      whatsappClicks: 0,
      enrollmentSubmissions: 0,
      quizCompletions: 0,
      programViews: {},
      lastUpdated: new Date().toISOString(),
    };
  }
};

export const trackEvent = (
  eventName: 'whatsapp_click' | 'enrollment_submitted' | 'quiz_completed' | 'program_view' | 'brochure_download',
  details?: Record<string, any>
) => {
  try {
    const metrics = getMetrics();
    metrics.lastUpdated = new Date().toISOString();

    if (eventName === 'whatsapp_click') {
      metrics.whatsappClicks = (metrics.whatsappClicks || 0) + 1;
    } else if (eventName === 'enrollment_submitted') {
      metrics.enrollmentSubmissions = (metrics.enrollmentSubmissions || 0) + 1;
    } else if (eventName === 'quiz_completed') {
      metrics.quizCompletions = (metrics.quizCompletions || 0) + 1;
    } else if (eventName === 'program_view' && details?.programTitle) {
      metrics.programViews = metrics.programViews || {};
      metrics.programViews[details.programTitle] = (metrics.programViews[details.programTitle] || 0) + 1;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(metrics));

    // Dispatch global event for external scripts (Google Analytics / Pixel if added later)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('rawaya:analytics_event', {
          detail: { eventName, details, timestamp: Date.now() },
        })
      );
    }
  } catch (e) {
    console.debug('Analytics storage non-critical error:', e);
  }
};
