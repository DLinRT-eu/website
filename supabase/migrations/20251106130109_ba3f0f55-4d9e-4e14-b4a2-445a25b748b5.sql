-- Auto-grant reviewer role to @dlinrt.eu team members

-- Function to auto-grant reviewer role to all @dlinrt.eu users (excluding info@)
CREATE OR REPLACE FUNCTION public.auto_grant_dlinrt_reviewer_role()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  admin_user_id uuid;
  user_record RECORD;
BEGIN
  -- Find an admin user to use as granted_by
  SELECT id INTO admin_user_id 
  FROM auth.users 
  WHERE email = 'matteo.maspero@dlinrt.eu' 
  LIMIT 1;
  
  -- If no admin found, log error and exit
  IF admin_user_id IS NULL THEN
    RAISE WARNING 'No admin user found to use as granted_by';
    RETURN;
  END IF;
  
  -- Grant reviewer role to all @dlinrt.eu users (excluding info@)
  FOR user_record IN 
    SELECT id, email 
    FROM auth.users 
    WHERE email LIKE '%@dlinrt.eu' 
      AND email NOT LIKE 'info@dlinrt.eu'
  LOOP
    -- Insert reviewer role, ignore conflicts
    INSERT INTO public.user_roles (user_id, role, granted_by)
    VALUES (user_record.id, 'reviewer', admin_user_id)
    ON CONFLICT (user_id, role) DO NOTHING;
    
    RAISE NOTICE 'Granted reviewer role to: %', user_record.email;
  END LOOP;
END;
$$;

-- Trigger function to auto-grant reviewer role on new @dlinrt.eu user registration
CREATE OR REPLACE FUNCTION public.trigger_auto_grant_dlinrt_reviewer()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Only process @dlinrt.eu emails (excluding info@)
  IF NEW.email LIKE '%@dlinrt.eu' AND NEW.email NOT LIKE 'info@dlinrt.eu' THEN
    -- Find an admin user to use as granted_by
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = 'matteo.maspero@dlinrt.eu' 
    LIMIT 1;
    
    -- If admin found, grant reviewer role
    IF admin_user_id IS NOT NULL THEN
      INSERT INTO public.user_roles (user_id, role, granted_by)
      VALUES (NEW.id, 'reviewer', admin_user_id)
      ON CONFLICT (user_id, role) DO NOTHING;
      
      RAISE NOTICE 'Auto-granted reviewer role to new user: %', NEW.email;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Drop trigger if exists (to avoid conflicts)
DROP TRIGGER IF EXISTS on_dlinrt_user_created ON auth.users;

-- Create trigger on auth.users for new registrations
CREATE TRIGGER on_dlinrt_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_auto_grant_dlinrt_reviewer();

-- Run function immediately to grant roles to existing @dlinrt.eu users
SELECT public.auto_grant_dlinrt_reviewer_role();