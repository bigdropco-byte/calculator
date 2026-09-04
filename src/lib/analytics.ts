export const GA_MEASUREMENT_ID = 'G-HT87NWEHNT';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Log a custom GA4 event
 */
export function trackEvent(action: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
}

/**
 * Track when a user calculates a result in a calculator
 */
export function trackCalculation(calculatorSlug: string, category: string) {
  trackEvent('calculator_calculate', {
    calculator: calculatorSlug,
    category: category,
  });
}

/**
 * Track user search queries
 */
export function trackSearchQuery(searchTerm: string, resultCount: number) {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultCount,
  });
}

/**
 * Track calculator share action
 */
export function trackShare(calculatorSlug: string, method: string = 'web_share') {
  trackEvent('share', {
    content_type: 'calculator',
    item_id: calculatorSlug,
    method: method,
  });
}

/**
 * Track bookmark/favorite toggle
 */
export function trackFavorite(calculatorSlug: string, action: 'add' | 'remove') {
  trackEvent('favorite_toggle', {
    calculator: calculatorSlug,
    action: action,
  });
}

/**
 * Track roadmap feature vote
 */
export function trackVote(featureSlug: string) {
  trackEvent('roadmap_vote', {
    feature: featureSlug,
  });
}
