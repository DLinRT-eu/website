-- Fix security definer view by recreating with security_invoker
DROP VIEW IF EXISTS public.user_product_experiences;

CREATE VIEW public.user_product_experiences
  WITH (security_invoker=on)
AS
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