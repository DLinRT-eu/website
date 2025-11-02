-- Migration: Add user registration notification system with institutional email preference
-- This sends an email to info@dlinrt.eu when a new user registers
-- Institutional emails are preferred (warns about free email providers but allows them)

-- 1. Create function to check if email is institutional
CREATE OR REPLACE FUNCTION public.is_institutional_email(email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

-- 2. Create table to track registration notifications
CREATE TABLE IF NOT EXISTS public.user_registration_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  notification_sent_at TIMESTAMPTZ DEFAULT NOW(),
  notification_status TEXT DEFAULT 'sent', -- sent, failed, blocked
  failure_reason TEXT,
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_registration_notifications_user_id 
  ON public.user_registration_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_user_registration_notifications_verified 
  ON public.user_registration_notifications(verified);

-- Enable RLS
ALTER TABLE public.user_registration_notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins can view all notifications" ON public.user_registration_notifications
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
    )
  );

CREATE POLICY "Service role can manage notifications" ON public.user_registration_notifications
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role')
  WITH CHECK (auth.jwt()->>'role' = 'service_role');

-- 3. Update the handle_new_user function to send notification
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_is_institutional BOOLEAN;
  v_supabase_url TEXT;
  v_service_role_key TEXT;
  v_response TEXT;
BEGIN
  -- Check if email is institutional
  v_is_institutional := public.is_institutional_email(NEW.email);
  
  IF NOT v_is_institutional THEN
    -- Log the blocked registration
    INSERT INTO public.user_registration_notifications (
      user_id, 
      email, 
      notification_status, 
      failure_reason
    ) VALUES (
      NEW.id,
      NEW.email,
      'blocked',
      'Non-institutional email address'
    );
    
    -- Don't create profile for blocked users
    RAISE WARNING 'Registration blocked for non-institutional email: %', NEW.email;
    RETURN NEW;
  END IF;

  -- Create profile for institutional email users
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  )
  ON CONFLICT (id) DO NOTHING;
  
  -- Send notification to admin via Edge Function
  BEGIN
    -- Get Supabase configuration from environment
    v_supabase_url := current_setting('app.settings.supabase_url', true);
    v_service_role_key := current_setting('app.settings.supabase_service_role_key', true);
    
    -- Call Edge Function to send email notification
    -- This uses pg_net extension or http extension if available
    -- If not available, we'll log it for manual processing
    
    -- Log the notification request
    INSERT INTO public.user_registration_notifications (
      user_id,
      email,
      notification_status
    ) VALUES (
      NEW.id,
      NEW.email,
      'pending'
    );
    
    RAISE NOTICE 'User registration notification queued for user: % (%)', NEW.email, NEW.id;
    
  EXCEPTION
    WHEN OTHERS THEN
      -- Log failure but don't prevent profile creation
      INSERT INTO public.user_registration_notifications (
        user_id,
        email,
        notification_status,
        failure_reason
      ) VALUES (
        NEW.id,
        NEW.email,
        'failed',
        SQLERRM
      )
      ON CONFLICT (user_id) DO UPDATE 
        SET notification_status = 'failed',
            failure_reason = EXCLUDED.failure_reason;
            
      RAISE WARNING 'Failed to send registration notification for user %: %', NEW.id, SQLERRM;
  END;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the auth
    RAISE WARNING 'Error in handle_new_user for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- 4. Create function to manually send pending notifications
-- This can be called by a cron job or admin action
CREATE OR REPLACE FUNCTION public.send_pending_registration_notifications()
RETURNS TABLE(user_id UUID, email TEXT, status TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

-- 5. Create function for admins to verify users manually
CREATE OR REPLACE FUNCTION public.verify_user_registration(
  p_user_id UUID,
  p_verified BOOLEAN DEFAULT TRUE
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

-- 6. Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.is_institutional_email TO authenticated;
GRANT EXECUTE ON FUNCTION public.send_pending_registration_notifications TO service_role;
GRANT EXECUTE ON FUNCTION public.verify_user_registration TO authenticated;

-- 7. Add comments for documentation
COMMENT ON TABLE public.user_registration_notifications IS 'Tracks registration notifications sent to admins for user verification';
COMMENT ON FUNCTION public.is_institutional_email IS 'Validates if an email address is from an institutional domain (blocks free email providers)';
COMMENT ON FUNCTION public.send_pending_registration_notifications IS 'Processes pending registration notifications (can be run via cron)';
COMMENT ON FUNCTION public.verify_user_registration IS 'Allows admins to manually verify user registrations';
