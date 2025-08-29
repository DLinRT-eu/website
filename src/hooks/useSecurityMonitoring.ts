import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SecurityEvent {
  type: 'form_submission_failed' | 'unusual_activity' | 'rate_limit_exceeded' | 'suspicious_request' | 'repeated_failures' | 'bot_detection' | 'malicious_payload' | 'authentication_failure';
  details: Record<string, any>;
  timestamp: Date;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  userAgent?: string;
  url?: string;
}

interface SecurityThresholds {
  criticalEventAlert: number;
  suspiciousActivityWindow: number;
  maxFailedAttempts: number;
  botDetectionThreshold: number;
}

const SECURITY_THRESHOLDS: SecurityThresholds = {
  criticalEventAlert: 5, // Alert if 5+ critical events in 1 hour
  suspiciousActivityWindow: 300000, // 5 minutes for suspicious activity detection
  maxFailedAttempts: 3, // Max failed attempts before escalation
  botDetectionThreshold: 10 // Rapid requests indicating bot behavior
};

// Environment detection
const isProduction = () => {
  return window.location.hostname === 'dlinrt.eu' || window.location.hostname.includes('dlinrt');
};

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
    
    // Environment-aware logging - reduce console spam in production
    if (!isProduction() || event.severity === 'critical' || event.severity === 'high') {
      console.warn(`[SECURITY] ${event.type}:`, {
        ...sanitizedDetails,
        timestamp: event.timestamp.toISOString(),
        userAgent: event.userAgent?.substring(0, 100) || navigator.userAgent.substring(0, 100),
        url: event.url || window.location.href,
        severity: event.severity || 'medium',
        production: isProduction()
      });
    }

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
    botLikeActivity?: boolean;
    maliciousPatterns?: boolean;
  }) => {
    const suspiciousIndicators = Object.entries(activityData).filter(([_, value]) => value === true || (typeof value === 'number' && value > 3));
    
    if (suspiciousIndicators.length > 1) {
      const severity = suspiciousIndicators.length > 3 ? 'critical' : 
                     suspiciousIndicators.length > 2 ? 'high' : 'medium';
      
      logSecurityEvent({
        type: activityData.maliciousPatterns ? 'malicious_payload' : 
              activityData.botLikeActivity ? 'bot_detection' : 'suspicious_request',
        details: { ...activityData, indicatorCount: suspiciousIndicators.length },
        timestamp: new Date(),
        severity
      });
      return true;
    }
    return false;
  }, [logSecurityEvent]);

  const checkSecurityThresholds = useCallback(async () => {
    try {
      // Check for critical event escalation in the last hour
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const { data: criticalEvents } = await supabase
        .from('security_events')
        .select('id')
        .eq('severity', 'critical')
        .gte('created_at', oneHourAgo.toISOString());

      if (criticalEvents && criticalEvents.length >= SECURITY_THRESHOLDS.criticalEventAlert) {
        await logSecurityEvent({
          type: 'unusual_activity',
          details: { 
            criticalEventCount: criticalEvents.length,
            threshold: SECURITY_THRESHOLDS.criticalEventAlert,
            timeWindow: '1 hour'
          },
          timestamp: new Date(),
          severity: 'critical'
        });
      }
    } catch (error) {
      console.warn('Failed to check security thresholds:', error);
    }
  }, [logSecurityEvent]);

  const detectBotActivity = useCallback((requestPattern: {
    requestCount: number;
    timeWindow: number;
    userAgent: string;
    repeatRequests: boolean;
  }) => {
    const isBotLike = requestPattern.requestCount > SECURITY_THRESHOLDS.botDetectionThreshold &&
                     requestPattern.timeWindow < 60000; // 1 minute

    const suspiciousUA = /bot|crawler|spider|scraper|automated/i.test(requestPattern.userAgent);

    if (isBotLike || (suspiciousUA && requestPattern.repeatRequests)) {
      logSecurityEvent({
        type: 'bot_detection',
        details: {
          ...requestPattern,
          botScore: isBotLike ? 'high' : 'medium',
          suspiciousUserAgent: suspiciousUA
        },
        timestamp: new Date(),
        severity: isBotLike ? 'high' : 'medium'
      });
      return true;
    }
    return false;
  }, [logSecurityEvent]);

  return {
    logSecurityEvent,
    checkRateLimit,
    detectSuspiciousActivity,
    checkSecurityThresholds,
    detectBotActivity,
    isProduction: isProduction()
  };
};