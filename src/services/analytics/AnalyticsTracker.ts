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
  clearTrackingIds
} from "./storageUtils";

class AnalyticsTracker {
  private visitId: string | null = null;
  private sessionId: string | null = null;
  private currentPageVisit: PageVisit | null = null;
  private todayKey: string = getTodayKey();

  constructor() {
    this.initializeTracking();
    // Clean up old visitor tracking data (keep only last year)
    this.cleanupOldVisitorData();
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

  private cleanupOldVisitorData(): void {
    try {
      // Remove visitor tracking data older than 1 year (365 days)
      const oneYearAgo = new Date();
      oneYearAgo.setDate(oneYearAgo.getDate() - 365);
      
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && key.startsWith('visitor-')) {
          const dateStr = key.replace('visitor-', '');
          const date = new Date(dateStr);
          if (date < oneYearAgo) {
            localStorage.removeItem(key);
          }
        }
      }
    } catch (error) {
      console.warn('Failed to cleanup old visitor data:', error);
    }
  }

  trackPageView(path: string, title: string): void {
    if (!isTrackingAllowed() || !this.visitId) {
      return;
    }

    // End previous page visit if exists
    this.endPageVisit();

    // Start new page visit
    this.currentPageVisit = {
      path,
      title,
      timestamp: Date.now(),
    };

    // Update analytics data
    const analytics = getStoredAnalytics();
    
    // Initialize today's entry if it doesn't exist
    if (!analytics[this.todayKey]) {
      analytics[this.todayKey] = {
        date: this.todayKey,
        totalVisits: 0,
        uniqueVisitors: 0,
        pageVisits: {}
      };
    }

    // Increment total visits
    analytics[this.todayKey].totalVisits++;
    
    // Update page-specific data
    if (!analytics[this.todayKey].pageVisits[path]) {
      analytics[this.todayKey].pageVisits[path] = {
        count: 0,
        totalDuration: 0
      };
    }
    analytics[this.todayKey].pageVisits[path].count++;
    
    // Check if this is a new visitor today
    const visitorKey = `visitor-${this.todayKey}`;
    let todayVisitors: string[] = [];
    
    try {
      const storedVisitors = localStorage.getItem(visitorKey);
      todayVisitors = storedVisitors ? JSON.parse(storedVisitors) : [];
    } catch (error) {
      console.warn('Failed to parse visitor data, resetting:', error);
      todayVisitors = [];
    }
    
    if (!todayVisitors.includes(this.visitId)) {
      todayVisitors.push(this.visitId);
      localStorage.setItem(visitorKey, JSON.stringify(todayVisitors));
      analytics[this.todayKey].uniqueVisitors++;
    }

    // Ensure data persistence
    saveAnalytics(analytics);
    
    console.log(`Page view tracked: ${path} - Total visits today: ${analytics[this.todayKey].totalVisits}`);
  }

  endPageVisit(): void {
    if (!this.currentPageVisit || !isTrackingAllowed()) return;

    const duration = Math.floor((Date.now() - this.currentPageVisit.timestamp) / 1000);
    
    // Only record if the visit was longer than 1 second
    if (duration > 1) {
      const analytics = getStoredAnalytics();
      const path = this.currentPageVisit.path;
      
      if (analytics[this.todayKey]?.pageVisits[path]) {
        analytics[this.todayKey].pageVisits[path].totalDuration += duration;
        saveAnalytics(analytics);
      }
    }

    this.currentPageVisit = null;
  }

  getAnalytics(startDate?: string, endDate?: string): Record<string, DailyVisitData> {
    const analytics = getStoredAnalytics();
    
    if (!startDate && !endDate) {
      return analytics;
    }
    
    // Filter by date range if provided
    const filteredAnalytics: Record<string, DailyVisitData> = {};
    const start = startDate ? new Date(startDate) : new Date(0);
    const end = endDate ? new Date(endDate) : new Date();
    
    Object.keys(analytics).forEach(date => {
      const currentDate = new Date(date);
      if (currentDate >= start && currentDate <= end) {
        filteredAnalytics[date] = analytics[date];
      }
    });
    
    return filteredAnalytics;
  }

  getTopPages(startDate?: string, endDate?: string, limit: number = 3): TopPageData[] {
    const analytics = this.getAnalytics(startDate, endDate);
    const pageStats: Record<string, { visits: number; duration: number; title?: string }> = {};
    
    // Aggregate page stats across selected dates
    Object.values(analytics).forEach(dayData => {
      Object.entries(dayData.pageVisits).forEach(([path, data]) => {
        if (!pageStats[path]) {
          pageStats[path] = { visits: 0, duration: 0 };
        }
        pageStats[path].visits += data.count;
        pageStats[path].duration += data.totalDuration;
        // Try to get page title - use path as fallback
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
  }

  clearAnalytics(): void {
    clearAnalytics();
    clearTrackingIds();
    // Also clear visitor tracking data
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith('visitor-')) {
        localStorage.removeItem(key);
      }
    }
  }

  /**
   * Reinitialize tracking (called after consent changes)
   */
  reinitialize(): void {
    this.visitId = null;
    this.sessionId = null;
    this.currentPageVisit = null;
    this.todayKey = getTodayKey(); // Update today's key
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
  getTotalSummary(): { totalVisits: number; totalUniqueVisitors: number; daysTracked: number } {
    const analytics = getStoredAnalytics();
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
  }
}

// Create and export a singleton instance
const analyticsTracker = new AnalyticsTracker();
export default analyticsTracker;
