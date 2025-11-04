import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { 
  Search, 
  Filter, 
  Calendar, 
  Tag, 
  ExternalLink,
  Sparkles,
  TrendingUp,
  Bug,
  FileText,
  Shield,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  changelogData, 
  getAllVersions, 
  getCategoryLabel, 
  getCategoryColor,
  type ChangelogCategory,
  type ChangelogEntry,
} from '@/data/changelog';
import ReactMarkdown from 'react-markdown';
import PageLayout from '@/components/layout/PageLayout';

const Changelog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ChangelogCategory | 'all'>('all');
  const [selectedVersion, setSelectedVersion] = useState<string>('all');
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set());

  const versions = useMemo(() => getAllVersions(), []);
  
  const categories: Array<{ value: ChangelogCategory | 'all'; label: string; icon: any }> = [
    { value: 'all', label: 'All Changes', icon: Filter },
    { value: 'feature', label: 'Features', icon: Sparkles },
    { value: 'improvement', label: 'Improvements', icon: TrendingUp },
    { value: 'bugfix', label: 'Bug Fixes', icon: Bug },
    { value: 'documentation', label: 'Documentation', icon: FileText },
    { value: 'security', label: 'Security', icon: Shield },
  ];

  const filteredChangelog = useMemo(() => {
    return changelogData.filter(entry => {
      const matchesSearch = searchQuery === '' || 
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.details?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
      const matchesVersion = selectedVersion === 'all' || entry.version === selectedVersion;
      
      return matchesSearch && matchesCategory && matchesVersion;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchQuery, selectedCategory, selectedVersion]);

  const groupedByVersion = useMemo(() => {
    const groups: Record<string, ChangelogEntry[]> = {};
    filteredChangelog.forEach(entry => {
      if (!groups[entry.version]) {
        groups[entry.version] = [];
      }
      groups[entry.version].push(entry);
    });
    return groups;
  }, [filteredChangelog]);

  const toggleEntry = (entryId: string) => {
    setExpandedEntries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(entryId)) {
        newSet.delete(entryId);
      } else {
        newSet.add(entryId);
      }
      return newSet;
    });
  };

  const getCategoryIcon = (category: ChangelogCategory) => {
    const icons = {
      feature: Sparkles,
      improvement: TrendingUp,
      bugfix: Bug,
      documentation: FileText,
      security: Shield,
    };
    const Icon = icons[category];
    return <Icon className="h-4 w-4" />;
  };

  return (
    <PageLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Changelog</h1>
          <p className="text-muted-foreground">
            Track all system updates, new features, improvements, and documentation changes
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search changelog entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as ChangelogCategory | 'all')}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {categories.map(cat => {
                const Icon = cat.icon;
                return (
                  <TabsTrigger key={cat.value} value={cat.value} className="text-xs sm:text-sm">
                    <Icon className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">{cat.label}</span>
                    <span className="sm:hidden">{cat.label.split(' ')[0]}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          {/* Version Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Version:</span>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedVersion === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedVersion('all')}
              >
                All
              </Button>
              {versions.map(version => (
                <Button
                  key={version}
                  variant={selectedVersion === version ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedVersion(version)}
                >
                  v{version}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredChangelog.length} {filteredChangelog.length === 1 ? 'entry' : 'entries'}
        </div>

        {/* Changelog Entries */}
        <div className="space-y-8">
          {Object.entries(groupedByVersion).map(([version, entries]) => (
            <div key={version}>
              {/* Version Header */}
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="text-lg font-bold px-3 py-1">
                  v{version}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(new Date(entries[0].date), 'MMMM d, yyyy')}
                </div>
              </div>

              {/* Entries for this version */}
              <div className="space-y-4 ml-4 border-l-2 border-muted pl-6">
                {entries.map(entry => {
                  const isExpanded = expandedEntries.has(entry.id);
                  const hasDetails = entry.details || (entry.links && entry.links.length > 0);
                  
                  return (
                    <Card key={entry.id} className="relative">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge 
                                variant="outline" 
                                className={getCategoryColor(entry.category)}
                              >
                                {getCategoryIcon(entry.category)}
                                <span className="ml-1">{getCategoryLabel(entry.category)}</span>
                              </Badge>
                              {entry.author && (
                                <span className="text-xs text-muted-foreground">
                                  by {entry.author}
                                </span>
                              )}
                            </div>
                            <CardTitle className="text-xl">{entry.title}</CardTitle>
                            <CardDescription>{entry.description}</CardDescription>
                          </div>
                          {hasDetails && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleEntry(entry.id)}
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          )}
                        </div>
                      </CardHeader>

                      {hasDetails && (
                        <Collapsible open={isExpanded}>
                          <CollapsibleContent>
                            <CardContent className="pt-0">
                              {entry.details && (
                                <div className="prose prose-sm max-w-none mb-4">
                                  <ReactMarkdown>{entry.details}</ReactMarkdown>
                                </div>
                              )}
                              
                              {entry.links && entry.links.length > 0 && (
                                <div className="space-y-2">
                                  <p className="text-sm font-medium">Related Resources:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {entry.links.map((link, index) => (
                                      <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        asChild
                                      >
                                        <a 
                                          href={link.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-1"
                                        >
                                          {link.text}
                                          <ExternalLink className="h-3 w-3" />
                                        </a>
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </CollapsibleContent>
                        </Collapsible>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredChangelog.length === 0 && (
          <Card className="p-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No entries found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters to find what you're looking for
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedVersion('all');
              }}
            >
              Clear Filters
            </Button>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            For detailed documentation, visit our{' '}
            <a href="/docs" className="text-primary hover:underline">
              documentation pages
            </a>
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Changelog;
