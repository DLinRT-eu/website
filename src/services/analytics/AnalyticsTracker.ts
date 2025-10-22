import { v4 as uuidv4 } from "uuid";
import { PageVisit, DailyVisitData, TopPageData } from "./types";
import { 
  getStoredAnalytics,
  saveAnalytics,
  getTodayKey,
  clearAnalytics,
  getVisitorId,
  setVisitorId,
  getSessionId,
  setSessionId,
  isTrackingAllowed,
  clearTrackingIds,
  recordUniqueVisitor,
  isVisitorRecorded
} from "./storageUtils";

class AnalyticsTracker {
  private visitId: string | null = null;
  private sessionId: string | null = null;
  private currentPageVisit: PageVisit | null = null;
  private todayKey: string = getTodayKey();
  private analyticsCache: Record<string, DailyVisitData> = {};

  constructor() {
    this.initializeTracking();
    // Note: Analytics cleanup is handled by backend scheduled tasks
  }

  private initializeTracking(): void {
    if (!isTrackingAllowed()) {
      console.log('Analytics tracking disabled - no cookie consent');
      return;
    }

    // Get or generate visitor ID
    this.visitId = getVisitorId();
    if (!this.visitId) {
      this.visitId = uuidv4();
      setVisitorId(this.visitId);
    }

    // Get or generate session ID
    this.sessionId = getSessionId();
    if (!this.sessionId) {
      this.sessionId = uuidv4();
      setSessionId(this.sessionId);
    }

    console.log('Analytics tracking initialized with cookie consent');
  }

  async trackPageView(path: string, title: string): Promise<void> {
    if (!isTrackingAllowed() || !this.visitId) {
      return;
    }

    // End previous page visit if exists
    await this.endPageVisit();

    // Start new page visit
    this.currentPageVisit = {
      path,
      title,
      timestamp: Date.now(),
    };

    try {
      // Get or initialize today's analytics data
      let todayData = this.analyticsCache[this.todayKey];
      if (!todayData) {
        const analytics = await getStoredAnalytics(this.todayKey, this.todayKey);
        todayData = analytics[this.todayKey] || {
          date: this.todayKey,
          totalVisits: 0,
          uniqueVisitors: 0,
          pageVisits: {}
        };
        this.analyticsCache[this.todayKey] = todayData;
      }

      // Increment total visits
      todayData.totalVisits++;
      
      // Update page-specific data
      if (!todayData.pageVisits[path]) {
        todayData.pageVisits[path] = {
          count: 0,
          totalDuration: 0
        };
      }
      todayData.pageVisits[path].count++;
      
      // Check if this is a new unique visitor today
      const isNewVisitor = await recordUniqueVisitor(this.todayKey, this.visitId);
      if (isNewVisitor) {
        todayData.uniqueVisitors++;
      }

      // Save to Supabase
      await saveAnalytics(this.todayKey, todayData);
      
      console.log(`Page view tracked: ${path} - Total visits today: ${todayData.totalVisits}`);
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }

  async endPageVisit(): Promise<void> {
    if (!this.currentPageVisit || !isTrackingAllowed()) return;

    const duration = Math.floor((Date.now() - this.currentPageVisit.timestamp) / 1000);
    
    // Only record if the visit was longer than 1 second
    if (duration > 1) {
      try {
        let todayData = this.analyticsCache[this.todayKey];
        if (!todayData) {
          const analytics = await getStoredAnalytics(this.todayKey, this.todayKey);
          todayData = analytics[this.todayKey];
        }

        if (todayData?.pageVisits[this.currentPageVisit.path]) {
          todayData.pageVisits[this.currentPageVisit.path].totalDuration += duration;
          await saveAnalytics(this.todayKey, todayData);
        }
      } catch (error) {
        console.error('Error ending page visit:', error);
      }
    }

    this.currentPageVisit = null;
  }

  async getAnalytics(startDate?: string, endDate?: string): Promise<Record<string, DailyVisitData>> {
    try {
      return await getStoredAnalytics(startDate, endDate);
    } catch (error) {
      console.error('Error getting analytics:', error);
      return {};
    }
  }

  async getTopPages(startDate?: string, endDate?: string, limit: number = 3): Promise<TopPageData[]> {
    try {
      const analytics = await this.getAnalytics(startDate, endDate);
      const pageStats: Record<string, { visits: number; duration: number; title?: string }> = {};
      
      // Aggregate page stats across selected dates
      Object.values(analytics).forEach(dayData => {
        Object.entries(dayData.pageVisits).forEach(([path, data]) => {
          if (!pageStats[path]) {
            pageStats[path] = { visits: 0, duration: 0 };
          }
          pageStats[path].visits += data.count;
          pageStats[path].duration += data.totalDuration;
          pageStats[path].title = path;
        });
      });
      
      // Convert to array and sort by visits
      return Object.entries(pageStats)
        .map(([path, stats]) => ({
          path,
          title: stats.title || path,
          visits: stats.visits,
          avgDuration: stats.visits > 0 ? Math.round(stats.duration / stats.visits) : 0
        }))
        .sort((a, b) => b.visits - a.visits)
        .slice(0, limit);
    } catch (error) {
      console.error('Error getting top pages:', error);
      return [];
    }
  }

  async clearAnalytics(): Promise<void> {
    try {
      await clearAnalytics();
      clearTrackingIds();
      this.analyticsCache = {};
    } catch (error) {
      console.error('Error clearing analytics:', error);
    }
  }

  /**
   * Reinitialize tracking (called after consent changes)
   */
  reinitialize(): void {
    this.visitId = null;
    this.sessionId = null;
    this.currentPageVisit = null;
    this.todayKey = getTodayKey();
    this.analyticsCache = {};
    this.initializeTracking();
  }

  /**
   * Get tracking status
   */
  isTrackingEnabled(): boolean {
    return isTrackingAllowed() && !!this.visitId;
  }

  /**
   * Get total analytics summary across all days
   */
  async getTotalSummary(): Promise<{ totalVisits: number; totalUniqueVisitors: number; daysTracked: number }> {
    try {
      const analytics = await this.getAnalytics();
      const days = Object.keys(analytics);
      
      let totalVisits = 0;
      let totalUniqueVisitors = 0;
      
      days.forEach(day => {
        totalVisits += analytics[day].totalVisits;
        totalUniqueVisitors += analytics[day].uniqueVisitors;
      });
      
      return {
        totalVisits,
        totalUniqueVisitors,
        daysTracked: days.length
      };
    } catch (error) {
      console.error('Error getting total summary:', error);
      return { totalVisits: 0, totalUniqueVisitors: 0, daysTracked: 0 };
    }
  }
}

// Create and export a singleton instance
const analyticsTracker = new AnalyticsTracker();
export default analyticsTracker;
