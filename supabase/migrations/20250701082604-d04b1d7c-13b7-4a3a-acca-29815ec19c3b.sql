
-- Create analytics_daily table for daily visit statistics
CREATE TABLE public.analytics_daily (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  total_visits INTEGER NOT NULL DEFAULT 0,
  unique_visitors INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics_page_visits table for page-specific analytics
CREATE TABLE public.analytics_page_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  path TEXT NOT NULL,
  title TEXT,
  visit_count INTEGER NOT NULL DEFAULT 0,
  total_duration INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(date, path)
);

-- Create analytics_visitors table for tracking unique visitors per day
CREATE TABLE public.analytics_visitors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  visitor_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(date, visitor_id)
);

-- Create indexes for better performance
CREATE INDEX idx_analytics_daily_date ON public.analytics_daily(date);
CREATE INDEX idx_analytics_page_visits_date ON public.analytics_page_visits(date);
CREATE INDEX idx_analytics_page_visits_path ON public.analytics_page_visits(path);
CREATE INDEX idx_analytics_visitors_date ON public.analytics_visitors(date);
CREATE INDEX idx_analytics_visitors_visitor_id ON public.analytics_visitors(visitor_id);

-- Enable Row Level Security (make data publicly readable for analytics dashboard)
ALTER TABLE public.analytics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_page_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_visitors ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (for analytics dashboard)
CREATE POLICY "Public read access for analytics_daily" 
  ON public.analytics_daily 
  FOR SELECT 
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for analytics_page_visits" 
  ON public.analytics_page_visits 
  FOR SELECT 
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for analytics_visitors" 
  ON public.analytics_visitors 
  FOR SELECT 
  TO anon, authenticated
  USING (true);

-- Allow anonymous users to insert analytics data
CREATE POLICY "Allow anonymous insert for analytics_daily" 
  ON public.analytics_daily 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow anonymous update for analytics_daily" 
  ON public.analytics_daily 
  FOR UPDATE 
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow anonymous insert for analytics_page_visits" 
  ON public.analytics_page_visits 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow anonymous update for analytics_page_visits" 
  ON public.analytics_page_visits 
  FOR UPDATE 
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow anonymous insert for analytics_visitors" 
  ON public.analytics_visitors 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Create function to clean up old analytics data (keep only 1 year)
CREATE OR REPLACE FUNCTION cleanup_old_analytics_data()
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  cutoff_date DATE;
BEGIN
  cutoff_date := CURRENT_DATE - INTERVAL '1 year';
  
  DELETE FROM public.analytics_visitors WHERE date < cutoff_date;
  DELETE FROM public.analytics_page_visits WHERE date < cutoff_date;
  DELETE FROM public.analytics_daily WHERE date < cutoff_date;
END;
$$;
