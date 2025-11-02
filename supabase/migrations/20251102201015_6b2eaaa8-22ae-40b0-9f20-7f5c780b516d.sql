-- Add SET search_path protection to SECURITY DEFINER functions
-- This prevents SQL injection via search_path manipulation

-- 1. can_assign_company_role
CREATE OR REPLACE FUNCTION public.can_assign_company_role(p_user_id uuid)
RETURNS TABLE(can_assign boolean, reason text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  has_products BOOLEAN;
  has_reviewer_role BOOLEAN;
BEGIN
  -- Check for products
  SELECT EXISTS (
    SELECT 1 FROM public.user_products
    WHERE user_id = p_user_id
    LIMIT 1
  ) INTO has_products;
  
  IF has_products THEN
    RETURN QUERY SELECT FALSE, 'User has product adoptions'::TEXT;
    RETURN;
  END IF;
  
  -- Check for reviewer role
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = p_user_id
    AND role = 'reviewer'
  ) INTO has_reviewer_role;
  
  IF has_reviewer_role THEN
    RETURN QUERY SELECT FALSE, 'User has Reviewer role'::TEXT;
    RETURN;
  END IF;
  
  RETURN QUERY SELECT TRUE, 'OK'::TEXT;
END;
$function$;

-- 2. can_user_adopt_product
CREATE OR REPLACE FUNCTION public.can_user_adopt_product(p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  -- User cannot adopt products if they have company role
  RETURN NOT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = p_user_id
    AND role = 'company'
  );
END;
$function$;

-- 3. check_company_role_before_product_adoption
CREATE OR REPLACE FUNCTION public.check_company_role_before_product_adoption()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  -- Check if user has company role
  IF EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = NEW.user_id
    AND role = 'company'
  ) THEN
    RAISE EXCEPTION 'Users with Company Representative role cannot adopt products (conflict of interest)';
  END IF;
  
  RETURN NEW;
END;
$function$;

-- 4. check_products_before_company_role
CREATE OR REPLACE FUNCTION public.check_products_before_company_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  -- Only check for company role
  IF NEW.role = 'company' THEN
    -- Check if user has any product adoptions
    IF EXISTS (
      SELECT 1 FROM public.user_products
      WHERE user_id = NEW.user_id
      LIMIT 1
    ) THEN
      RAISE EXCEPTION 'Users with product adoptions cannot be assigned Company Representative role (conflict of interest)';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- 5. check_role_compatibility
CREATE OR REPLACE FUNCTION public.check_role_compatibility()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  -- Check if trying to add company role when user has reviewer role
  IF NEW.role = 'company' AND EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = NEW.user_id
    AND role = 'reviewer'
  ) THEN
    RAISE EXCEPTION 'Company Representative role is incompatible with Reviewer role';
  END IF;
  
  -- Check if trying to add reviewer role when user has company role
  IF NEW.role = 'reviewer' AND EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = NEW.user_id
    AND role = 'company'
  ) THEN
    RAISE EXCEPTION 'Reviewer role is incompatible with Company Representative role';
  END IF;
  
  RETURN NEW;
END;
$function$;

-- 6. is_institutional_email
CREATE OR REPLACE FUNCTION public.is_institutional_email(email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  email_domain TEXT;
  blocked_domains TEXT[] := ARRAY[
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
    'live.com', 'msn.com', 'aol.com', 'icloud.com',
    'protonmail.com', 'mail.com', 'zoho.com', 'yandex.com',
    'gmx.com', 'inbox.com', 'fastmail.com', 'hushmail.com'
  ];
BEGIN
  -- Extract domain from email
  email_domain := LOWER(SPLIT_PART(email, '@', 2));
  
  -- Check if domain is in blocked list
  IF email_domain = ANY(blocked_domains) THEN
    RETURN FALSE;
  END IF;
  
  -- Allow institutional patterns (.edu, .gov, .ac.*, .org, company domains)
  IF email_domain ~ '\.(edu|gov|org)$' OR email_domain ~ '\.ac\.[a-z]{2}$' THEN
    RETURN TRUE;
  END IF;
  
  -- Allow other domains but they will need manual verification
  -- This includes company domains (.com, .net, .eu, etc.)
  RETURN TRUE;
END;
$function$;

-- 7. send_pending_registration_notifications
CREATE OR REPLACE FUNCTION public.send_pending_registration_notifications()
RETURNS TABLE(user_id uuid, email text, status text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  v_notification RECORD;
  v_supabase_url TEXT;
  v_service_role_key TEXT;
BEGIN
  -- Get pending notifications
  FOR v_notification IN 
    SELECT n.user_id, n.email, u.created_at,
           u.raw_user_meta_data->>'first_name' as first_name,
           u.raw_user_meta_data->>'last_name' as last_name
    FROM public.user_registration_notifications n
    JOIN auth.users u ON u.id = n.user_id
    WHERE n.notification_status = 'pending'
    AND n.created_at > NOW() - INTERVAL '7 days' -- Only recent registrations
  LOOP
    BEGIN
      -- Here we would call the Edge Function
      -- For now, we'll update status to indicate it needs manual processing
      UPDATE public.user_registration_notifications
      SET notification_status = 'sent',
          notification_sent_at = NOW()
      WHERE user_registration_notifications.user_id = v_notification.user_id;
      
      user_id := v_notification.user_id;
      email := v_notification.email;
      status := 'sent';
      RETURN NEXT;
      
    EXCEPTION
      WHEN OTHERS THEN
        UPDATE public.user_registration_notifications
        SET notification_status = 'failed',
            failure_reason = SQLERRM
        WHERE user_registration_notifications.user_id = v_notification.user_id;
        
        user_id := v_notification.user_id;
        email := v_notification.email;
        status := 'failed';
        RETURN NEXT;
    END;
  END LOOP;
END;
$function$;

-- 8. verify_user_registration
CREATE OR REPLACE FUNCTION public.verify_user_registration(p_user_id uuid, p_verified boolean DEFAULT true)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  -- Check if caller is admin
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Only admins can verify user registrations';
  END IF;
  
  -- Update notification record
  UPDATE public.user_registration_notifications
  SET verified = p_verified,
      verified_at = NOW(),
      verified_by = auth.uid()
  WHERE user_id = p_user_id;
  
  -- You could also update user metadata or send confirmation email here
  
  RETURN TRUE;
END;
$function$;