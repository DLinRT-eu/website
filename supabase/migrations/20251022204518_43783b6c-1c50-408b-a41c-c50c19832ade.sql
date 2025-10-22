-- Fix security warnings: Secure SECURITY DEFINER functions

-- Recreate create_notification function with access control
CREATE OR REPLACE FUNCTION public.create_notification(
  p_user_id uuid,
  p_title text,
  p_message text,
  p_type text DEFAULT 'info',
  p_link text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  notification_id uuid;
  session_role text;
BEGIN
  -- Check if session role is service_role or if user is admin
  BEGIN
    session_role := current_setting('role', true);
  EXCEPTION
    WHEN OTHERS THEN
      session_role := NULL;
  END;
  
  -- Only allow service role or admins to create notifications
  IF NOT (session_role = 'service_role' OR has_role(auth.uid(), 'admin')) THEN
    RAISE EXCEPTION 'Insufficient privileges to create notifications';
  END IF;
  
  INSERT INTO public.notifications (user_id, title, message, type, link)
  VALUES (p_user_id, p_title, p_message, p_type, p_link)
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$;

-- Revoke public execute permissions on create_notification
REVOKE EXECUTE ON FUNCTION public.create_notification(uuid, text, text, text, text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.create_notification(uuid, text, text, text, text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.create_notification(uuid, text, text, text, text) FROM authenticated;

-- Grant execute only to service_role
GRANT EXECUTE ON FUNCTION public.create_notification(uuid, text, text, text, text) TO service_role;