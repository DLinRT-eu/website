
// GDPR-compliant cookie management utilities
export interface CookieOptions {
  expires?: number; // days
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export interface CookieConsent {
  analytics: boolean;
  timestamp: number;
  version: string;
}

const CONSENT_COOKIE_NAME = 'dlinrt-cookie-consent';
const CONSENT_VERSION = '1.0';

/**
 * Set a cookie with GDPR compliance
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): boolean {
  // Check if analytics consent is given
  if (name.includes('analytics') || name.includes('visitor')) {
    const consent = getCookieConsent();
    if (!consent?.analytics) {
      return false;
    }
  }

  const defaults: CookieOptions = {
    expires: 365,
    path: '/',
    secure: window.location.protocol === 'https:',
    sameSite: 'lax'
  };

  const opts = { ...defaults, ...options };
  
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  
  if (opts.expires) {
    const date = new Date();
    date.setTime(date.getTime() + (opts.expires * 24 * 60 * 60 * 1000));
    cookieString += `; expires=${date.toUTCString()}`;
  }
  
  if (opts.path) cookieString += `; path=${opts.path}`;
  if (opts.domain) cookieString += `; domain=${opts.domain}`;
  if (opts.secure) cookieString += `; secure`;
  if (opts.sameSite) cookieString += `; samesite=${opts.sameSite}`;
  
  document.cookie = cookieString;
  return true;
}

/**
 * Get a cookie value
 */
export function getCookie(name: string): string | null {
  const nameEq = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');
  
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEq) === 0) {
      return decodeURIComponent(cookie.substring(nameEq.length));
    }
  }
  
  return null;
}

/**
 * Delete a cookie
 */
export function deleteCookie(name: string, path: string = '/'): void {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
}

/**
 * Set cookie consent
 */
export function setCookieConsent(consent: Omit<CookieConsent, 'timestamp' | 'version'>): void {
  const consentData: CookieConsent = {
    ...consent,
    timestamp: Date.now(),
    version: CONSENT_VERSION
  };
  
  // Consent cookie is always allowed (necessary for legal compliance)
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consentData))}; expires=${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()}; path=/; samesite=lax${window.location.protocol === 'https:' ? '; secure' : ''}`;
}

/**
 * Get cookie consent status
 */
export function getCookieConsent(): CookieConsent | null {
  const consentCookie = getCookie(CONSENT_COOKIE_NAME);
  if (!consentCookie) return null;
  
  try {
    return JSON.parse(consentCookie);
  } catch {
    return null;
  }
}

/**
 * Check if consent is needed (not given or outdated)
 */
export function needsConsent(): boolean {
  const consent = getCookieConsent();
  if (!consent) return true;
  
  // Check if consent is older than 1 year
  const oneYearAgo = Date.now() - (365 * 24 * 60 * 60 * 1000);
  if (consent.timestamp < oneYearAgo) return true;
  
  // Check if consent version is outdated
  if (consent.version !== CONSENT_VERSION) return true;
  
  return false;
}

/**
 * Clear all analytics cookies (for GDPR compliance)
 */
export function clearAnalyticsCookies(): void {
  const cookiesToClear = ['dlinrt-visitor-id', 'dlinrt-session-id'];
  cookiesToClear.forEach(name => deleteCookie(name));
}
