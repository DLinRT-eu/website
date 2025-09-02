-- Restrict contact_submissions public reads and ensure deny-by-default
-- Revoke any accidental grants
REVOKE SELECT ON TABLE public.contact_submissions FROM anon, authenticated;
REVOKE SELECT ON TABLE public.contact_submissions FROM PUBLIC;

-- Ensure RLS is enabled (idempotent)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Recreate strict service-role-only policy (idempotent)
DROP POLICY IF EXISTS "Service role can manage contact submissions" ON public.contact_submissions;
CREATE POLICY "Service role can manage contact submissions"
ON public.contact_submissions
FOR ALL
TO public
USING (current_setting('role'::text) = 'service_role'::text)
WITH CHECK (current_setting('role'::text) = 'service_role'::text);
