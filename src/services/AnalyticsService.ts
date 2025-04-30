
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCookieConsent } from "@/components/CookieConsent";

type PageVisit = {
  path: string;
  title: string;
  timestamp: number;
  duration?: number;
};

type DailyVisitData = {
  date: string;
  totalVisits: number;
  uniqueVisitors: number;
  pageVisits: {
    [path: string]: {
      count: number;
      totalDuration: number;
    }
  };
};

class AnalyticsService {
  private visitId: string | null = null;
  private sessionId: string | null = null;
  private currentPageVisit: PageVisit | null = null;
  private storageKey = "dlinrt-analytics";
  private todayKey: string = new Date().toISOString().split('T')[0];

  constructor() {
    // Generate visitor ID if not exists
    const visitorId = localStorage.getItem("visitor-id");
    if (!visitorId) {
      this.visitId = uuidv4();
      localStorage.setItem("visitor-id", this.visitId);
    } else {
      this.visitId = visitorId;
    }

    // Generate session ID
    this.sessionId = sessionStorage.getItem("session-id");
    if (!this.sessionId) {
      this.sessionId = uuidv4();
      sessionStorage.setItem("session-id", this.sessionId);
    }
  }

  private getStoredAnalytics(): Record<string, DailyVisitData> {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : {};
  }

  private saveAnalytics(data: Record<string, DailyVisitData>): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
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
    const analytics = this.getStoredAnalytics();
    
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

    this.saveAnalytics(analytics);
  }

  endPageVisit(): void {
    if (!this.currentPageVisit) return;

    const duration = Math.floor((Date.now() - this.currentPageVisit.timestamp) / 1000);
    
    // Only record if the visit was longer than 1 second
    if (duration > 1) {
      const analytics = this.getStoredAnalytics();
      const path = this.currentPageVisit.path;
      
      if (analytics[this.todayKey]?.pageVisits[path]) {
        analytics[this.todayKey].pageVisits[path].totalDuration += duration;
        this.saveAnalytics(analytics);
      }
    }

    this.currentPageVisit = null;
  }

  getAnalytics(startDate?: string, endDate?: string): Record<string, DailyVisitData> {
    const analytics = this.getStoredAnalytics();
    
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

  getTopPages(startDate?: string, endDate?: string, limit: number = 3): { 
    path: string; 
    title: string;
    visits: number; 
    avgDuration: number;
  }[] {
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
    localStorage.removeItem(this.storageKey);
  }
}

const analyticsService = new AnalyticsService();

// React hook for page tracking
export const usePageTracking = () => {
  const { cookieConsent } = useCookieConsent();
  
  useEffect(() => {
    // Only track if analytics consent is given
    if (cookieConsent?.analytics) {
      const path = window.location.pathname;
      const title = document.title;
      analyticsService.trackPageView(path, title);
      
      // End tracking when component unmounts or page changes
      return () => {
        analyticsService.endPageVisit();
      };
    }
  }, [window.location.pathname, cookieConsent]);
  
  return analyticsService;
};

export default analyticsService;
