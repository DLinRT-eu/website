-- Create assignment history table for audit logging
CREATE TABLE IF NOT EXISTS public.assignment_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_round_id UUID NOT NULL REFERENCES public.review_rounds(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  previous_assignee UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  changed_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  change_type TEXT NOT NULL CHECK (change_type IN ('initial', 'reassign', 'remove')),
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_assignment_history_round ON public.assignment_history(review_round_id, created_at DESC);
CREATE INDEX idx_assignment_history_product ON public.assignment_history(product_id);
CREATE INDEX idx_assignment_history_assignee ON public.assignment_history(assigned_to);

-- Enable RLS
ALTER TABLE public.assignment_history ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admins can view all assignment history"
  ON public.assignment_history
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Reviewers can view own assignment history"
  ON public.assignment_history
  FOR SELECT
  USING (
    assigned_to = auth.uid() OR 
    previous_assignee = auth.uid() OR
    has_role(auth.uid(), 'reviewer')
  );

CREATE POLICY "Admins can insert assignment history"
  ON public.assignment_history
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- Grant permissions
GRANT SELECT ON public.assignment_history TO authenticated;
GRANT INSERT ON public.assignment_history TO authenticated;