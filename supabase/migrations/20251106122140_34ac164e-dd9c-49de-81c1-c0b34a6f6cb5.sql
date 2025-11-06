-- Phase 1: Core Security Functions (idempotent)
-- ================================================

-- 1. Core admin check function
CREATE OR REPLACE FUNCTION public.is_admin_secure()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'::app_role
  );
$$;

-- 2. Check if user can manage reviews
CREATE OR REPLACE FUNCTION public.can_manage_reviews(user_id_param uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = user_id_param
      AND role IN ('admin'::app_role, 'reviewer'::app_role)
  );
$$;

-- 3. Check if user can view security data
CREATE OR REPLACE FUNCTION public.can_view_security_data(user_id_param uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = user_id_param
      AND role = 'admin'::app_role
  );
$$;

-- 4. Get user's highest role
CREATE OR REPLACE FUNCTION public.get_user_role_secure(user_id_param uuid)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = user_id_param
  ORDER BY 
    CASE 
      WHEN role = 'admin'::app_role THEN 1
      WHEN role = 'reviewer'::app_role THEN 2
      WHEN role = 'company'::app_role THEN 3
      ELSE 4
    END
  LIMIT 1;
$$;

-- 5. Health check function
CREATE OR REPLACE FUNCTION public.admin_health_check()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
  user_id_val uuid;
BEGIN
  user_id_val := auth.uid();
  
  SELECT jsonb_build_object(
    'auth_uid', user_id_val,
    'has_admin_role', public.is_admin_secure(),
    'can_manage_reviews', public.can_manage_reviews(user_id_val),
    'can_view_security', public.can_view_security_data(user_id_val),
    'user_roles', (
      SELECT jsonb_agg(role)
      FROM user_roles
      WHERE user_id = user_id_val
    ),
    'timestamp', now()
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Phase 2: Normalize RLS Policies
-- ================================================

-- PRODUCT_REVIEWS: Clean slate
DROP POLICY IF EXISTS "Admins and reviewers can insert reviews" ON public.product_reviews;
DROP POLICY IF EXISTS "Admins and reviewers can update reviews" ON public.product_reviews;
DROP POLICY IF EXISTS "Admins can delete reviews" ON public.product_reviews;
DROP POLICY IF EXISTS "Admins can view all reviews" ON public.product_reviews;
DROP POLICY IF EXISTS "Review access for assigned users" ON public.product_reviews;
DROP POLICY IF EXISTS "Review update for assigned users" ON public.product_reviews;
DROP POLICY IF EXISTS "Reviewers can view their assigned reviews" ON public.product_reviews;

-- Recreate clean policies
CREATE POLICY "Admins full access to reviews"
ON public.product_reviews
FOR ALL
TO authenticated
USING (is_admin_secure())
WITH CHECK (is_admin_secure());

CREATE POLICY "Reviewers can view assigned reviews"
ON public.product_reviews
FOR SELECT
TO authenticated
USING (assigned_to = auth.uid() OR has_role(auth.uid(), 'reviewer'::app_role));

CREATE POLICY "Reviewers can update assigned reviews"
ON public.product_reviews
FOR UPDATE
TO authenticated
USING (assigned_to = auth.uid())
WITH CHECK (assigned_to = auth.uid());

-- REVIEW_ROUNDS: Admin only
DROP POLICY IF EXISTS "Admins can manage all rounds v2" ON public.review_rounds;
DROP POLICY IF EXISTS "Reviewers can view rounds they're assigned to" ON public.review_rounds;

CREATE POLICY "Admins full access to review_rounds"
ON public.review_rounds
FOR ALL
TO authenticated
USING (is_admin_secure())
WITH CHECK (is_admin_secure());

CREATE POLICY "Reviewers view assigned rounds"
ON public.review_rounds
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'reviewer'::app_role) 
  AND EXISTS (
    SELECT 1 FROM product_reviews pr 
    WHERE pr.review_round_id = review_rounds.id 
    AND pr.assigned_to = auth.uid()
  )
);

-- ROLE_REQUESTS: Normalize
DROP POLICY IF EXISTS "Admins can update requests v2" ON public.role_requests;
DROP POLICY IF EXISTS "Admins can view all requests v2" ON public.role_requests;
DROP POLICY IF EXISTS "Users can insert own requests" ON public.role_requests;
DROP POLICY IF EXISTS "Users can view own requests" ON public.role_requests;

CREATE POLICY "Admins full access to role_requests"
ON public.role_requests
FOR ALL
TO authenticated
USING (is_admin_secure())
WITH CHECK (is_admin_secure());

CREATE POLICY "Users can create own role requests"
ON public.role_requests
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own role requests"
ON public.role_requests
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- SECURITY_EVENTS: Admin + service role
DROP POLICY IF EXISTS "Admins can update security events" ON public.security_events;
DROP POLICY IF EXISTS "Admins can view security events" ON public.security_events;
DROP POLICY IF EXISTS "Service role full access to security_events" ON public.security_events;

CREATE POLICY "Admins can view security_events"
ON public.security_events
FOR SELECT
TO authenticated
USING (can_view_security_data(auth.uid()));

CREATE POLICY "Admins can update security_events"
ON public.security_events
FOR UPDATE
TO authenticated
USING (can_view_security_data(auth.uid()))
WITH CHECK (can_view_security_data(auth.uid()));

CREATE POLICY "Service role full access security_events"
ON public.security_events
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- USER_REGISTRATION_NOTIFICATIONS: Admin access
DROP POLICY IF EXISTS "Admins can view registrations" ON public.user_registration_notifications;
DROP POLICY IF EXISTS "Admins can update registrations" ON public.user_registration_notifications;
DROP POLICY IF EXISTS "Service role can insert registration notifications" ON public.user_registration_notifications;

CREATE POLICY "Admins can view registration notifications"
ON public.user_registration_notifications
FOR SELECT
TO authenticated
USING (is_admin_secure());

CREATE POLICY "Admins can update registration notifications"
ON public.user_registration_notifications
FOR UPDATE
TO authenticated
USING (is_admin_secure())
WITH CHECK (is_admin_secure());

CREATE POLICY "Service role can insert registration notifications"
ON public.user_registration_notifications
FOR INSERT
TO service_role
WITH CHECK (true);