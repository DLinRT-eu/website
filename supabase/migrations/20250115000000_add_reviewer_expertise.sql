-- Add Reviewer Expertise Management System
-- This migration adds functionality for:
-- 1. Storing reviewer expertise by product category
-- 2. Priority-based expertise matching
-- 3. Auto-distribution support

-- Create reviewer expertise table
CREATE TABLE public.reviewer_expertise (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL, -- auto-contouring, treatment-planning, reconstruction, etc.
  priority INTEGER DEFAULT 5 CHECK (priority >= 1 AND priority <= 10), -- 1=highest, 10=lowest
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, category)
);

-- Create index for fast category lookups
CREATE INDEX idx_reviewer_expertise_category ON public.reviewer_expertise(category);
CREATE INDEX idx_reviewer_expertise_user_id ON public.reviewer_expertise(user_id);
CREATE INDEX idx_reviewer_expertise_priority ON public.reviewer_expertise(priority);

-- Enable RLS
ALTER TABLE public.reviewer_expertise ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Reviewers can view their own expertise
CREATE POLICY "Users can view own expertise" ON public.reviewer_expertise
  FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all expertise
CREATE POLICY "Admins can view all expertise" ON public.reviewer_expertise
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Admins can insert expertise
CREATE POLICY "Admins can insert expertise" ON public.reviewer_expertise
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Users can update their own expertise
CREATE POLICY "Users can update own expertise" ON public.reviewer_expertise
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Admins can update any expertise
CREATE POLICY "Admins can update any expertise" ON public.reviewer_expertise
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Admins can delete expertise
CREATE POLICY "Admins can delete expertise" ON public.reviewer_expertise
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_reviewer_expertise_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_reviewer_expertise_updated_at
  BEFORE UPDATE ON public.reviewer_expertise
  FOR EACH ROW
  EXECUTE FUNCTION public.update_reviewer_expertise_updated_at();

-- Create invitation tokens table for email invitations
CREATE TABLE public.reviewer_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  invited_by UUID REFERENCES auth.users(id),
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
  accepted_at TIMESTAMPTZ,
  accepted_by UUID REFERENCES auth.users(id),
  expertise_preferences JSONB, -- Store category preferences
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for token lookups
CREATE INDEX idx_reviewer_invitations_token ON public.reviewer_invitations(token);
CREATE INDEX idx_reviewer_invitations_email ON public.reviewer_invitations(email);
CREATE INDEX idx_reviewer_invitations_status ON public.reviewer_invitations(status);

-- Enable RLS
ALTER TABLE public.reviewer_invitations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for invitations
-- Admins can view all invitations
CREATE POLICY "Admins can view all invitations" ON public.reviewer_invitations
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Admins can insert invitations
CREATE POLICY "Admins can insert invitations" ON public.reviewer_invitations
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Admins can update invitations
CREATE POLICY "Admins can update invitations" ON public.reviewer_invitations
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Function to automatically expire old invitations
CREATE OR REPLACE FUNCTION public.expire_old_invitations()
RETURNS void AS $$
BEGIN
  UPDATE public.reviewer_invitations
  SET status = 'expired'
  WHERE status = 'pending'
  AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to expire invitations (requires pg_cron extension)
-- Note: This should be run manually or via a cron job if pg_cron is not available
-- SELECT cron.schedule('expire-invitations', '0 0 * * *', 'SELECT public.expire_old_invitations()');

COMMENT ON TABLE public.reviewer_expertise IS 'Stores reviewer expertise and preferences by product category for intelligent assignment';
COMMENT ON TABLE public.reviewer_invitations IS 'Manages email invitations for new reviewers with expertise preferences';
COMMENT ON COLUMN public.reviewer_expertise.priority IS 'Priority level: 1=highest expertise, 10=lowest. Used for weighted distribution.';
COMMENT ON COLUMN public.reviewer_invitations.expertise_preferences IS 'JSON array of {category: string, priority: number} objects';
