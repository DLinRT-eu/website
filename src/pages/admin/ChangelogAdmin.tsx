import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Save, Eye, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getCategoryLabel, getCategoryColor, type ChangelogCategory } from '@/data/changelog';
import PageLayout from '@/components/layout/PageLayout';

const ChangelogAdmin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    version: '',
    date: new Date().toISOString().split('T')[0],
    category: 'feature' as ChangelogCategory,
    title: '',
    description: '',
    details: '',
    links: [{ text: '', url: '' }],
    author: '',
  });

  const categories: ChangelogCategory[] = ['feature', 'improvement', 'bugfix', 'documentation', 'security'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.version || !formData.title || !formData.description) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields (version, title, description)',
        variant: 'destructive',
      });
      return;
    }

    // Generate ID
    const newEntry = {
      id: `changelog-${Date.now()}`,
      ...formData,
      links: formData.links.filter(link => link.text && link.url),
    };

    // In a real implementation, this would save to a database
    console.log('New changelog entry:', newEntry);
    
    toast({
      title: 'Entry Created',
      description: `Changelog entry for version ${formData.version} has been created. In production, this would save to the database.`,
    });

    // Reset form
    setFormData({
      version: '',
      date: new Date().toISOString().split('T')[0],
      category: 'feature',
      title: '',
      description: '',
      details: '',
      links: [{ text: '', url: '' }],
      author: '',
    });
  };

  const addLink = () => {
    setFormData({
      ...formData,
      links: [...formData.links, { text: '', url: '' }],
    });
  };

  const updateLink = (index: number, field: 'text' | 'url', value: string) => {
    const newLinks = [...formData.links];
    newLinks[index][field] = value;
    setFormData({ ...formData, links: newLinks });
  };

  const removeLink = (index: number) => {
    setFormData({
      ...formData,
      links: formData.links.filter((_, i) => i !== index),
    });
  };

  return (
    <PageLayout>
      <div className="container max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Changelog Management</h1>
            <p className="text-muted-foreground">
              Create and manage changelog entries
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/changelog')}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Changelog
          </Button>
        </div>

        {/* Info Card */}
        <Card className="mb-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-lg">Development Note</CardTitle>
            <CardDescription>
              This is a demonstration admin interface. In production, changelog entries would be stored in a database (Supabase) with proper authentication and RLS policies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Currently, entries are defined in <code className="bg-muted px-1 py-0.5 rounded">src/data/changelog.ts</code>. 
              To add entries in production, this form would insert into a <code className="bg-muted px-1 py-0.5 rounded">changelog</code> table.
            </p>
          </CardContent>
        </Card>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Changelog Entry</CardTitle>
            <CardDescription>
              Add a new entry to track system updates and changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Version and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="version">
                    Version <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="version"
                    placeholder="e.g., 2.1.0"
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">
                    Date <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: ChangelogCategory) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getCategoryColor(cat)}>
                            {getCategoryLabel(cat)}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Brief, descriptive title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Short summary of the change (1-2 sentences)"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              {/* Details */}
              <div className="space-y-2">
                <Label htmlFor="details">
                  Detailed Description (Markdown)
                </Label>
                <Textarea
                  id="details"
                  placeholder="Optional detailed description with markdown formatting..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  rows={8}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Supports Markdown formatting: headings (###), lists (-, •), bold (**text**), etc.
                </p>
              </div>

              {/* Links */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Related Links</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addLink}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Link
                  </Button>
                </div>
                <div className="space-y-3">
                  {formData.links.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Link text"
                        value={link.text}
                        onChange={(e) => updateLink(index, 'text', e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) => updateLink(index, 'url', e.target.value)}
                        className="flex-1"
                      />
                      {formData.links.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLink(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Author */}
              <div className="space-y-2">
                <Label htmlFor="author">Author (Optional)</Label>
                <Input
                  id="author"
                  placeholder="Your name or username"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>

              {/* Submit */}
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Create Entry
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/changelog')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Production Implementation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Database Schema</h4>
              <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`CREATE TABLE changelog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version TEXT NOT NULL,
  date DATE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('feature', 'improvement', 'bugfix', 'documentation', 'security')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  details TEXT,
  links JSONB,
  author TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users
);`}
              </pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Next Steps</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Run database migration to create changelog table</li>
                <li>Add RLS policies (admins can insert/update, all can read)</li>
                <li>Update changelog.ts to fetch from database instead of static data</li>
                <li>Add edit and delete functionality to this admin page</li>
                <li>Implement version auto-increment based on change type</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ChangelogAdmin;
