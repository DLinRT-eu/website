-- Create role_requests table for approval workflow
CREATE TABLE public.role_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  requested_role app_role NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  justification text NOT NULL,
  company_id text,
  reviewed_by uuid REFERENCES auth.users(id),
  reviewed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.role_requests ENABLE ROW LEVEL SECURITY;

-- Users can view their own role requests
CREATE POLICY "Users can view own requests"
ON public.role_requests
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own role requests
CREATE POLICY "Users can insert own requests"
ON public.role_requests
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Admins can view all role requests
CREATE POLICY "Admins can view all requests"
ON public.role_requests
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update all role requests
CREATE POLICY "Admins can update requests"
ON public.role_requests
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger to update updated_at
CREATE TRIGGER update_role_requests_updated_at
BEFORE UPDATE ON public.role_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to initialize super admin for m.maspero@dlinrt.eu
CREATE OR REPLACE FUNCTION public.initialize_super_admin()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Find user by email
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE email = 'm.maspero@dlinrt.eu';
  
  -- If user exists and doesn't have admin role, grant it
  IF admin_user_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role, granted_by)
    VALUES (admin_user_id, 'admin', admin_user_id)
    ON CONFLICT (user_id, role) DO NOTHING;
    
    RAISE NOTICE 'Super admin role granted to m.maspero@dlinrt.eu';
  ELSE
    RAISE NOTICE 'User m.maspero@dlinrt.eu not found. They need to sign up first.';
  END IF;
END;
$$;

-- Add index for faster queries
CREATE INDEX idx_role_requests_user_id ON public.role_requests(user_id);
CREATE INDEX idx_role_requests_status ON public.role_requests(status);

-- Try to initialize super admin (will succeed only if user exists)
SELECT public.initialize_super_admin();