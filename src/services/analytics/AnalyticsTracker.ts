
import { v4 as uuidv4 } from "uuid";
import { PageVisit, DailyVisitData, TopPageData } from "./types";
import { 
  STORAGE_KEY, 
  VISITOR_ID_KEY, 
  SESSION_ID_KEY,
  getStoredAnalytics,
  saveAnalytics,
  getTodayKey,
  clearAnalytics
} from "./storageUtils";

class AnalyticsTracker {
  private visitId: string | null = null;
  private sessionId: string | null = null;
  private currentPageVisit: PageVisit | null = null;
  private todayKey: string = getTodayKey();

  constructor() {
    // Generate visitor ID if not exists
    const visitorId = localStorage.getItem(VISITOR_ID_KEY);
    if (!visitorId) {
      this.visitId = uuidv4();
      localStorage.setItem(VISITOR_ID_KEY, this.visitId);
    } else {
      this.visitId = visitorId;
    }

    // Generate session ID
    this.sessionId = sessionStorage.getItem(SESSION_ID_KEY);
    if (!this.sessionId) {
      this.sessionId = uuidv4();
      sessionStorage.setItem(SESSION_ID_KEY, this.sessionId);
    }
  }

  trackPageView(path: string, title: string): void {
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
    const todayVisitors = localStorage.getItem(visitorKey) ? 
      JSON.parse(localStorage.getItem(visitorKey) || '[]') : [];
    
    if (!todayVisitors.includes(this.visitId)) {
      todayVisitors.push(this.visitId);
      localStorage.setItem(visitorKey, JSON.stringify(todayVisitors));
      analytics[this.todayKey].uniqueVisitors++;
    }

    saveAnalytics(analytics);
  }

  endPageVisit(): void {
    if (!this.currentPageVisit) return;

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
  }
}

// Create and export a singleton instance
const analyticsTracker = new AnalyticsTracker();
export default analyticsTracker;
