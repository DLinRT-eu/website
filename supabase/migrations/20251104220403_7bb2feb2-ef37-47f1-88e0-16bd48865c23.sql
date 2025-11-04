-- Fix Function Search Path Mutable warning
-- Add SET search_path to functions that are missing it

-- Fix update_reviewer_expertise_updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_reviewer_expertise_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;

-- Fix expire_old_invitations function
CREATE OR REPLACE FUNCTION public.expire_old_invitations()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  UPDATE public.reviewer_invitations
  SET status = 'expired'
  WHERE status = 'pending'
  AND expires_at < NOW();
END;
$function$;