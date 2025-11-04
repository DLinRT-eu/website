-- Create review rounds table for tracking periodic review cycles
CREATE TABLE public.review_rounds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  round_number INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  start_date DATE NOT NULL,
  end_date DATE,
  default_deadline DATE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  total_products INTEGER DEFAULT 0,
  total_assignments INTEGER DEFAULT 0,
  CONSTRAINT valid_status CHECK (status IN ('draft', 'active', 'completed', 'archived'))
);

-- Add review round reference to product_reviews
ALTER TABLE public.product_reviews 
ADD COLUMN review_round_id UUID REFERENCES public.review_rounds(id);

-- Create review round statistics table
CREATE TABLE public.review_round_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  round_id UUID REFERENCES public.review_rounds(id) ON DELETE CASCADE,
  total_assignments INTEGER DEFAULT 0,
  completed_count INTEGER DEFAULT 0,
  in_progress_count INTEGER DEFAULT 0,
  pending_count INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(round_id)
);

-- Enable RLS on new tables
ALTER TABLE public.review_rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_round_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for review_rounds
CREATE POLICY "Admins can manage all rounds"
ON public.review_rounds
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Reviewers can view rounds they're assigned to"
ON public.review_rounds
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'reviewer') AND
  EXISTS (
    SELECT 1 FROM public.product_reviews
    WHERE review_round_id = review_rounds.id
    AND assigned_to = auth.uid()
  )
);

-- RLS Policies for review_round_stats
CREATE POLICY "Admins can manage all stats"
ON public.review_round_stats
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Reviewers can view stats for their rounds"
ON public.review_round_stats
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'reviewer') AND
  EXISTS (
    SELECT 1 FROM public.product_reviews pr
    JOIN public.review_rounds rr ON pr.review_round_id = rr.id
    WHERE rr.id = review_round_stats.round_id
    AND pr.assigned_to = auth.uid()
  )
);

-- Create function to update round stats
CREATE OR REPLACE FUNCTION public.update_review_round_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update or insert stats for the round
  INSERT INTO public.review_round_stats (
    round_id,
    total_assignments,
    completed_count,
    in_progress_count,
    pending_count,
    updated_at
  )
  SELECT 
    NEW.review_round_id,
    COUNT(*),
    COUNT(*) FILTER (WHERE status = 'completed'),
    COUNT(*) FILTER (WHERE status = 'in_progress'),
    COUNT(*) FILTER (WHERE status = 'pending'),
    NOW()
  FROM public.product_reviews
  WHERE review_round_id = NEW.review_round_id
  ON CONFLICT (round_id) 
  DO UPDATE SET
    total_assignments = EXCLUDED.total_assignments,
    completed_count = EXCLUDED.completed_count,
    in_progress_count = EXCLUDED.in_progress_count,
    pending_count = EXCLUDED.pending_count,
    updated_at = NOW();
    
  RETURN NEW;
END;
$$;

-- Create trigger to auto-update stats
CREATE TRIGGER update_round_stats_trigger
AFTER INSERT OR UPDATE ON public.product_reviews
FOR EACH ROW
WHEN (NEW.review_round_id IS NOT NULL)
EXECUTE FUNCTION public.update_review_round_stats();

-- Add updated_at trigger to review_rounds
CREATE TRIGGER update_review_rounds_updated_at
BEFORE UPDATE ON public.review_rounds
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();