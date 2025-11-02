-- Add RLS policies for role_requests table
-- This allows users to manage their own role requests and admins to approve/reject them

-- Enable RLS on role_requests if not already enabled
ALTER TABLE public.role_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own requests" ON public.role_requests;
DROP POLICY IF EXISTS "Users can create own requests" ON public.role_requests;
DROP POLICY IF EXISTS "Admins can view all requests" ON public.role_requests;
DROP POLICY IF EXISTS "Admins can update requests" ON public.role_requests;

-- Users can view their own role requests
CREATE POLICY "Users can view own requests" ON public.role_requests
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can insert their own role requests
CREATE POLICY "Users can create own requests" ON public.role_requests
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all role requests
CREATE POLICY "Admins can view all requests" ON public.role_requests
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'admin'
    )
  );

-- Admins can update role requests (approve/reject)
CREATE POLICY "Admins can update requests" ON public.role_requests
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'admin'
    )
  );

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_role_requests_user_status 
  ON public.role_requests(user_id, status);

CREATE INDEX IF NOT EXISTS idx_role_requests_status 
  ON public.role_requests(status);

CREATE INDEX IF NOT EXISTS idx_role_requests_created_at 
  ON public.role_requests(created_at DESC);

COMMENT ON TABLE public.role_requests IS 'Role requests table with RLS policies for users and admins';
