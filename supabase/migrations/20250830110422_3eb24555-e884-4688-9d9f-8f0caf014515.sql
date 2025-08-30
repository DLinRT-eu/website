-- Create contact_submissions table for backup contact processing
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  submission_method TEXT NOT NULL DEFAULT 'backup_storage',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for service role access only (since this is internal backup storage)
CREATE POLICY "Service role can manage contact submissions" 
ON public.contact_submissions 
FOR ALL 
USING (current_setting('role') = 'service_role')
WITH CHECK (current_setting('role') = 'service_role');

-- Create function to cleanup old contact submissions (older than 3 months)
CREATE OR REPLACE FUNCTION public.cleanup_old_contact_submissions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
    -- Delete contact submissions older than 3 months
    DELETE FROM public.contact_submissions 
    WHERE created_at < CURRENT_DATE - INTERVAL '3 months';
    
    RAISE NOTICE 'Cleaned up old contact submissions';
END;
$function$;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_contact_submissions_updated_at
BEFORE UPDATE ON public.contact_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();