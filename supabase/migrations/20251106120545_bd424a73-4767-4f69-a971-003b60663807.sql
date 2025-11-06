-- Phase 2: Fix RLS Policies for All Affected Tables

-- ============================================
-- 1. Fix role_requests table
-- ============================================
DROP POLICY IF EXISTS "Admins can view all requests" ON role_requests;
DROP POLICY IF EXISTS "Admins can update requests" ON role_requests;

CREATE POLICY "Admins can view all requests v2" ON role_requests
  FOR SELECT 
  TO authenticated
  USING (public.is_admin_secure());

CREATE POLICY "Admins can update requests v2" ON role_requests
  FOR UPDATE 
  TO authenticated
  USING (public.is_admin_secure())
  WITH CHECK (public.is_admin_secure());

-- ============================================
-- 2. Fix product_reviews table
-- ============================================
DROP POLICY IF EXISTS "Admins can insert reviews" ON product_reviews;
DROP POLICY IF EXISTS "Admins can manage all reviews" ON product_reviews;
DROP POLICY IF EXISTS "Reviewers can insert their own reviews" ON product_reviews;

CREATE POLICY "Admins and reviewers can insert reviews" ON product_reviews
  FOR INSERT 
  TO authenticated
  WITH CHECK (public.can_manage_reviews(auth.uid()));

CREATE POLICY "Admins can view all reviews" ON product_reviews
  FOR SELECT 
  TO authenticated
  USING (public.is_admin_secure());

CREATE POLICY "Reviewers can view their assigned reviews" ON product_reviews
  FOR SELECT 
  TO authenticated
  USING (assigned_to = auth.uid());

CREATE POLICY "Admins and reviewers can update reviews" ON product_reviews
  FOR UPDATE 
  TO authenticated
  USING (public.can_manage_reviews(auth.uid()) AND (public.is_admin_secure() OR assigned_to = auth.uid()))
  WITH CHECK (public.can_manage_reviews(auth.uid()) AND (public.is_admin_secure() OR assigned_to = auth.uid()));

-- ============================================
-- 3. Fix review_rounds table
-- ============================================
DROP POLICY IF EXISTS "Admins can manage all rounds" ON review_rounds;

CREATE POLICY "Admins can manage all rounds v2" ON review_rounds
  FOR ALL 
  TO authenticated
  USING (public.is_admin_secure())
  WITH CHECK (public.is_admin_secure());

-- ============================================
-- 4. Fix security_events table (CRITICAL)
-- ============================================
DROP POLICY IF EXISTS "Allow service role access for security_events" ON security_events;

-- Service role needs full access
CREATE POLICY "Service role full access to security_events" ON security_events
  FOR ALL 
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Admins can view and update security events
CREATE POLICY "Admins can view security events" ON security_events
  FOR SELECT 
  TO authenticated
  USING (public.can_view_security_data(auth.uid()));

CREATE POLICY "Admins can update security events" ON security_events
  FOR UPDATE 
  TO authenticated
  USING (public.can_view_security_data(auth.uid()))
  WITH CHECK (public.can_view_security_data(auth.uid()));

-- ============================================
-- 5. Fix user_registration_notifications table
-- ============================================
DROP POLICY IF EXISTS "Admins can view all notifications" ON user_registration_notifications;

CREATE POLICY "Admins can view all notifications v2" ON user_registration_notifications
  FOR SELECT 
  TO authenticated
  USING (public.is_admin_secure());

CREATE POLICY "Admins can update notifications" ON user_registration_notifications
  FOR UPDATE 
  TO authenticated
  USING (public.is_admin_secure())
  WITH CHECK (public.is_admin_secure());

CREATE POLICY "Admins can delete notifications" ON user_registration_notifications
  FOR DELETE 
  TO authenticated
  USING (public.is_admin_secure());