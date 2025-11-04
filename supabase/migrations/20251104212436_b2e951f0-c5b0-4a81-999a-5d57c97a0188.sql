-- Fix handle_new_user trigger to create profiles consistently for all users
-- This ensures both institutional and non-institutional emails get profiles
-- But marks them appropriately for admin review

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_is_institutional BOOLEAN;
BEGIN
  -- Check if email is institutional
  v_is_institutional := public.is_institutional_email(NEW.email);
  
  -- Always create profile for all new users (allows login and ApprovalGate to work)
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  )
  ON CONFLICT (id) DO NOTHING;
  
  IF NOT v_is_institutional THEN
    -- Log the blocked registration for non-institutional emails
    INSERT INTO public.user_registration_notifications (
      user_id, 
      email, 
      notification_status, 
      failure_reason
    ) VALUES (
      NEW.id,
      NEW.email,
      'blocked',
      'Non-institutional email address - manual admin review required'
    );
    
    RAISE NOTICE 'Non-institutional email registration requires approval: %', NEW.email;
    RETURN NEW;
  END IF;

  -- Queue notification for admin for institutional emails
  INSERT INTO public.user_registration_notifications (
    user_id,
    email,
    notification_status
  ) VALUES (
    NEW.id,
    NEW.email,
    'pending'
  );
  
  RAISE NOTICE 'User registration notification queued for: %', NEW.email;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error in handle_new_user for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$function$;