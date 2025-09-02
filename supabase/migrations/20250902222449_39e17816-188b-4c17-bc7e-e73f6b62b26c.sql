
-- Lock down analytics_visitors to prevent public access while preserving service_role functionality

-- 1) Ensure Row Level Security is enabled
ALTER TABLE public.analytics_visitors ENABLE ROW LEVEL SECURITY;

-- 2) Revoke direct table privileges from public/anon/authenticated
REVOKE ALL ON TABLE public.analytics_visitors FROM PUBLIC;
REVOKE ALL ON TABLE public.analytics_visitors FROM anon;
REVOKE ALL ON TABLE public.analytics_visitors FROM authenticated;

-- 3) Ensure uniqueness and data integrity (safe if already present)
CREATE UNIQUE INDEX IF NOT EXISTS analytics_visitors_date_visitor_idx
  ON public.analytics_visitors(date, visitor_id);

-- 4) Remove any permissive/legacy policies if they exist
DROP POLICY IF EXISTS "Public read access for analytics_visitors" ON public.analytics_visitors;
DROP POLICY IF EXISTS "Allow anonymous insert for analytics_visitors" ON public.analytics_visitors;
DROP POLICY IF EXISTS "Allow anonymous access for analytics_visitors" ON public.analytics_visitors;

-- 5) Enforce strict service_role-only access via RLS (idempotent replace)
DROP POLICY IF EXISTS "Allow service role access for analytics_visitors" ON public.analytics_visitors;
CREATE POLICY "Allow service role access for analytics_visitors"
  ON public.analytics_visitors
  FOR ALL
  USING (current_setting('role'::text) = 'service_role'::text)
  WITH CHECK (current_setting('role'::text) = 'service_role'::text);

-- 6) Ensure service_role has table privileges (RLS still applies)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.analytics_visitors TO service_role;

-- 7) Document intent
COMMENT ON TABLE public.analytics_visitors IS
  'Contains hashed visitor records. RLS enabled; access restricted to service_role only. Public/anon/authenticated roles have no privileges.';
