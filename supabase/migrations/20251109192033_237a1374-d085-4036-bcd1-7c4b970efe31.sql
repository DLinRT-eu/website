-- Create admin-only RPC for fetching product reviews with reviewer data
-- This bypasses potential RLS issues and provides a resilient fallback for admins

CREATE OR REPLACE FUNCTION public.get_product_reviews_admin_secure()
RETURNS TABLE(
  id uuid,
  product_id text,
  review_round_id uuid,
  assigned_to uuid,
  status text,
  priority text,
  deadline date,
  notes text,
  started_at timestamptz,
  completed_at timestamptz,
  last_activity_at timestamptz,
  created_at timestamptz,
  reviewer_first_name text,
  reviewer_last_name text,
  reviewer_email text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if current user is admin
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  -- Return product reviews with joined reviewer data
  RETURN QUERY
  SELECT 
    pr.id,
    pr.product_id,
    pr.review_round_id,
    pr.assigned_to,
    pr.status,
    pr.priority,
    pr.deadline,
    pr.notes,
    pr.started_at,
    pr.completed_at,
    pr.last_activity_at,
    pr.created_at,
    p.first_name as reviewer_first_name,
    p.last_name as reviewer_last_name,
    p.email as reviewer_email
  FROM public.product_reviews pr
  LEFT JOIN public.profiles p ON p.id = pr.assigned_to
  ORDER BY pr.deadline ASC NULLS LAST;
END;
$$;