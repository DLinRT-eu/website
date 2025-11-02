-- Quick Setup Script for Reviewer Expertise
-- Run this in Supabase SQL Editor after reviewers have registered

-- This script adds expertise for @dlinrt.eu team members
-- Modify user_id values after reviewers register

-- Helper query to find user IDs by email
-- Run this first to get the UUIDs:
/*
SELECT id, email, first_name, last_name 
FROM auth.users 
WHERE email LIKE '%@dlinrt.eu' 
  AND email NOT LIKE 'info@dlinrt.eu'
ORDER BY email;
*/

-- Example: Add expertise for a reviewer
-- Replace 'USER_ID_HERE' with actual UUID from above query

-- Template for adding expertise
/*
INSERT INTO public.reviewer_expertise (user_id, category, priority)
VALUES 
  ('USER_ID_HERE', 'auto-contouring', 1),
  ('USER_ID_HERE', 'treatment-planning', 2),
  ('USER_ID_HERE', 'performance-monitor', 3)
ON CONFLICT (user_id, category) 
DO UPDATE SET priority = EXCLUDED.priority;
*/

-- Auto-grant reviewer role to all @dlinrt.eu emails (excluding info@)
DO $$
DECLARE
  user_record RECORD;
BEGIN
  FOR user_record IN 
    SELECT id, email 
    FROM auth.users 
    WHERE email LIKE '%@dlinrt.eu' 
      AND email NOT LIKE 'info@dlinrt.eu'
  LOOP
    -- Insert reviewer role if not exists
    INSERT INTO public.user_roles (user_id, role, granted_by)
    VALUES (
      user_record.id,
      'reviewer',
      (SELECT id FROM auth.users WHERE email = 'admin@dlinrt.eu' LIMIT 1) -- Replace with actual admin user_id
    )
    ON CONFLICT (user_id, role) DO NOTHING;
    
    RAISE NOTICE 'Granted reviewer role to: %', user_record.email;
  END LOOP;
END $$;

-- Verify reviewer roles
SELECT 
  u.email,
  u.id as user_id,
  ur.role,
  ur.granted_at
FROM auth.users u
JOIN public.user_roles ur ON ur.user_id = u.id
WHERE u.email LIKE '%@dlinrt.eu'
  AND u.email NOT LIKE 'info@dlinrt.eu'
ORDER BY u.email;

-- Check current expertise assignments
SELECT 
  p.email,
  p.first_name,
  p.last_name,
  re.category,
  re.priority
FROM public.profiles p
LEFT JOIN public.reviewer_expertise re ON re.user_id = p.id
WHERE p.email LIKE '%@dlinrt.eu'
ORDER BY p.email, re.priority;

-- Count unassigned products by category
SELECT 
  category,
  COUNT(*) as unassigned_count
FROM (
  SELECT DISTINCT ON (id) id, category, name, company
  FROM (VALUES
    -- Add your product IDs and categories here
    -- This is a placeholder - actual products are in your data files
  ) AS products(id, category, name, company)
  WHERE NOT EXISTS (
    SELECT 1 FROM public.product_reviews pr WHERE pr.product_id = products.id
  )
) AS unassigned_products
GROUP BY category
ORDER BY unassigned_count DESC;

-- Manual expertise insertion examples for the 8 reviewers:

-- 1. Bryan Thebeemang (bryanthebeemang@gmail.com)
/*
INSERT INTO public.reviewer_expertise (user_id, category, priority)
VALUES 
  ('BRYAN_USER_ID', 'reconstruction', 1),
  ('BRYAN_USER_ID', 'image-enhancement', 2),
  ('BRYAN_USER_ID', 'treatment-planning', 3),
  ('BRYAN_USER_ID', 'performance-monitor', 4)
ON CONFLICT (user_id, category) DO UPDATE SET priority = EXCLUDED.priority;
*/

-- 2. Usman Lula (usman.lula@uhb.nhs.uk)
/*
INSERT INTO public.reviewer_expertise (user_id, category, priority)
VALUES 
  ('USMAN_USER_ID', 'treatment-planning', 1),
  ('USMAN_USER_ID', 'tracking', 2),
  ('USMAN_USER_ID', 'performance-monitor', 3),
  ('USMAN_USER_ID', 'clinical-prediction', 4),
  ('USMAN_USER_ID', 'auto-contouring', 5),
  ('USMAN_USER_ID', 'registration', 6),
  ('USMAN_USER_ID', 'reconstruction', 7),
  ('USMAN_USER_ID', 'image-enhancement', 8)
ON CONFLICT (user_id, category) DO UPDATE SET priority = EXCLUDED.priority;
*/

