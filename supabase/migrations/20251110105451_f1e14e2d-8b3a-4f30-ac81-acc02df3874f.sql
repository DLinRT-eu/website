-- Fix product_reviews RLS policies for consistent admin access
-- Drop redundant insert-only policy
DROP POLICY IF EXISTS "Admins can insert reviews" ON product_reviews;

-- Add explicit DELETE policy for admins
CREATE POLICY "Admins can delete reviews"
ON product_reviews
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Update the ALL policy to use has_role for consistency
DROP POLICY IF EXISTS "Admins full access to reviews" ON product_reviews;
CREATE POLICY "Admins full access to reviews"
ON product_reviews
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create admin RPC function for secure delete operations with assignment history logging
CREATE OR REPLACE FUNCTION public.delete_product_review_admin(review_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_review product_reviews;
  v_result json;
BEGIN
  -- Verify admin status
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;

  -- Get review details before deletion for logging
  SELECT * INTO v_review FROM product_reviews WHERE id = review_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Review not found';
  END IF;

  -- Delete the review
  DELETE FROM product_reviews WHERE id = review_id;

  -- Log to assignment history if review_round_id exists
  IF v_review.review_round_id IS NOT NULL THEN
    INSERT INTO assignment_history (
      review_round_id,
      product_id,
      previous_assignee,
      change_type,
      changed_by,
      reason
    ) VALUES (
      v_review.review_round_id,
      v_review.product_id,
      v_review.assigned_to,
      'remove',
      auth.uid(),
      'Removed by admin via RPC'
    );
  END IF;

  v_result := json_build_object(
    'success', true,
    'deleted_review_id', review_id,
    'product_id', v_review.product_id
  );

  RETURN v_result;
END;
$$;