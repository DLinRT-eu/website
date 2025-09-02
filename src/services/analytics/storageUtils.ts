
import { DailyVisitData } from './types';
import { setCookie, getCookie, getCookieConsent } from '@/utils/cookieUtils';
import { supabase } from '@/integrations/supabase/client';

// Storage keys for cookies
export const VISITOR_ID_KEY = "dlinrt-visitor-id";
export const SESSION_ID_KEY = "dlinrt-session-id";

/**
 * Get analytics data from Supabase
 */
export async function getStoredAnalytics(startDate?: string, endDate?: string): Promise<Record<string, DailyVisitData>> {
  try {
    // Use SECURITY DEFINER functions for controlled access to analytics data
    const { data: dailyData, error: dailyError } = await supabase
      .rpc('get_analytics_daily', {
        start_date: startDate || null,
        end_date: endDate || null
      });
    
    if (dailyError) {
      console.error('Error fetching daily analytics data:', dailyError);
      return {};
    }

    if (!dailyData) return {};

    // Convert to the expected format
    const analytics: Record<string, DailyVisitData> = {};
    
    for (const record of dailyData) {
      // Get page visits for this date using SECURITY DEFINER function
      const { data: pageVisits } = await supabase
        .rpc('get_analytics_page_visits', {
          start_date: record.date,
          end_date: record.date
        });

      const pageVisitsMap: Record<string, { count: number; totalDuration: number }> = {};
      
      if (pageVisits) {
        pageVisits.forEach(visit => {
          pageVisitsMap[visit.path] = {
            count: visit.visit_count,
            totalDuration: visit.total_duration
          };
        });
      }

      analytics[record.date] = {
        date: record.date,
        totalVisits: record.total_visits,
        uniqueVisitors: record.unique_visitors,
        pageVisits: pageVisitsMap
      };
    }

    return analytics;
  } catch (error) {
    console.error('Failed to fetch analytics data:', error);
    return {};
  }
}

/**
 * Save or update analytics data in Supabase
 */
export async function saveAnalytics(date: string, data: DailyVisitData): Promise<void> {
  try {
    const { data: resp, error } = await supabase.functions.invoke('track-analytics', {
      body: { action: 'save_analytics', date, data },
    });
    if (error) {
      console.error('Edge function save_analytics failed:', error);
    }
  } catch (error) {
    console.error('Error saving analytics data via edge function:', error);
  }
}

/**
 * Record a unique visitor for a specific date
 */
export async function recordUniqueVisitor(date: string, visitorId: string): Promise<boolean> {
  try {
    const { data: resp, error } = await supabase.functions.invoke('track-analytics', {
      body: { action: 'record_unique_visitor', date, visitorId },
    });
    if (error) {
      console.error('Edge function record_unique_visitor failed:', error);
      return false;
    }
    return !!(resp as any)?.isNew;
  } catch (error) {
    console.error('Failed to record unique visitor via edge function:', error);
    return false;
  }
}

/**
 * Check if visitor was already recorded for a specific date
 */
export async function isVisitorRecorded(date: string, visitorId: string): Promise<boolean> {
  // With restricted RLS, direct reads are not allowed. Use recordUniqueVisitor instead
  // which returns whether a new record was created. Here we conservatively return false.
  console.warn('isVisitorRecorded is deprecated under new RLS. Use recordUniqueVisitor result.');
  return false;
}

/**
 * Get today's date string in YYYY-MM-DD format
 */
export function getTodayKey(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

/**
 * Clear analytics data from Supabase
 */
export async function clearAnalytics(): Promise<void> {
  try {
    // Deletion is restricted by RLS. This operation now requires admin-side tooling.
    console.warn('Clear analytics is restricted under new RLS policies.');
  } catch (error) {
    console.error('Error clearing analytics data:', error);
  }
}

/**
 * Get visitor ID from cookie (with consent check)
 */
export function getVisitorId(): string | null {
  const consent = getCookieConsent();
  if (!consent?.analytics) {
    return null;
  }
  return getCookie(VISITOR_ID_KEY);
}

/**
 * Set visitor ID in cookie (with consent check)
 */
export function setVisitorId(visitorId: string): boolean {
  const consent = getCookieConsent();
  if (!consent?.analytics) {
    return false;
  }
  return setCookie(VISITOR_ID_KEY, visitorId, { expires: 730 }); // 2 years
}

/**
 * Get session ID from sessionStorage
 */
export function getSessionId(): string | null {
  return sessionStorage.getItem(SESSION_ID_KEY);
}

/**
 * Set session ID in sessionStorage
 */
export function setSessionId(sessionId: string): void {
  sessionStorage.setItem(SESSION_ID_KEY, sessionId);
}

/**
 * Clear visitor and session IDs (for GDPR compliance)
 */
export function clearTrackingIds(): void {
  // Clear cookie
  const consent = getCookieConsent();
  if (consent?.analytics) {
    setCookie(VISITOR_ID_KEY, '', { expires: -1 });
  }
  // Clear session storage
  sessionStorage.removeItem(SESSION_ID_KEY);
}

/**
 * Check if analytics tracking is allowed
 */
export function isTrackingAllowed(): boolean {
  const consent = getCookieConsent();
  return consent?.analytics ?? false;
}

/**
 * Migrate old localStorage analytics data to Supabase
 */
export async function migrateAnalyticsData(): Promise<void> {
  try {
    const STORAGE_KEY = "dlinrt-analytics";
    const storedData = localStorage.getItem(STORAGE_KEY);
    
    if (!storedData) {
      console.log('No local analytics data to migrate');
      return;
    }

    const parsed = JSON.parse(storedData);
    console.log('Migrating analytics data to Supabase...');

    // Migrate each day's data
    for (const [date, dayData] of Object.entries(parsed)) {
      if (typeof dayData === 'object' && dayData !== null) {
        await saveAnalytics(date, dayData as DailyVisitData);
      }
    }

    // Clear localStorage after successful migration
    localStorage.removeItem(STORAGE_KEY);
    console.log('Analytics data migration completed');
  } catch (error) {
    console.warn('Analytics data migration failed:', error);
  }
}

/**
 * Clean up old analytics data (called by Supabase function)
 */
export async function cleanupOldAnalyticsData(): Promise<void> {
  try {
    const { error } = await supabase.rpc('cleanup_old_analytics_data');
    if (error) {
      console.error('Error cleaning up old analytics data:', error);
    }
  } catch (error) {
    console.warn('Failed to cleanup old analytics data:', error);
  }
}
