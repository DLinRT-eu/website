-- Fix security warning: Function Search Path Mutable
-- Update existing functions to have fixed search_path

-- Fix cleanup_old_analytics_data function
CREATE OR REPLACE FUNCTION public.cleanup_old_analytics_data()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
    -- Calculate date 1 year ago
    DECLARE
        cutoff_date date := CURRENT_DATE - INTERVAL '1 year';
    BEGIN
        -- Delete old analytics visitors data
        DELETE FROM public.analytics_visitors 
        WHERE date < cutoff_date;
        
        -- Delete old page visits data
        DELETE FROM public.analytics_page_visits 
        WHERE date < cutoff_date;
        
        -- Delete old daily analytics data
        DELETE FROM public.analytics_daily 
        WHERE date < cutoff_date;
        
        -- Log the cleanup action
        RAISE NOTICE 'Cleaned up analytics data older than %', cutoff_date;
    END;
END;
$function$;

-- Fix schedule_analytics_cleanup function
CREATE OR REPLACE FUNCTION public.schedule_analytics_cleanup()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
    -- This function can be called by a cron job or scheduled task
    PERFORM public.cleanup_old_analytics_data();
END;
$function$;

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

-- Fix validate_newsletter_update function
CREATE OR REPLACE FUNCTION public.validate_newsletter_update()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    -- Only allow updates to unsubscribed_at field for unsubscribe functionality
    IF OLD.email != NEW.email OR OLD.first_name != NEW.first_name OR OLD.last_name != NEW.last_name THEN
        RAISE EXCEPTION 'Unauthorized modification of subscriber data';
    END IF;
    RETURN NEW;
END;
$$;