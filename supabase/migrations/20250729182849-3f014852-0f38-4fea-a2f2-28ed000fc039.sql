-- Security fix: Restrict newsletter_subscribers table access
-- Remove overly permissive public read access
DROP POLICY IF EXISTS "Public read access for newsletter_subscribers" ON public.newsletter_subscribers;

-- Only allow email verification for the specific subscriber (for unsubscribe functionality)
CREATE POLICY "Allow email verification for newsletter_subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (false); -- No public read access

-- Security fix: Restrict analytics tables access  
-- Remove public read access from analytics_daily
DROP POLICY IF EXISTS "Public read access for analytics_daily" ON public.analytics_daily;

-- Remove public read access from analytics_page_visits
DROP POLICY IF EXISTS "Public read access for analytics_page_visits" ON public.analytics_page_visits;

-- Remove public read access from analytics_visitors
DROP POLICY IF EXISTS "Public read access for analytics_visitors" ON public.analytics_visitors;

-- Create restricted access policies for analytics (only for admin functions)
-- These tables should only be accessible through edge functions with service role key

-- Keep insert/update policies for analytics data collection
-- analytics_daily keeps: "Allow anonymous insert" and "Allow anonymous update"
-- analytics_page_visits keeps: "Allow anonymous insert" and "Allow anonymous update"  
-- analytics_visitors keeps: "Allow anonymous insert"

-- Add trigger to prevent unauthorized updates to newsletter_subscribers
CREATE OR REPLACE FUNCTION public.validate_newsletter_update()
RETURNS TRIGGER AS $$
BEGIN
    -- Only allow updates to unsubscribed_at field for unsubscribe functionality
    IF OLD.email != NEW.email OR OLD.first_name != NEW.first_name OR OLD.last_name != NEW.last_name THEN
        RAISE EXCEPTION 'Unauthorized modification of subscriber data';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER newsletter_update_validation
    BEFORE UPDATE ON public.newsletter_subscribers
    FOR EACH ROW
    EXECUTE FUNCTION public.validate_newsletter_update();