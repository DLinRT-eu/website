-- Fix security warning: Set search_path for functions
CREATE OR REPLACE FUNCTION public.hash_ip(ip_address TEXT)
RETURNS TEXT 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- Simple hash for privacy (in production, use a proper salt)
  RETURN encode(digest(ip_address || 'security_salt_2024', 'sha256'), 'hex');
END;
$$;