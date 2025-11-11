-- Phase 1: Debug function for diagnosing reviewer access issues
CREATE OR REPLACE FUNCTION public.debug_reviewer_access(reviewer_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN jsonb_build_object(
    'user_id', reviewer_id,
    'has_reviewer_role', has_role(reviewer_id, 'reviewer'::app_role),
    'has_admin_role', has_role(reviewer_id, 'admin'::app_role),
    'total_assignments', (SELECT COUNT(*) FROM product_reviews WHERE assigned_to = reviewer_id),
    'pending_assignments', (SELECT COUNT(*) FROM product_reviews WHERE assigned_to = reviewer_id AND status = 'pending'),
    'auth_uid_matches', reviewer_id = auth.uid(),
    'current_user', current_user,
    'current_role', current_setting('role', true)
  );
END;
$$;

-- Phase 2: Secure RPC to fetch reviewer's assignments (bypasses RLS issues)
CREATE OR REPLACE FUNCTION public.get_my_reviews_secure()
RETURNS TABLE(
  id uuid,
  product_id text,
  review_round_id uuid,
  assigned_to uuid,
  status text,
  priority text,
  deadline date,
  notes text,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  last_activity_at timestamp with time zone,
  created_at timestamp with time zone,
  assigned_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify user is reviewer or admin
  IF NOT (has_role(auth.uid(), 'reviewer'::app_role) OR has_role(auth.uid(), 'admin'::app_role)) THEN
    RAISE EXCEPTION 'Access denied: reviewer or admin role required';
  END IF;
  
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
    pr.assigned_at
  FROM product_reviews pr
  WHERE pr.assigned_to = auth.uid()
  ORDER BY pr.deadline ASC NULLS LAST;
END;
$$;

-- Phase 3: Atomic review round assignment function
CREATE OR REPLACE FUNCTION public.start_review_round_atomic(
  p_round_id uuid,
  p_assignments jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_assignment jsonb;
  v_success_count int := 0;
  v_failed_count int := 0;
  v_errors jsonb := '[]'::jsonb;
BEGIN
  -- Verify admin role
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;
  
  -- Insert assignments atomically
  FOR v_assignment IN SELECT * FROM jsonb_array_elements(p_assignments)
  LOOP
    BEGIN
      INSERT INTO product_reviews (
        product_id,
        review_round_id,
        assigned_to,
        status,
        priority,
        deadline
      ) VALUES (
        (v_assignment->>'product_id')::text,
        p_round_id,
        (v_assignment->>'assigned_to')::uuid,
        'pending',
        COALESCE((v_assignment->>'priority')::text, 'medium'),
        COALESCE((v_assignment->>'deadline')::date, CURRENT_DATE + INTERVAL '14 days')
      );
      
      -- Log to assignment history
      INSERT INTO assignment_history (
        review_round_id,
        product_id,
        assigned_to,
        change_type,
        changed_by,
        reason
      ) VALUES (
        p_round_id,
        (v_assignment->>'product_id')::text,
        (v_assignment->>'assigned_to')::uuid,
        'initial',
        auth.uid(),
        'Review round assignment'
      );
      
      v_success_count := v_success_count + 1;
      
    EXCEPTION WHEN OTHERS THEN
      v_failed_count := v_failed_count + 1;
      v_errors := v_errors || jsonb_build_object(
        'product_id', v_assignment->>'product_id',
        'error', SQLERRM
      );
    END;
  END LOOP;
  
  -- Update round totals
  UPDATE review_rounds
  SET total_assignments = v_success_count,
      status = 'active',
      updated_at = now()
  WHERE id = p_round_id;
  
  RETURN jsonb_build_object(
    'success', true,
    'assigned_count', v_success_count,
    'failed_count', v_failed_count,
    'errors', v_errors
  );
END;
$$;