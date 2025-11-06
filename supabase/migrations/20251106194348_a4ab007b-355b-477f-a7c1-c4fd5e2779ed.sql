-- Add INSERT policy for admins to create product reviews
CREATE POLICY "Admins can insert reviews"
  ON public.product_reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role)
  );

-- Create a function to handle quick assignments (creates round + assignments + notifications)
CREATE OR REPLACE FUNCTION public.quick_assign_products(
  p_product_ids text[],
  p_reviewer_id uuid,
  p_deadline date DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_round_id uuid;
  v_round_number integer;
  v_product_id text;
  v_assigned_count integer := 0;
BEGIN
  -- Check if caller is admin
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Only admins can quick assign products';
  END IF;

  -- Get next round number
  SELECT COALESCE(MAX(round_number), 0) + 1 INTO v_round_number
  FROM review_rounds;

  -- Create a quick assignment round
  INSERT INTO review_rounds (
    name,
    round_number,
    description,
    status,
    start_date,
    end_date,
    default_deadline,
    created_by,
    total_products
  ) VALUES (
    'Quick Assignment ' || to_char(now(), 'YYYY-MM-DD HH24:MI'),
    v_round_number,
    'Quick assignment created by admin',
    'active',
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '30 days',
    COALESCE(p_deadline, CURRENT_DATE + INTERVAL '14 days'),
    auth.uid(),
    array_length(p_product_ids, 1)
  )
  RETURNING id INTO v_round_id;

  -- Create product reviews for each product
  FOREACH v_product_id IN ARRAY p_product_ids
  LOOP
    INSERT INTO product_reviews (
      product_id,
      review_round_id,
      assigned_to,
      deadline,
      status,
      priority
    ) VALUES (
      v_product_id,
      v_round_id,
      p_reviewer_id,
      COALESCE(p_deadline, CURRENT_DATE + INTERVAL '14 days'),
      'pending',
      'medium'
    )
    ON CONFLICT DO NOTHING;

    -- Log assignment history
    INSERT INTO assignment_history (
      review_round_id,
      product_id,
      assigned_to,
      change_type,
      changed_by,
      reason
    ) VALUES (
      v_round_id,
      v_product_id,
      p_reviewer_id,
      'initial_assignment',
      auth.uid(),
      'Quick assignment by admin'
    );

    v_assigned_count := v_assigned_count + 1;
  END LOOP;

  -- Update round total assignments
  UPDATE review_rounds
  SET total_assignments = v_assigned_count
  WHERE id = v_round_id;

  -- Create notification for reviewer
  INSERT INTO notifications (
    user_id,
    title,
    message,
    type,
    link
  ) VALUES (
    p_reviewer_id,
    'New Product Reviews Assigned',
    format('You have been assigned %s product(s) to review', v_assigned_count),
    'info',
    '/admin/review-rounds'
  );

  RETURN jsonb_build_object(
    'success', true,
    'round_id', v_round_id,
    'assigned_count', v_assigned_count
  );
END;
$$;