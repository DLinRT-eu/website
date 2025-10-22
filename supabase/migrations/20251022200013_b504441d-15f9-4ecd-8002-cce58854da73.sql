-- Phase 1: Database Schema Design for Multi-Role Review System

-- 1. Create user roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'reviewer', 'company');

-- 2. User profiles table (linked to auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  institution TEXT,
  specialization TEXT,
  bio TEXT,
  profile_image_url TEXT,
  linkedin_url TEXT,
  public_display BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 999,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. User roles table (separate for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- 4. Company representatives table
CREATE TABLE public.company_representatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  company_id TEXT,
  position TEXT,
  verified BOOLEAN DEFAULT false,
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Product reviews table
CREATE TABLE public.product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL,
  assigned_to UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'company_reviewed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  deadline DATE,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  company_reviewed_at TIMESTAMPTZ,
  company_reviewed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Review comments/history table
CREATE TABLE public.review_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID REFERENCES public.product_reviews(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  comment TEXT NOT NULL,
  comment_type TEXT DEFAULT 'general' CHECK (comment_type IN ('general', 'verification', 'issue', 'resolution')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Review checklist items
CREATE TABLE public.review_checklist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID REFERENCES public.product_reviews(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  item_category TEXT NOT NULL,
  checked BOOLEAN DEFAULT false,
  checked_by UUID REFERENCES auth.users(id),
  checked_at TIMESTAMPTZ,
  notes TEXT
);

-- 8. Company revision stamps
CREATE TABLE public.company_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL,
  company_id TEXT NOT NULL,
  revised_by UUID REFERENCES auth.users(id) NOT NULL,
  revision_date DATE NOT NULL,
  changes_summary TEXT,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Security Functions (SECURITY DEFINER to avoid RLS recursion)

-- Check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Get user's highest privilege role
CREATE OR REPLACE FUNCTION public.get_highest_role(_user_id UUID)
RETURNS public.app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.user_roles
  WHERE user_id = _user_id
  ORDER BY CASE role
    WHEN 'admin' THEN 1
    WHEN 'reviewer' THEN 2
    WHEN 'company' THEN 3
  END
  LIMIT 1
$$;

-- Check if user can access company data
CREATE OR REPLACE FUNCTION public.can_access_company(_user_id UUID, _company_id TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin', 'reviewer')
  ) OR EXISTS (
    SELECT 1 FROM public.company_representatives 
    WHERE user_id = _user_id AND company_id = _company_id AND verified = true
  )
$$;

-- 10. Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_representatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_revisions ENABLE ROW LEVEL SECURITY;

-- 11. RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR public_display = true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- 12. RLS Policies for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles" ON public.user_roles
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles" ON public.user_roles
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles" ON public.user_roles
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- 13. RLS Policies for company_representatives
CREATE POLICY "Users can view own company rep info" ON public.company_representatives
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all company reps" ON public.company_representatives
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can insert own company rep" ON public.company_representatives
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update company reps" ON public.company_representatives
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- 14. RLS Policies for product_reviews
CREATE POLICY "Review access for assigned users" ON public.product_reviews
  FOR SELECT USING (
    assigned_to = auth.uid() OR 
    public.has_role(auth.uid(), 'admin') OR
    public.has_role(auth.uid(), 'reviewer')
  );

CREATE POLICY "Admins can insert reviews" ON public.product_reviews
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Review update for assigned users" ON public.product_reviews
  FOR UPDATE USING (
    assigned_to = auth.uid() OR 
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can delete reviews" ON public.product_reviews
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- 15. RLS Policies for review_comments
CREATE POLICY "View comments on accessible reviews" ON public.review_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.product_reviews 
      WHERE id = review_id AND (
        assigned_to = auth.uid() OR 
        public.has_role(auth.uid(), 'admin') OR
        public.has_role(auth.uid(), 'reviewer')
      )
    )
  );

CREATE POLICY "Insert comments on accessible reviews" ON public.review_comments
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.product_reviews 
      WHERE id = review_id AND (
        assigned_to = auth.uid() OR 
        public.has_role(auth.uid(), 'admin') OR
        public.has_role(auth.uid(), 'reviewer')
      )
    )
  );

-- 16. RLS Policies for review_checklist_items
CREATE POLICY "View checklist for accessible reviews" ON public.review_checklist_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.product_reviews 
      WHERE id = review_id AND (
        assigned_to = auth.uid() OR 
        public.has_role(auth.uid(), 'admin') OR
        public.has_role(auth.uid(), 'reviewer')
      )
    )
  );

CREATE POLICY "Update checklist for accessible reviews" ON public.review_checklist_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.product_reviews 
      WHERE id = review_id AND (
        assigned_to = auth.uid() OR 
        public.has_role(auth.uid(), 'admin')
      )
    )
  );

-- 17. RLS Policies for company_revisions
CREATE POLICY "View company revisions" ON public.company_revisions
  FOR SELECT USING (
    revised_by = auth.uid() OR
    public.has_role(auth.uid(), 'admin') OR
    public.has_role(auth.uid(), 'reviewer')
  );

CREATE POLICY "Company can create revisions" ON public.company_revisions
  FOR INSERT WITH CHECK (
    revised_by = auth.uid() AND
    public.has_role(auth.uid(), 'company')
  );

CREATE POLICY "Admins and reviewers can update revisions" ON public.company_revisions
  FOR UPDATE USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'reviewer')
  );

-- 18. Triggers for automation

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.product_reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 19. Create view for public team members
CREATE OR REPLACE VIEW public.public_team_members AS
SELECT 
  p.id,
  p.first_name,
  p.last_name,
  p.bio,
  p.profile_image_url,
  p.linkedin_url,
  p.institution,
  p.specialization,
  p.display_order,
  public.get_highest_role(p.id) as role
FROM public.profiles p
WHERE p.public_display = true
ORDER BY 
  CASE public.get_highest_role(p.id)
    WHEN 'admin' THEN 1
    WHEN 'reviewer' THEN 2
  END,
  p.display_order,
  p.last_name;

-- 20. Create indexes for performance
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);
CREATE INDEX idx_product_reviews_assigned_to ON public.product_reviews(assigned_to);
CREATE INDEX idx_product_reviews_product_id ON public.product_reviews(product_id);
CREATE INDEX idx_product_reviews_status ON public.product_reviews(status);
CREATE INDEX idx_product_reviews_deadline ON public.product_reviews(deadline);
CREATE INDEX idx_company_representatives_user_id ON public.company_representatives(user_id);
CREATE INDEX idx_company_representatives_company_id ON public.company_representatives(company_id);
CREATE INDEX idx_company_revisions_product_id ON public.company_revisions(product_id);
CREATE INDEX idx_review_comments_review_id ON public.review_comments(review_id);
CREATE INDEX idx_review_checklist_review_id ON public.review_checklist_items(review_id);