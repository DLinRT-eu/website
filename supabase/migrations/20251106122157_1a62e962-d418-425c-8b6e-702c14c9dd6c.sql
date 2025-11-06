-- Phase 2: Admin RPCs to replace client-side joins
-- ================================================

-- 1. Get pending role requests with user details
CREATE OR REPLACE FUNCTION public.get_pending_role_requests_admin()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  requested_role app_role,
  company_id text,
  justification text,
  status text,
  created_at timestamptz,
  reviewed_at timestamptz,
  reviewed_by uuid,
  email text,
  first_name text,
  last_name text,
  institution text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check admin
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  RETURN QUERY
  SELECT 
    rr.id,
    rr.user_id,
    rr.requested_role,
    rr.company_id,
    rr.justification,
    rr.status,
    rr.created_at,
    rr.reviewed_at,
    rr.reviewed_by,
    p.email,
    p.first_name,
    p.last_name,
    p.institution
  FROM public.role_requests rr
  JOIN public.profiles p ON p.id = rr.user_id
  WHERE rr.status = 'pending'
  ORDER BY rr.created_at DESC;
END;
$$;

-- 2. Get security events with stats
CREATE OR REPLACE FUNCTION public.get_security_events_admin(last_n_days int DEFAULT 30)
RETURNS TABLE (
  id uuid,
  event_type text,
  severity text,
  details jsonb,
  created_at timestamptz,
  resolved_at timestamptz,
  ip_hash text,
  user_agent_hash text,
  url text,
  notes text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check admin
  IF NOT public.can_view_security_data(auth.uid()) THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  RETURN QUERY
  SELECT 
    se.id,
    se.event_type,
    se.severity,
    se.details,
    se.created_at,
    se.resolved_at,
    se.ip_hash,
    se.user_agent_hash,
    se.url,
    se.notes
  FROM public.security_events se
  WHERE se.created_at >= (NOW() - (last_n_days || ' days')::interval)
  ORDER BY se.created_at DESC
  LIMIT 100;
END;
$$;

-- 3. Get registration notifications with user details
CREATE OR REPLACE FUNCTION public.get_registration_notifications_admin()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  email text,
  notification_status text,
  verified boolean,
  created_at timestamptz,
  verified_at timestamptz,
  verified_by uuid,
  failure_reason text,
  first_name text,
  last_name text,
  institution text,
  approval_status text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check admin
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  RETURN QUERY
  SELECT 
    urn.id,
    urn.user_id,
    urn.email,
    urn.notification_status,
    urn.verified,
    urn.created_at,
    urn.verified_at,
    urn.verified_by,
    urn.failure_reason,
    p.first_name,
    p.last_name,
    p.institution,
    p.approval_status
  FROM public.user_registration_notifications urn
  JOIN public.profiles p ON p.id = urn.user_id
  ORDER BY urn.created_at DESC
  LIMIT 200;
END;
$$;

-- 4. Get review rounds with stats
CREATE OR REPLACE FUNCTION public.get_review_rounds_admin()
RETURNS TABLE (
  id uuid,
  name text,
  round_number int,
  description text,
  status text,
  start_date date,
  end_date date,
  default_deadline date,
  created_by uuid,
  created_at timestamptz,
  updated_at timestamptz,
  total_products int,
  total_assignments int,
  completed_count int,
  in_progress_count int,
  pending_count int
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check admin
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  RETURN QUERY
  SELECT 
    rr.id,
    rr.name,
    rr.round_number,
    rr.description,
    rr.status,
    rr.start_date,
    rr.end_date,
    rr.default_deadline,
    rr.created_by,
    rr.created_at,
    rr.updated_at,
    rr.total_products,
    rr.total_assignments,
    COALESCE(rrs.completed_count, 0)::int,
    COALESCE(rrs.in_progress_count, 0)::int,
    COALESCE(rrs.pending_count, 0)::int
  FROM public.review_rounds rr
  LEFT JOIN public.review_round_stats rrs ON rrs.round_id = rr.id
  ORDER BY rr.created_at DESC;
END;
$$;

-- 5. Get reviewers with workload
CREATE OR REPLACE FUNCTION public.get_reviewers_with_workload_admin()
RETURNS TABLE (
  id uuid,
  email text,
  first_name text,
  last_name text,
  institution text,
  roles text[],
  active_assignments bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check admin
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  RETURN QUERY
  SELECT 
    p.id,
    p.email,
    p.first_name,
    p.last_name,
    p.institution,
    COALESCE(ARRAY_AGG(ur.role::text) FILTER (WHERE ur.role IS NOT NULL), ARRAY[]::text[]) as roles,
    COUNT(pr.id) FILTER (WHERE pr.status IN ('pending', 'in_progress')) as active_assignments
  FROM public.profiles p
  INNER JOIN public.user_roles ur ON ur.user_id = p.id
  LEFT JOIN public.product_reviews pr ON pr.assigned_to = p.id
  WHERE ur.role IN ('admin'::app_role, 'reviewer'::app_role)
  GROUP BY p.id, p.email, p.first_name, p.last_name, p.institution
  ORDER BY p.first_name, p.last_name;
END;
$$;