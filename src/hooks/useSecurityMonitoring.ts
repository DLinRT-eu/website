import { useCallback } from 'react';

interface SecurityEvent {
  type: 'form_submission_failed' | 'unusual_activity' | 'rate_limit_exceeded';
  details: Record<string, any>;
  timestamp: Date;
}

export const useSecurityMonitoring = () => {
  const logSecurityEvent = useCallback((event: SecurityEvent) => {
    // Log security events for monitoring
    console.warn(`[SECURITY] ${event.type}:`, {
      ...event.details,
      timestamp: event.timestamp.toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });

    // In production, this would send to a security monitoring service
    // For now, we're using console logging for transparency
  }, []);

  const checkRateLimit = useCallback((key: string, maxAttempts: number = 5, windowMs: number = 60000) => {
    const now = Date.now();
    const storageKey = `rate_limit_${key}`;
    
    try {
      const stored = localStorage.getItem(storageKey);
      const attempts = stored ? JSON.parse(stored) : [];
      
      // Remove old attempts outside the window
      const validAttempts = attempts.filter((timestamp: number) => now - timestamp < windowMs);
      
      if (validAttempts.length >= maxAttempts) {
        logSecurityEvent({
          type: 'rate_limit_exceeded',
          details: { key, attempts: validAttempts.length, maxAttempts },
          timestamp: new Date()
        });
        return false;
      }
      
      // Add current attempt
      validAttempts.push(now);
      localStorage.setItem(storageKey, JSON.stringify(validAttempts));
      
      return true;
    } catch (error) {
      // If localStorage fails, allow the action but log the issue
      console.warn('Rate limiting storage error:', error);
      return true;
    }
  }, [logSecurityEvent]);

  return {
    logSecurityEvent,
    checkRateLimit
  };
};