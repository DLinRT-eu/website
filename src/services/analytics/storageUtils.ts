
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
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : {};
}

/**
 * Save analytics data to local storage
 */
export function saveAnalytics(data: Record<string, DailyVisitData>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Get today's date string in YYYY-MM-DD format
 */
export function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
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
