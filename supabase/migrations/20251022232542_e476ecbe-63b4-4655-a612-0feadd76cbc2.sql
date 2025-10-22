-- Update the super admins function to include info@dlinrt.eu
-- This version disables triggers during initialization to avoid notification errors
CREATE OR REPLACE FUNCTION public.initialize_super_admins()
RETURNS TABLE(email text, status text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  super_admin_emails text[] := ARRAY[
    'matteo.maspero@dlinrt.eu',
    'mustafa.kadhim@dlinrt.eu', 
    'ana.barragan@dlinrt.eu',
    'info@dlinrt.eu'
  ];
  admin_email text;
  admin_user_id uuid;
BEGIN
  -- Disable triggers temporarily to avoid notification creation during initialization
  SET session_replication_role = replica;
  
  -- Loop through each super admin email
  FOREACH admin_email IN ARRAY super_admin_emails
  LOOP
    -- Find user by email
    SELECT id INTO admin_user_id
    FROM auth.users
    WHERE auth.users.email = admin_email;
    
    -- If user exists, grant admin role
    IF admin_user_id IS NOT NULL THEN
      INSERT INTO public.user_roles (user_id, role, granted_by)
      VALUES (admin_user_id, 'admin', admin_user_id)
      ON CONFLICT (user_id, role) DO NOTHING;
      
      RETURN QUERY SELECT admin_email, 'Admin role granted'::text;
    ELSE
      RETURN QUERY SELECT admin_email, 'User not found - needs to sign up'::text;
    END IF;
  END LOOP;
  
  -- Re-enable triggers
  SET session_replication_role = DEFAULT;
END;
$$;

-- Execute to grant admin role to info@dlinrt.eu if the account exists
SELECT * FROM public.initialize_super_admins();