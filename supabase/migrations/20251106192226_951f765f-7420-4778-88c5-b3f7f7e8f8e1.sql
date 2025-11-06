-- Add GDPR consent tracking to profiles table
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS data_processing_consent_given boolean DEFAULT false NOT NULL,
  ADD COLUMN IF NOT EXISTS data_processing_consent_timestamp timestamptz,
  ADD COLUMN IF NOT EXISTS data_processing_consent_withdrawn boolean DEFAULT false NOT NULL,
  ADD COLUMN IF NOT EXISTS data_processing_consent_withdrawn_at timestamptz,
  ADD COLUMN IF NOT EXISTS data_processing_consent_version text DEFAULT '1.0';

COMMENT ON COLUMN public.profiles.data_processing_consent_given IS 
  'User explicit consent to process and store personal data according to GDPR Article 6(1)(a)';

-- Create audit log for consent changes
CREATE TABLE IF NOT EXISTS public.consent_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action text NOT NULL CHECK (action IN ('granted', 'withdrawn', 'updated')),
  consent_version text NOT NULL,
  ip_hash text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.consent_audit_log ENABLE ROW LEVEL SECURITY;

-- RLS policies for consent_audit_log
CREATE POLICY "Users can view own consent history"
  ON public.consent_audit_log FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert consent logs"
  ON public.consent_audit_log FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all consent logs"
  ON public.consent_audit_log FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Update handle_new_user() trigger to store consent
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_is_institutional BOOLEAN;
  v_consent_given BOOLEAN;
BEGIN
  -- Check if email is institutional
  v_is_institutional := public.is_institutional_email(NEW.email);
  
  -- Check if consent was given
  v_consent_given := COALESCE((NEW.raw_user_meta_data ->> 'dataProcessingConsent')::boolean, false);
  
  -- Always create profile for all new users
  INSERT INTO public.profiles (
    id, 
    email, 
    first_name, 
    last_name,
    data_processing_consent_given,
    data_processing_consent_timestamp,
    data_processing_consent_version
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    v_consent_given,
    CASE WHEN v_consent_given THEN 
      COALESCE((NEW.raw_user_meta_data ->> 'consentTimestamp')::timestamptz, now())
    ELSE NULL END,
    '1.0'
  )
  ON CONFLICT (id) DO NOTHING;
  
  -- Log consent grant in audit log if given
  IF v_consent_given THEN
    INSERT INTO public.consent_audit_log (user_id, action, consent_version)
    VALUES (NEW.id, 'granted', '1.0');
  END IF;
  
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
$$;