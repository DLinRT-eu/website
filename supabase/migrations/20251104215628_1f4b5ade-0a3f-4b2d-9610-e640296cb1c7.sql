-- Create audit log table for tracking administrative actions
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action_type TEXT NOT NULL,
  performed_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  performed_by_email TEXT NOT NULL,
  target_user_id UUID,
  target_user_email TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_admin_audit_log_action_type ON public.admin_audit_log(action_type);
CREATE INDEX idx_admin_audit_log_performed_by ON public.admin_audit_log(performed_by);
CREATE INDEX idx_admin_audit_log_created_at ON public.admin_audit_log(created_at DESC);
CREATE INDEX idx_admin_audit_log_target_user ON public.admin_audit_log(target_user_id);

-- Enable RLS
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
  ON public.admin_audit_log
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Service role can insert audit logs
CREATE POLICY "Service role can insert audit logs"
  ON public.admin_audit_log
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create function to log admin actions
CREATE OR REPLACE FUNCTION public.log_admin_action(
  p_action_type TEXT,
  p_target_user_id UUID DEFAULT NULL,
  p_target_user_email TEXT DEFAULT NULL,
  p_details JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_log_id UUID;
  v_performer_email TEXT;
BEGIN
  -- Get the performer's email
  SELECT email INTO v_performer_email
  FROM auth.users
  WHERE id = auth.uid();

  -- Insert audit log
  INSERT INTO public.admin_audit_log (
    action_type,
    performed_by,
    performed_by_email,
    target_user_id,
    target_user_email,
    details
  ) VALUES (
    p_action_type,
    auth.uid(),
    v_performer_email,
    p_target_user_id,
    p_target_user_email,
    p_details
  )
  RETURNING id INTO v_log_id;

  RETURN v_log_id;
END;
$$;

-- Add comment to table
COMMENT ON TABLE public.admin_audit_log IS 'Audit log for administrative actions including user deletions, role changes, etc.';