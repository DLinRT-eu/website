-- Lock down analytics_visitors: enforce RLS and revoke public read

-- 1) Ensure Row Level Security is enabled
ALTER TABLE public.analytics_visitors ENABLE ROW LEVEL SECURITY;

-- 2) Revoke any direct table privileges from public-facing roles (defense-in-depth)
REVOKE ALL ON TABLE public.analytics_visitors FROM PUBLIC;
REVOKE ALL ON TABLE public.analytics_visitors FROM anon;
REVOKE ALL ON TABLE public.analytics_visitors FROM authenticated;

-- 3) Keep service role access intact (policy already exists: "Allow service role access for analytics_visitors")
-- Optionally ensure service_role has table privileges (policies still required)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.analytics_visitors TO service_role;

-- 4) Documentation
COMMENT ON TABLE public.analytics_visitors IS 'Contains hashed visitor records. RLS enabled; access restricted to service_role only. Public/anon/authenticated roles have no privileges.';