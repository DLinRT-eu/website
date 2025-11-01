-- Create audit log table for profile document access
CREATE TABLE IF NOT EXISTS public.profile_document_access_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES public.profile_documents(id) ON DELETE CASCADE,
  accessed_by UUID NOT NULL,
  access_reason TEXT NOT NULL,
  accessed_at TIMESTAMPTZ DEFAULT now(),
  user_agent TEXT,
  ip_hash TEXT
);

-- Enable RLS
ALTER TABLE public.profile_document_access_log ENABLE ROW LEVEL SECURITY;

-- Admins can view all access logs
CREATE POLICY "Admins can view document access logs"
ON public.profile_document_access_log
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Only service role can insert (via edge function)
CREATE POLICY "Service role can insert access logs"
ON public.profile_document_access_log
FOR INSERT
WITH CHECK (true);

-- Users can view access logs for their own documents
CREATE POLICY "Users can view own document access logs"
ON public.profile_document_access_log
FOR SELECT
USING (
  document_id IN (
    SELECT id FROM public.profile_documents
    WHERE user_id = auth.uid()
  )
);

-- Add index for performance
CREATE INDEX idx_document_access_log_document_id ON public.profile_document_access_log(document_id);
CREATE INDEX idx_document_access_log_accessed_by ON public.profile_document_access_log(accessed_by);
CREATE INDEX idx_document_access_log_accessed_at ON public.profile_document_access_log(accessed_at DESC);