
-- Secure analytics views to prevent public access while preserving service_role functionality

-- 1) Revoke all privileges from public/anon/authenticated on both views
REVOKE ALL ON VIEW public.analytics_public FROM PUBLIC;
REVOKE ALL ON VIEW public.analytics_public FROM anon;
REVOKE ALL ON VIEW public.analytics_public FROM authenticated;

REVOKE ALL ON VIEW public.analytics_summary FROM PUBLIC;
REVOKE ALL ON VIEW public.analytics_summary FROM anon;
REVOKE ALL ON VIEW public.analytics_summary FROM authenticated;

-- 2) Grant read access only to service_role (if not already present)
GRANT SELECT ON public.analytics_public TO service_role;
GRANT SELECT ON public.analytics_summary TO service_role;

-- 3) Document intent
COMMENT ON VIEW public.analytics_public IS
  'Monthly analytics rollup. Access restricted: no public/anon/authenticated privileges; service_role only.';
COMMENT ON VIEW public.analytics_summary IS
  'Daily analytics summary. Access restricted: no public/anon/authenticated privileges; service_role only.';
