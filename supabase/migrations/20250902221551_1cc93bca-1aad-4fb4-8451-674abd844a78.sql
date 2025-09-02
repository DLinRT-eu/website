
-- Secure analytics_daily: remove public read access while preserving service role functionality

-- 1) Ensure RLS is enabled (safe if already enabled)
ALTER TABLE public.analytics_daily ENABLE ROW LEVEL SECURITY;

-- 2) Revoke any direct table privileges from public/anon/authenticated (defense-in-depth)
REVOKE ALL ON TABLE public.analytics_daily FROM PUBLIC;
REVOKE ALL ON TABLE public.analytics_daily FROM anon;
REVOKE ALL ON TABLE public.analytics_daily FROM authenticated;

-- 3) Drop the permissive public SELECT policy
DROP POLICY IF EXISTS "Allow public read access for analytics_public" ON public.analytics_daily;

-- 4) Keep service role access intact (already present via "Service role full access analytics_daily")
-- If you prefer an explicit SELECT policy in addition to ALL, uncomment the following:
-- CREATE POLICY "Service role select access analytics_daily"
-- ON public.analytics_daily
-- FOR SELECT
-- TO service_role
-- USING (current_setting('role') = 'service_role');

-- Optional documentation
COMMENT ON TABLE public.analytics_daily IS 'Daily analytics with RLS enforced. Public read access removed; service_role retains full access via policies.';
