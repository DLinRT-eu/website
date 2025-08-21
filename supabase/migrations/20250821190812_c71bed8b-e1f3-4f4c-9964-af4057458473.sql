-- 1) Newsletter subscribers hardening
-- Drop overly permissive policies
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='newsletter_subscribers' AND policyname='Allow anonymous insert for newsletter_subscribers') THEN
    DROP POLICY "Allow anonymous insert for newsletter_subscribers" ON public.newsletter_subscribers;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='newsletter_subscribers' AND policyname='Allow anonymous update for newsletter_subscribers') THEN
    DROP POLICY "Allow anonymous update for newsletter_subscribers" ON public.newsletter_subscribers;
  END IF;
END $$;

-- Enforce unique email
CREATE UNIQUE INDEX IF NOT EXISTS newsletter_subscribers_email_idx ON public.newsletter_subscribers (email);

-- Restrict inserts/updates to service role only
CREATE POLICY "Service role can insert newsletter subscribers"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (current_setting('role') = 'service_role');

CREATE POLICY "Service role can update newsletter subscribers"
ON public.newsletter_subscribers
FOR UPDATE
USING (current_setting('role') = 'service_role')
WITH CHECK (current_setting('role') = 'service_role');

-- Attach validation trigger to prevent PII tampering even for service role misuse
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_newsletter_validate_update'
  ) THEN
    CREATE TRIGGER trg_newsletter_validate_update
    BEFORE UPDATE ON public.newsletter_subscribers
    FOR EACH ROW
    EXECUTE FUNCTION public.validate_newsletter_update();
  END IF;
END $$;

-- Optional: keep existing SELECT policy that denies reads; if it doesn't exist, don't add one (RLS default denies)

-- 2) Analytics data integrity (support upserts reliably)
CREATE UNIQUE INDEX IF NOT EXISTS analytics_daily_date_idx ON public.analytics_daily(date);
CREATE UNIQUE INDEX IF NOT EXISTS analytics_page_visits_date_path_idx ON public.analytics_page_visits(date, path);
CREATE UNIQUE INDEX IF NOT EXISTS analytics_visitors_date_visitor_idx ON public.analytics_visitors(date, visitor_id);

-- 3) Secure analytics_summary with RLS
ALTER TABLE public.analytics_summary ENABLE ROW LEVEL SECURITY;

-- Drop any existing overly permissive policies on analytics_summary
DO $$ BEGIN
  FOR policy_name IN
    SELECT policyname FROM pg_policies WHERE schemaname='public' AND tablename='analytics_summary'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.analytics_summary', policy_name);
  END LOOP;
END $$;

-- Public read-only, writes only via service role (if ever used)
CREATE POLICY "Allow public read access for analytics_summary"
ON public.analytics_summary
FOR SELECT
USING (true);

CREATE POLICY "Allow service role write access for analytics_summary"
ON public.analytics_summary
FOR INSERT
WITH CHECK (current_setting('role') = 'service_role');

CREATE POLICY "Allow service role update access for analytics_summary"
ON public.analytics_summary
FOR UPDATE
USING (current_setting('role') = 'service_role');

-- 4) Lock down cleanup_old_analytics_data RPC execution to prevent abuse
REVOKE ALL ON FUNCTION public.cleanup_old_analytics_data() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.cleanup_old_analytics_data() FROM anon;
REVOKE ALL ON FUNCTION public.cleanup_old_analytics_data() FROM authenticated;
-- (Admins can run this via SQL or via a privileged edge function)
