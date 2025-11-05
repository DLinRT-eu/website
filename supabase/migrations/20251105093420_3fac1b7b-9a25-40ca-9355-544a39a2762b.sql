-- Create changelog entries table
CREATE TABLE public.changelog_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id TEXT UNIQUE NOT NULL,
  version TEXT NOT NULL,
  date DATE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('feature', 'improvement', 'bugfix', 'documentation', 'security')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  details TEXT,
  author TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('draft', 'pending', 'published', 'archived')),
  auto_generated BOOLEAN DEFAULT false,
  github_data JSONB,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create changelog links table
CREATE TABLE public.changelog_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  changelog_entry_id UUID REFERENCES changelog_entries(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_changelog_entries_status ON changelog_entries(status);
CREATE INDEX idx_changelog_entries_date ON changelog_entries(date DESC);
CREATE INDEX idx_changelog_entries_category ON changelog_entries(category);
CREATE INDEX idx_changelog_links_entry ON changelog_links(changelog_entry_id);

-- Enable RLS
ALTER TABLE changelog_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE changelog_links ENABLE ROW LEVEL SECURITY;

-- RLS Policies for changelog_entries
CREATE POLICY "Public can view published changelog entries"
  ON changelog_entries FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins can manage changelog entries"
  ON changelog_entries FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for changelog_links
CREATE POLICY "Public can view links for published entries"
  ON changelog_links FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM changelog_entries
      WHERE changelog_entries.id = changelog_links.changelog_entry_id
      AND changelog_entries.status = 'published'
    )
  );

CREATE POLICY "Admins can manage changelog links"
  ON changelog_links FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Trigger to update updated_at
CREATE TRIGGER update_changelog_entries_updated_at
  BEFORE UPDATE ON changelog_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();