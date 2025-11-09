-- Add foreign key constraints to fix relationship issues

-- First, clean up any invalid references in product_reviews
UPDATE product_reviews
SET assigned_to = NULL
WHERE assigned_to IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM profiles WHERE profiles.id = product_reviews.assigned_to);

-- Add foreign key for product_reviews.assigned_to -> profiles.id
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

-- Create index for better join performance on product_reviews.assigned_to
CREATE INDEX IF NOT EXISTS idx_product_reviews_assigned_to
ON public.product_reviews(assigned_to);

-- Clean up any invalid references in role_requests
DELETE FROM role_requests
WHERE user_id IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM profiles WHERE profiles.id = role_requests.user_id);

-- Add foreign key for role_requests.user_id -> profiles.id
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'role_requests_user_id_fkey'
  ) THEN
    ALTER TABLE public.role_requests
      ADD CONSTRAINT role_requests_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES public.profiles(id)
      ON DELETE CASCADE;
  END IF;
END $$;

-- Create index for better join performance on role_requests.user_id
CREATE INDEX IF NOT EXISTS idx_role_requests_user_id
ON public.role_requests(user_id);