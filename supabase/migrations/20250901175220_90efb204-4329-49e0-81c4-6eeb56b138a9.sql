-- Enable RLS explicitly on analytics tables and restrict access appropriately

-- 1) Ensure RLS is enabled on all relevant tables (idempotent)
ALTER TABLE IF EXISTS public.analytics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.analytics_page_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.analytics_visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.analytics_public ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.analytics_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.security_events ENABLE ROW LEVEL SECURITY;

-- 2) analytics_public: allow public read-only access
DROP POLICY IF EXISTS "Public can read analytics_public" ON public.analytics_public;
CREATE POLICY "Public can read analytics_public"
ON public.analytics_public
FOR SELECT
USING (true);

-- No INSERT/UPDATE/DELETE policies -> writes are blocked for non-service roles
-- (If writes are ever needed, they should be performed by service role only.)

-- 3) analytics_summary: allow public read-only access and restrict writes
DROP POLICY IF EXISTS "Public can read analytics_summary" ON public.analytics_summary;
CREATE POLICY "Public can read analytics_summary"
ON public.analytics_summary
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Service role write access for analytics_summary" ON public.analytics_summary;
CREATE POLICY "Service role write access for analytics_summary"
ON public.analytics_summary
FOR INSERT
WITH CHECK (current_setting('role') = 'service_role');

DROP POLICY IF EXISTS "Service role update access for analytics_summary" ON public.analytics_summary;
CREATE POLICY "Service role update access for analytics_summary"
ON public.analytics_summary
FOR UPDATE
USING (current_setting('role') = 'service_role');

-- 4) Reaffirm service-role-only access on sensitive tables (idempotent re-create)
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

-- analytics_visitors
DROP POLICY IF EXISTS "Allow service role access for analytics_visitors" ON public.analytics_visitors;
CREATE POLICY "Allow service role access for analytics_visitors"
ON public.analytics_visitors
FOR ALL
USING (current_setting('role') = 'service_role')
WITH CHECK (current_setting('role') = 'service_role');
