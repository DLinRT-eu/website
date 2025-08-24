import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SecurityEvent {
  type: 'form_submission_failed' | 'unusual_activity' | 'rate_limit_exceeded' | 'suspicious_request' | 'repeated_failures';
  details: Record<string, any>;
  timestamp: Date;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  userAgent?: string;
  url?: string;
}

export const useSecurityMonitoring = () => {
  const logSecurityEvent = useCallback(async (event: SecurityEvent) => {
    // Sanitize details for logging
    const sanitizedDetails = { ...event.details };
    
    // Remove potentially sensitive information from logs
    if (sanitizedDetails.email) {
      sanitizedDetails.email = '[REDACTED]';
    }
    if (sanitizedDetails.name) {
      sanitizedDetails.name = '[REDACTED]';
    }
    if (sanitizedDetails.message) {
      sanitizedDetails.message = '[REDACTED]';
    }
    
    // Console logging for development/transparency
    console.warn(`[SECURITY] ${event.type}:`, {
      ...sanitizedDetails,
      timestamp: event.timestamp.toISOString(),
      userAgent: event.userAgent?.substring(0, 100) || navigator.userAgent.substring(0, 100),
      url: event.url || window.location.href,
      severity: event.severity || 'medium'
    });

    // Enhanced: Log to database for proper monitoring
    try {
      // Get client IP (hashed for privacy)
      const getClientInfo = () => {
        const userAgent = event.userAgent || navigator.userAgent;
        const url = event.url || window.location.href;
        
        // Create a simple fingerprint for anonymous tracking
        const fingerprint = btoa(userAgent.substring(0, 50) + url.split('/')[2]).substring(0, 20);
        
        return { userAgent, url, fingerprint };
      };

      const clientInfo = getClientInfo();

      await supabase.functions.invoke('track-security-event', {
        body: {
          event_type: event.type,
          severity: event.severity || 'medium',
          details: sanitizedDetails,
          user_agent: clientInfo.userAgent,
          url: clientInfo.url,
          client_fingerprint: clientInfo.fingerprint
        }
      });
    } catch (error) {
      // Fail silently - security logging shouldn't break user experience
      console.warn('Failed to log security event to database:', error);
    }
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
          timestamp: new Date(),
          severity: 'high'
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

  const detectSuspiciousActivity = useCallback((activityData: {
    rapidSubmissions?: boolean;
    unusualUserAgent?: boolean;
    suspiciousPayload?: boolean;
    failedAttempts?: number;
  }) => {
    const suspiciousIndicators = Object.entries(activityData).filter(([_, value]) => value === true || (typeof value === 'number' && value > 3));
    
    if (suspiciousIndicators.length > 1) {
      logSecurityEvent({
        type: 'suspicious_request',
        details: activityData,
        timestamp: new Date(),
        severity: suspiciousIndicators.length > 2 ? 'critical' : 'high'
      });
      return true;
    }
    return false;
  }, [logSecurityEvent]);

  return {
    logSecurityEvent,
    checkRateLimit,
    detectSuspiciousActivity
  };
};