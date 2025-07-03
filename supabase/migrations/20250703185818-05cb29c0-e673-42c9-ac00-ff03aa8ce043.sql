-- Fix the cleanup function with proper implementation
CREATE OR REPLACE FUNCTION public.cleanup_old_analytics_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

-- Create newsletter subscribers table with proper RLS
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    consent_given BOOLEAN NOT NULL DEFAULT false,
    unsubscribed_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for newsletter subscribers
CREATE POLICY "Allow anonymous insert for newsletter_subscribers" 
ON public.newsletter_subscribers 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow anonymous update for newsletter_subscribers" 
ON public.newsletter_subscribers 
FOR UPDATE 
USING (true);

CREATE POLICY "Public read access for newsletter_subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_newsletter_subscribers_updated_at
    BEFORE UPDATE ON public.newsletter_subscribers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();