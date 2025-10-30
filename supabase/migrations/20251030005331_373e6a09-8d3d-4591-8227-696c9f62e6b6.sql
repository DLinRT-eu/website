-- Phase 4: Add helper function for checking multiple roles
-- This simplifies RLS policies by allowing role checks with arrays

CREATE OR REPLACE FUNCTION public.has_any_role(
  _user_id uuid, 
  _roles app_role[]
)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id 
      AND role = ANY(_roles)
  )
$$;

-- Add comments to document the helper function
COMMENT ON FUNCTION public.has_any_role(uuid, app_role[]) IS 
'Security definer function to check if a user has any of the specified roles. 
Used in RLS policies to avoid recursive policy issues.
Example: has_any_role(auth.uid(), ARRAY[''admin'', ''reviewer'']::app_role[])';
