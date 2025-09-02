-- Enforce least-privilege on security_events: deny public read and rely on service_role via RLS

-- 1) Ensure Row Level Security is enabled
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- 2) Revoke any direct table privileges from public/anon/authenticated
REVOKE ALL ON TABLE public.security_events FROM PUBLIC;
REVOKE ALL ON TABLE public.security_events FROM anon;
REVOKE ALL ON TABLE public.security_events FROM authenticated;

-- 3) Ensure service_role retains table privileges (policies still gate access)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.security_events TO service_role;

-- 4) Document intent
COMMENT ON TABLE public.security_events IS 'Security incidents. RLS enabled; access limited to service_role. Public/anon/auth roles have no privileges.';