
-- Secure analytics_summary view without breaking existing functionality
-- Notes:
-- - RLS does not apply to views. We harden by revoking public access and granting only to service_role.
-- - SECURITY INVOKER ensures the view respects permissions of the querying role.

-- 1) Revoke any public/app-role access
REVOKE ALL ON TABLE public.analytics_summary FROM PUBLIC;
REVOKE ALL ON TABLE public.analytics_summary FROM anon;
REVOKE ALL ON TABLE public.analytics_summary FROM authenticated;

-- 2) Ensure the view runs with invoker rights (so it does not bypass underlying protections)
ALTER VIEW IF EXISTS public.analytics_summary SET (security_invoker = true);

-- 3) Allow only service role to read (edge functions / server-side)
GRANT SELECT ON public.analytics_summary TO service_role;

-- Optional: helpful documentation
COMMENT ON VIEW public.analytics_summary IS 'Restricted BI view. Access limited to service_role; SECURITY INVOKER is enabled to respect underlying table protections.';
