-- Add new columns to reviewer_expertise for company and product preferences
ALTER TABLE public.reviewer_expertise
ADD COLUMN preference_type TEXT NOT NULL DEFAULT 'category',
ADD COLUMN company_id TEXT,
ADD COLUMN product_id TEXT;

-- Add check constraint to ensure preference_type is valid
ALTER TABLE public.reviewer_expertise
ADD CONSTRAINT reviewer_expertise_preference_type_check 
CHECK (preference_type IN ('category', 'company', 'product'));

-- Add check constraint to ensure only one preference identifier is set
ALTER TABLE public.reviewer_expertise
ADD CONSTRAINT reviewer_expertise_preference_identifier_check
CHECK (
  (preference_type = 'category' AND category IS NOT NULL AND company_id IS NULL AND product_id IS NULL) OR
  (preference_type = 'company' AND company_id IS NOT NULL AND category IS NULL AND product_id IS NULL) OR
  (preference_type = 'product' AND product_id IS NOT NULL AND category IS NULL AND company_id IS NULL)
);

-- Drop old unique constraint if exists and create new one
ALTER TABLE public.reviewer_expertise
DROP CONSTRAINT IF EXISTS reviewer_expertise_user_id_category_key;

-- Create new unique constraint covering all preference types
CREATE UNIQUE INDEX reviewer_expertise_unique_preference 
ON public.reviewer_expertise (user_id, preference_type, COALESCE(category, ''), COALESCE(company_id, ''), COALESCE(product_id, ''));

-- Add indexes for performance
CREATE INDEX idx_reviewer_expertise_company_id ON public.reviewer_expertise(company_id) WHERE company_id IS NOT NULL;
CREATE INDEX idx_reviewer_expertise_product_id ON public.reviewer_expertise(product_id) WHERE product_id IS NOT NULL;

-- Make category nullable since it's not always used
ALTER TABLE public.reviewer_expertise
ALTER COLUMN category DROP NOT NULL;