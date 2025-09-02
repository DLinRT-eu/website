-- Security hardening migration: enforce RLS and restrict analytics views

-- 1) Ensure RLS is enabled on sensitive tables (idempotent)
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_page_visits ENABLE ROW LEVEL SECURITY;

-- 2) Remove any legacy permissive public read policies on analytics base tables
DROP POLICY IF EXISTS "Allow public read access for analytics_daily" ON public.analytics_daily;
DROP POLICY IF EXISTS "Allow public read access for analytics_page_visits" ON public.analytics_page_visits;

-- 3) Restrict direct access to analytics views
REVOKE SELECT ON TABLE public.analytics_public FROM anon, authenticated;
REVOKE SELECT ON TABLE public.analytics_summary FROM anon, authenticated;
REVOKE SELECT ON TABLE public.analytics_public FROM PUBLIC;
REVOKE SELECT ON TABLE public.analytics_summary FROM PUBLIC;

-- 4) Ensure execute access on controlled SECURITY DEFINER functions for aggregated analytics
GRANT EXECUTE ON FUNCTION public.get_analytics_daily(date, date) TO public;
GRANT EXECUTE ON FUNCTION public.get_analytics_page_visits(date, date) TO public;