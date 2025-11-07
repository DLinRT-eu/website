-- Clean up any invalid assigned_to references
UPDATE product_reviews pr
SET assigned_to = NULL
WHERE assigned_to IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM profiles p WHERE p.id = pr.assigned_to);

-- Add foreign key constraint from product_reviews.assigned_to to profiles.id
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'product_reviews_assigned_to_fkey'
  ) THEN
    ALTER TABLE public.product_reviews
      ADD CONSTRAINT product_reviews_assigned_to_fkey
      FOREIGN KEY (assigned_to) REFERENCES public.profiles(id)
      ON DELETE SET NULL;
  END IF;
END $$;

-- Add index for better join performance
CREATE INDEX IF NOT EXISTS idx_product_reviews_assigned_to
ON public.product_reviews(assigned_to);