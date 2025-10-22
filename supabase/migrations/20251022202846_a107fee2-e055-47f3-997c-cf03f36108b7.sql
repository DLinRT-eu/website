-- Phase 6 & 7: Enhancements for Review Workflow and Company Portal

-- Add notification preferences to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS notification_preferences jsonb DEFAULT '{"email": true, "in_app": true}'::jsonb;

-- Enhance product_reviews table with more tracking fields
ALTER TABLE public.product_reviews
ADD COLUMN IF NOT EXISTS time_spent_minutes integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_activity_at timestamp with time zone DEFAULT now(),
ADD COLUMN IF NOT EXISTS review_score integer CHECK (review_score >= 0 AND review_score <= 100);

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'info',
  link text,
  read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can view their own notifications
CREATE POLICY "Users can view own notifications" 
ON public.notifications 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications" 
ON public.notifications 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Service role can insert notifications
CREATE POLICY "Service role can insert notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (true);

-- Enhance company_revisions with reviewer feedback
ALTER TABLE public.company_revisions
ADD COLUMN IF NOT EXISTS reviewer_feedback text,
ADD COLUMN IF NOT EXISTS priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical'));

-- Create company_products view for easier access control
CREATE OR REPLACE VIEW public.company_products AS
SELECT DISTINCT 
  cr.company_id,
  cr.company_name,
  cr.user_id,
  p.product_id
FROM public.company_representatives cr
CROSS JOIN LATERAL (
  SELECT DISTINCT product_id 
  FROM public.company_revisions 
  WHERE company_id = cr.company_id
) p
WHERE cr.verified = true;

-- Function to create notification
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
SET search_path = public
AS $$
DECLARE
  notification_id uuid;
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type, link)
  VALUES (p_user_id, p_title, p_message, p_type, p_link)
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$;

-- Function to notify on role approval
CREATE OR REPLACE FUNCTION public.notify_role_approval()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Create notification for role approval
  PERFORM public.create_notification(
    NEW.user_id,
    'Role Approved',
    'Your ' || NEW.role || ' role request has been approved!',
    'success',
    '/profile'
  );
  
  RETURN NEW;
END;
$$;

-- Trigger for role approval notifications
DROP TRIGGER IF EXISTS trigger_role_approval_notification ON public.user_roles;
CREATE TRIGGER trigger_role_approval_notification
  AFTER INSERT ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_role_approval();

-- Function to notify on review assignment
CREATE OR REPLACE FUNCTION public.notify_review_assignment()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.assigned_to IS NOT NULL THEN
    PERFORM public.create_notification(
      NEW.assigned_to,
      'New Review Assignment',
      'You have been assigned to review product: ' || NEW.product_id,
      'info',
      '/review/' || NEW.product_id
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger for review assignment notifications
DROP TRIGGER IF EXISTS trigger_review_assignment_notification ON public.product_reviews;
CREATE TRIGGER trigger_review_assignment_notification
  AFTER INSERT ON public.product_reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_review_assignment();

-- Function to notify on revision status change
CREATE OR REPLACE FUNCTION public.notify_revision_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF OLD.verification_status IS DISTINCT FROM NEW.verification_status THEN
    PERFORM public.create_notification(
      NEW.revised_by,
      'Revision Status Updated',
      'Your revision for ' || NEW.product_id || ' has been ' || NEW.verification_status,
      CASE 
        WHEN NEW.verification_status = 'approved' THEN 'success'
        WHEN NEW.verification_status = 'rejected' THEN 'error'
        ELSE 'info'
      END,
      '/company'
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger for revision status notifications
DROP TRIGGER IF EXISTS trigger_revision_status_notification ON public.company_revisions;
CREATE TRIGGER trigger_revision_status_notification
  AFTER UPDATE ON public.company_revisions
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_revision_status();

-- Update timestamp trigger for product_reviews
CREATE OR REPLACE FUNCTION public.update_review_activity()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.last_activity_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_update_review_activity ON public.product_reviews;
CREATE TRIGGER trigger_update_review_activity
  BEFORE UPDATE ON public.product_reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_review_activity();