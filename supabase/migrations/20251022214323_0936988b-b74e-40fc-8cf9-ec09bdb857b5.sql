-- Phase 1: Add MFA fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS mfa_enabled boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS mfa_enrolled_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS mfa_backup_codes_generated_at timestamp with time zone;

-- Phase 2: Create profile document type enum
CREATE TYPE public.profile_document_type AS ENUM (
  'cv_resume',
  'certification',
  'publication',
  'identification',
  'company_verification',
  'other'
);

-- Phase 3: Create profile_documents table
CREATE TABLE public.profile_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  document_type profile_document_type NOT NULL,
  file_name text NOT NULL,
  file_size bigint NOT NULL,
  file_url text NOT NULL,
  mime_type text NOT NULL,
  description text,
  verified_by uuid REFERENCES auth.users(id),
  verified_at timestamp with time zone,
  verification_notes text,
  uploaded_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.profile_documents ENABLE ROW LEVEL SECURITY;

-- RLS policies for profile_documents
CREATE POLICY "Users can view own documents"
ON public.profile_documents
FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can insert own documents"
ON public.profile_documents
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents"
ON public.profile_documents
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'))
WITH CHECK (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can delete own documents"
ON public.profile_documents
FOR DELETE
TO authenticated
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_profile_documents_updated_at
  BEFORE UPDATE ON public.profile_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Phase 4: Create MFA activity log table
CREATE TABLE public.mfa_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  action text NOT NULL,
  factor_type text NOT NULL,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.mfa_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own MFA activity"
ON public.mfa_activity_log
FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can insert MFA activity"
ON public.mfa_activity_log
FOR INSERT
TO service_role
WITH CHECK (true);

-- Phase 5: Create storage bucket for profile documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-documents', 'profile-documents', false)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for storage bucket
CREATE POLICY "Users can upload own documents"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can view own documents"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'profile-documents' AND
  (
    (storage.foldername(name))[1] = auth.uid()::text OR
    has_role(auth.uid(), 'admin')
  )
);

CREATE POLICY "Users can update own documents"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'profile-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete own documents"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-documents' AND
  (
    (storage.foldername(name))[1] = auth.uid()::text OR
    has_role(auth.uid(), 'admin')
  )
);