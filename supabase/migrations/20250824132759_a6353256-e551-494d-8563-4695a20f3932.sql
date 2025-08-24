-- Ensure analytics_summary runs with invoker rights so RLS is enforced
ALTER VIEW IF EXISTS public.analytics_summary SET (security_invoker = true);

-- Optional documentation
COMMENT ON VIEW public.analytics_summary IS 'Analytics summary view with SECURITY INVOKER to respect querying user\'s permissions and RLS.';