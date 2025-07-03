
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
    let query = supabase
      .from('analytics_daily')
      .select('*')
      .order('date', { ascending: true });

    if (startDate) {
      query = query.gte('date', startDate);
    }
    if (endDate) {
      query = query.lte('date', endDate);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching analytics data:', error);
      return {};
    }

    if (!data) return {};

    // Convert to the expected format
    const analytics: Record<string, DailyVisitData> = {};
    
    for (const record of data) {
      // Get page visits for this date
      const { data: pageVisits } = await supabase
        .from('analytics_page_visits')
        .select('*')
        .eq('date', record.date);

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
    // Upsert daily analytics
    const { error: dailyError } = await supabase
      .from('analytics_daily')
      .upsert({
        date,
        total_visits: data.totalVisits,
        unique_visitors: data.uniqueVisitors,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'date'
      });

    if (dailyError) {
      console.error('Error saving daily analytics:', dailyError);
      return;
    }

    // Upsert page visits
    for (const [path, pageData] of Object.entries(data.pageVisits)) {
      const { error: pageError } = await supabase
        .from('analytics_page_visits')
        .upsert({
          date,
          path,
          title: path, // Use path as title for now
          visit_count: pageData.count,
          total_duration: pageData.totalDuration,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'date,path'
        });

      if (pageError) {
        console.error('Error saving page visit data:', pageError);
      }
    }
  } catch (error) {
    console.error('Error saving analytics data:', error);
  }
}

/**
 * Record a unique visitor for a specific date
 */
export async function recordUniqueVisitor(date: string, visitorId: string): Promise<boolean> {
  try {
    // First check if visitor already exists for this date
    const { data: existingVisitor } = await supabase
      .from('analytics_visitors')
      .select('id')
      .eq('date', date)
      .eq('visitor_id', visitorId)
      .maybeSingle();

    if (existingVisitor) {
      return false; // Visitor already recorded for this date
    }

    // Insert new visitor record
    const { error } = await supabase
      .from('analytics_visitors')
      .insert({
        date,
        visitor_id: visitorId
      });

    if (error) {
      // If it's a unique constraint violation, the visitor was just recorded by another request
      if (error.code === '23505') {
        return false;
      }
      console.error('Error recording unique visitor:', error);
      return false;
    }

    return true; // Successfully recorded new visitor
  } catch (error) {
    console.error('Failed to record unique visitor:', error);
    return false;
  }
}

/**
 * Check if visitor was already recorded for a specific date
 */
export async function isVisitorRecorded(date: string, visitorId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('analytics_visitors')
      .select('id')
      .eq('date', date)
      .eq('visitor_id', visitorId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking visitor record:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Failed to check visitor record:', error);
    return false;
  }
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
    await Promise.all([
      supabase.from('analytics_visitors').delete().neq('id', ''),
      supabase.from('analytics_page_visits').delete().neq('id', ''),
      supabase.from('analytics_daily').delete().neq('id', '')
    ]);
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
