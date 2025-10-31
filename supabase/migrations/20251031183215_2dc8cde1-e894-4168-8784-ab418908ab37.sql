-- Phase 1: Create user_products table for tracking product adoptions
CREATE TABLE public.user_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  company_id TEXT NOT NULL,
  
  -- Adoption details
  adoption_date DATE,
  institution TEXT,
  department TEXT,
  
  -- User experience and feedback
  experience_rating INTEGER CHECK (experience_rating >= 1 AND experience_rating <= 5),
  experience_notes TEXT,
  use_case TEXT,
  
  -- Contact preferences
  willing_to_share_experience BOOLEAN DEFAULT false,
  contact_preference TEXT CHECK (contact_preference IN ('email', 'linkedin', 'no_contact')) DEFAULT 'no_contact',
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, product_id)
);

-- Enable RLS
ALTER TABLE public.user_products ENABLE ROW LEVEL SECURITY;

-- Users can view their own products
CREATE POLICY "Users can view own products"
ON public.user_products FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert their own products
CREATE POLICY "Users can insert own products"
ON public.user_products FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own products
CREATE POLICY "Users can update own products"
ON public.user_products FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Users can delete their own products
CREATE POLICY "Users can delete own products"
ON public.user_products FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Admins and reviewers can view all products
CREATE POLICY "Admins and reviewers can view all products"
ON public.user_products FOR SELECT
TO authenticated
USING (
  has_any_role(auth.uid(), ARRAY['admin', 'reviewer']::app_role[])
);

-- Companies can view products of their own company (only if user opted in)
CREATE POLICY "Companies can view own company products"
ON public.user_products FOR SELECT
TO authenticated
USING (
  willing_to_share_experience = true
  AND company_id IN (
    SELECT cr.company_id 
    FROM public.company_representatives cr 
    WHERE cr.user_id = auth.uid() AND cr.verified = true
  )
);

-- Create view for contact-enabled user experiences (privacy-preserving)
CREATE VIEW public.user_product_experiences AS
SELECT 
  up.id,
  up.product_id,
  up.company_id,
  up.adoption_date,
  up.institution,
  up.department,
  up.experience_rating,
  up.experience_notes,
  up.use_case,
  up.contact_preference,
  up.user_id,
  p.first_name,
  p.last_name,
  p.email,
  p.linkedin_url,
  p.specialization
FROM public.user_products up
JOIN public.profiles p ON up.user_id = p.id
WHERE up.willing_to_share_experience = true
  AND up.contact_preference != 'no_contact';

-- Grant access to the view
GRANT SELECT ON public.user_product_experiences TO authenticated;

-- Add trigger for updated_at
CREATE TRIGGER update_user_products_updated_at
  BEFORE UPDATE ON public.user_products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();