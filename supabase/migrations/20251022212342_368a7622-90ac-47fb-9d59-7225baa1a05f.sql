-- Fix function_search_path_mutable warning for update_review_activity
CREATE OR REPLACE FUNCTION public.update_review_activity()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  NEW.last_activity_at = now();
  RETURN NEW;
END;
$$;