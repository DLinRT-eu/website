
import { DailyVisitData } from './types';

// Storage keys
export const STORAGE_KEY = "dlinrt-analytics";
export const VISITOR_ID_KEY = "visitor-id";
export const SESSION_ID_KEY = "session-id";

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
