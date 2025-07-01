import { DailyVisitData } from './types';
import { setCookie, getCookie, getCookieConsent } from '@/utils/cookieUtils';

// Storage keys
export const STORAGE_KEY = "dlinrt-analytics";
export const VISITOR_ID_KEY = "dlinrt-visitor-id";
export const SESSION_ID_KEY = "dlinrt-session-id";

/**
 * Get analytics data from local storage
 */
export function getStoredAnalytics(): Record<string, DailyVisitData> {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) return {};
    
    const parsed = JSON.parse(storedData);
    
    // Validate that the data structure is correct
    if (typeof parsed !== 'object' || parsed === null) {
      console.warn('Invalid analytics data format, resetting');
      return {};
    }
    
    return parsed;
  } catch (error) {
    console.error('Failed to parse analytics data:', error);
    return {};
  }
}

/**
 * Save analytics data to local storage
 */
export function saveAnalytics(data: Record<string, DailyVisitData>): void {
  try {
    // Validate data before saving
    if (typeof data !== 'object' || data === null) {
      console.error('Invalid data provided to saveAnalytics');
      return;
    }
    
    const jsonData = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, jsonData);
    
    // Verify the save was successful
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved || saved !== jsonData) {
      console.error('Failed to save analytics data to localStorage');
    }
  } catch (error) {
    console.error('Error saving analytics data:', error);
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
 * Clear analytics data from local storage
 */
export function clearAnalytics(): void {
  localStorage.removeItem(STORAGE_KEY);
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
 * Migrate old analytics data format if needed
 */
export function migrateAnalyticsData(): void {
  try {
    const analytics = getStoredAnalytics();
    let needsMigration = false;
    
    // Check if any entries need migration
    Object.keys(analytics).forEach(date => {
      const entry = analytics[date];
      if (!entry.date || typeof entry.totalVisits !== 'number' || typeof entry.uniqueVisitors !== 'number') {
        needsMigration = true;
      }
    });
    
    if (needsMigration) {
      console.log('Migrating analytics data format...');
      // Reset to ensure clean state
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Analytics data migration failed:', error);
    localStorage.removeItem(STORAGE_KEY);
  }
}
