-- Ensure analytics_summary runs with invoker rights so RLS is enforced
ALTER VIEW IF EXISTS public.analytics_summary SET (security_invoker = true);