-- Phase 1: Analytics Data Protection
-- Create aggregate-only view for public analytics consumption
CREATE OR REPLACE VIEW public.analytics_public AS
SELECT 
  DATE_TRUNC('month', date) as month,
  COUNT(*) as total_entries,
  SUM(total_visits) as total_visits,
  SUM(unique_visitors) as total_unique_visitors
FROM public.analytics_daily 
WHERE date >= CURRENT_DATE - INTERVAL '1 year'
GROUP BY DATE_TRUNC('month', date)
ORDER BY month DESC;

-- Set security invoker for the public analytics view
ALTER VIEW public.analytics_public SET (security_invoker = true);

-- Create RLS policy for analytics_public view (read-only, public access)
CREATE POLICY "Allow public read access for analytics_public" 
ON public.analytics_daily 
FOR SELECT 
USING (true);

-- Create security event logging table
CREATE TABLE IF NOT EXISTS public.security_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN ('form_submission_failed', 'unusual_activity', 'rate_limit_exceeded', 'suspicious_request', 'repeated_failures')),
  severity TEXT NOT NULL DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  details JSONB,
  ip_hash TEXT, -- Hashed IP for privacy
  user_agent_hash TEXT, -- Hashed user agent for privacy
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- Enable RLS on security events
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- Create policy for security events (service role only for now)
CREATE POLICY "Allow service role access for security_events" 
ON public.security_events 
FOR ALL 
USING (current_setting('role'::text) = 'service_role'::text)
WITH CHECK (current_setting('role'::text) = 'service_role'::text);

-- Create index for faster security event queries
CREATE INDEX IF NOT EXISTS idx_security_events_type_created ON public.security_events(event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_security_events_severity_created ON public.security_events(severity, created_at DESC);

-- Create function to hash IPs for privacy
CREATE OR REPLACE FUNCTION public.hash_ip(ip_address TEXT)
RETURNS TEXT AS $$
BEGIN
  -- Simple hash for privacy (in production, use a proper salt)
  RETURN encode(digest(ip_address || 'security_salt_2024', 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to clean up old security events
CREATE OR REPLACE FUNCTION public.cleanup_old_security_events()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
    -- Delete security events older than 6 months
    DELETE FROM public.security_events 
    WHERE created_at < CURRENT_DATE - INTERVAL '6 months';
    
    RAISE NOTICE 'Cleaned up old security events';
END;
$$;