-- 3. Amith Kamath (amithjkamath@outlook.com)
/*
INSERT INTO public.reviewer_expertise (user_id, category, priority)
VALUES 
  ('AMITH_USER_ID', 'auto-contouring', 1),
  ('AMITH_USER_ID', 'treatment-planning', 2),
  ('AMITH_USER_ID', 'performance-monitor', 3),
  ('AMITH_USER_ID', 'clinical-prediction', 4)
ON CONFLICT (user_id, category) DO UPDATE SET priority = EXCLUDED.priority;
*/

-- 4. Mark Gooding (mark.gooding@inpictura.com) - Industry
/*
INSERT INTO public.reviewer_expertise (user_id, category, priority)
VALUES 
  ('MARK_USER_ID', 'auto-contouring', 1),
  ('MARK_USER_ID', 'registration', 2)
ON CONFLICT (user_id, category) DO UPDATE SET priority = EXCLUDED.priority;
*/

-- 5. Adam Miovecz (adam.miovecz@gmail.com)
/*
INSERT INTO public.reviewer_expertise (user_id, category, priority)
VALUES 
  ('ADAM_USER_ID', 'image-enhancement', 1),
  ('ADAM_USER_ID', 'reconstruction', 2)
ON CONFLICT (user_id, category) DO UPDATE SET priority = EXCLUDED.priority;
*/

-- 6. Marcos Jiménez (mjaponc@gmail.com)
/*
INSERT INTO public.reviewer_expertise (user_id, category, priority)
VALUES 
  ('MARCOS_USER_ID', 'treatment-planning', 1),
  ('MARCOS_USER_ID', 'clinical-prediction', 2)
ON CONFLICT (user_id, category) DO UPDATE SET priority = EXCLUDED.priority;
*/

-- 7. Khaled Wahid (kawahid@mdanderson.org)
/*
INSERT INTO public.reviewer_expertise (user_id, category, priority)
VALUES 
  ('KHALED_USER_ID', 'image-synthesis', 1),
  ('KHALED_USER_ID', 'reconstruction', 2)
ON CONFLICT (user_id, category) DO UPDATE SET priority = EXCLUDED.priority;
*/

-- 8. Matthew Jones (matthew.jones@uhcw.nhs.uk)
/*
INSERT INTO public.reviewer_expertise (user_id, category, priority)
VALUES 
  ('MATTHEW_USER_ID', 'tracking', 1),
  ('MATTHEW_USER_ID', 'performance-monitor', 2),
  ('MATTHEW_USER_ID', 'platform', 3)
ON CONFLICT (user_id, category) DO UPDATE SET priority = EXCLUDED.priority;
*/

-- After adding expertise, verify:
SELECT 
  p.email,
  p.first_name || ' ' || p.last_name as name,
  COUNT(re.id) as expertise_count,
  STRING_AGG(re.category || ' (' || re.priority || ')', ', ' ORDER BY re.priority) as expertise
FROM public.profiles p
LEFT JOIN public.reviewer_expertise re ON re.user_id = p.id
WHERE p.id IN (
  SELECT user_id FROM public.user_roles WHERE role IN ('reviewer', 'admin')
)
GROUP BY p.id, p.email, p.first_name, p.last_name
ORDER BY expertise_count DESC, p.email;

-- Check reviewer workload balance
SELECT 
  p.email,
  p.first_name || ' ' || p.last_name as name,
  COUNT(DISTINCT re.id) as expertise_areas,
  COUNT(DISTINCT pr.id) as active_assignments,
  ROUND(COUNT(DISTINCT pr.id)::numeric / NULLIF(COUNT(DISTINCT re.id), 0), 2) as assignments_per_expertise
FROM public.profiles p
LEFT JOIN public.reviewer_expertise re ON re.user_id = p.id
LEFT JOIN public.product_reviews pr ON pr.assigned_to = p.id AND pr.status != 'completed'
WHERE p.id IN (
  SELECT user_id FROM public.user_roles WHERE role IN ('reviewer', 'admin')
)
GROUP BY p.id, p.email, p.first_name, p.last_name
ORDER BY active_assignments DESC, expertise_areas DESC;
