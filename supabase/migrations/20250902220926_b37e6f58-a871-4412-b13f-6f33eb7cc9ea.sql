-- Comprehensive security fix for newsletter_subscribers table
-- Protect customer email addresses and personal data

-- 1) Revoke all possible public grants
REVOKE ALL ON TABLE public.newsletter_subscribers FROM anon;
REVOKE ALL ON TABLE public.newsletter_subscribers FROM authenticated;
REVOKE ALL ON TABLE public.newsletter_subscribers FROM PUBLIC;

-- 2) Ensure RLS is enabled
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 3) Drop any existing permissive policies
DROP POLICY IF EXISTS "Service role can manage newsletter subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow email verification for newsletter_subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Public read access for newsletter_subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow anonymous insert for newsletter_subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow anonymous update for newsletter_subscribers" ON public.newsletter_subscribers;

-- 4) Create explicit deny-all policy for public users
CREATE POLICY "Deny all public access to newsletter subscribers"
ON public.newsletter_subscribers
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- 5) Create service role only policy for newsletter management
CREATE POLICY "Service role only access to newsletter subscribers"
ON public.newsletter_subscribers
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);