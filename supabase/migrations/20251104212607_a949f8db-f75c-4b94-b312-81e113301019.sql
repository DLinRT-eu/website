-- Phase 3: Add approval status fields to profiles table

-- Add approval_status column with constraint
ALTER TABLE public.profiles 
ADD COLUMN approval_status TEXT DEFAULT 'pending' 
CHECK (approval_status IN ('pending', 'approved', 'rejected'));

-- Add approved_by column (references the admin who approved)
ALTER TABLE public.profiles 
ADD COLUMN approved_by UUID REFERENCES auth.users(id);

-- Add approved_at timestamp
ALTER TABLE public.profiles 
ADD COLUMN approved_at TIMESTAMPTZ;

-- Update existing profiles to 'approved' status for backward compatibility
-- This ensures existing users can continue to use the system
UPDATE public.profiles 
SET approval_status = 'approved', 
    approved_at = created_at 
WHERE approval_status = 'pending';

-- Create index for performance
CREATE INDEX idx_profiles_approval_status ON public.profiles(approval_status);

-- Update verify_user_registration function to also update profile approval status
CREATE OR REPLACE FUNCTION public.verify_user_registration(
  p_user_id uuid, 
  p_verified boolean DEFAULT true
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Check if caller is admin
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only admins can verify user registrations';
  END IF;
  
  -- Update notification record
  UPDATE public.user_registration_notifications
  SET verified = p_verified,
      verified_at = NOW(),
      verified_by = auth.uid(),
      notification_status = CASE 
        WHEN p_verified THEN 'approved' 
        ELSE 'rejected' 
      END
  WHERE user_id = p_user_id;
  
  -- Update profile approval status
  UPDATE public.profiles
  SET approval_status = CASE 
        WHEN p_verified THEN 'approved' 
        ELSE 'rejected' 
      END,
      approved_by = auth.uid(),
      approved_at = NOW()
  WHERE id = p_user_id;
  
  -- TODO: Send confirmation email to user (Phase 7 enhancement)
  
  RETURN TRUE;
END;
$function$;