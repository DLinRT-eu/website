-- Remove Supabase-based newsletter artifacts
-- Drop the newsletter_subscribers table if it exists (cascades policies, etc.)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'newsletter_subscribers'
  ) THEN
    EXECUTE 'DROP TABLE public.newsletter_subscribers CASCADE';
  END IF;
END$$;

-- Drop the validate_newsletter_update function if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.proname = 'validate_newsletter_update'
  ) THEN
    EXECUTE 'DROP FUNCTION public.validate_newsletter_update()';
  END IF;
END$$;