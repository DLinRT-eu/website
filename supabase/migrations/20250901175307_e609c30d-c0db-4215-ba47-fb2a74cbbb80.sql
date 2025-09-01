-- Retry: Apply RLS settings only to real tables (skip views)

-- Ensure RLS is enabled on core tables (idempotent)
ALTER TABLE IF EXISTS public.analytics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.analytics_page_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.analytics_visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.security_events ENABLE ROW LEVEL SECURITY;

-- Recreate strict service-role-only policies on sensitive tables
-- analytics_visitors
DROP POLICY IF EXISTS "Allow service role access for analytics_visitors" ON public.analytics_visitors;
CREATE POLICY "Allow service role access for analytics_visitors"
ON public.analytics_visitors
FOR ALL
USING (current_setting('role') = 'service_role')
WITH CHECK (current_setting('role') = 'service_role');

-- contact_submissions
DROP POLICY IF EXISTS "Service role can manage contact submissions" ON public.contact_submissions;
CREATE POLICY "Service role can manage contact submissions"
ON public.contact_submissions
FOR ALL
USING (current_setting('role') = 'service_role')
WITH CHECK (current_setting('role') = 'service_role');

-- security_events
DROP POLICY IF EXISTS "Allow service role access for security_events" ON public.security_events;
CREATE POLICY "Allow service role access for security_events"
ON public.security_events
FOR ALL
USING (current_setting('role') = 'service_role')
WITH CHECK (current_setting('role') = 'service_role');

-- Keep existing policies on analytics_daily and analytics_page_visits as defined (public read, service-role writes).
