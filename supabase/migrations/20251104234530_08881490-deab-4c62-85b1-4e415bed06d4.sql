-- Add missing INSERT policy for reviewer_expertise table
-- This allows authenticated users to insert their own expertise preferences

CREATE POLICY "Users can insert own expertise"
ON public.reviewer_expertise
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);