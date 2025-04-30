
import analyticsTracker from './AnalyticsTracker';
import { usePageTracking } from './hooks/usePageTracking';
import { PageVisit, DailyVisitData, TopPageData } from './types';

// Re-export for convenience
export { usePageTracking };
export type { PageVisit, DailyVisitData, TopPageData };

// Export the default tracker instance
export default analyticsTracker;
