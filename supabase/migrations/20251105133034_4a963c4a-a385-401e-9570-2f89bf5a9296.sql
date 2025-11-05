-- Create SECURITY DEFINER function to fetch audit logs for admins
CREATE OR REPLACE FUNCTION public.get_audit_logs_admin()
RETURNS TABLE (
  id uuid,
  action_type text,
  performed_by_email text,
  target_user_email text,
  details jsonb,
  created_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if current user is admin
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  -- Return audit log data
  RETURN QUERY
  SELECT 
    al.id,
    al.action_type,
    al.performed_by_email,
    al.target_user_email,
    al.details,
    al.created_at
  FROM public.admin_audit_log al
  ORDER BY al.created_at DESC
  LIMIT 100;
END;
$$;