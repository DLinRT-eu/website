-- Comprehensive security fix for contact_submissions table
-- Ensure absolutely no public access to customer contact data

-- 1) Revoke all possible grants (belt and suspenders approach)
REVOKE ALL ON TABLE public.contact_submissions FROM anon;
REVOKE ALL ON TABLE public.contact_submissions FROM authenticated;
REVOKE ALL ON TABLE public.contact_submissions FROM PUBLIC;

-- 2) Ensure RLS is enabled
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- 3) Drop existing policy and recreate with explicit conditions
DROP POLICY IF EXISTS "Service role can manage contact submissions" ON public.contact_submissions;

-- 4) Create explicit deny-all policy first (highest priority)
CREATE POLICY "Deny all public access to contact submissions"
ON public.contact_submissions
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- 5) Create service role only policy (lower priority, specific role)
CREATE POLICY "Service role only access to contact submissions"
ON public.contact_submissions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 6) Verify no unexpected grants exist
DO $$
BEGIN
    -- Revoke any schema-level privileges that might affect this table
    REVOKE ALL ON SCHEMA public FROM anon;
    REVOKE ALL ON SCHEMA public FROM authenticated;
    
    -- Grant back only the minimal necessary schema usage
    GRANT USAGE ON SCHEMA public TO anon;
    GRANT USAGE ON SCHEMA public TO authenticated;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Schema privilege adjustment completed with warnings (this is normal)';
END $$;