import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Download, GitBranch, Calendar, AlertCircle, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCategoryColor, getCategoryLabel } from "@/data/changelog";

interface ChangelogEntry {
  id: string;
  version: string;
  date: string;
  category: 'feature' | 'improvement' | 'bugfix' | 'documentation' | 'security';
  title: string;
  description: string;
  details?: string;
}

interface GenerateResult {
  success: boolean;
  entries: ChangelogEntry[];
  summaries: ChangelogEntry[];
  totalCommits: number;
  monthsProcessed: number;
  error?: string;
}

const ChangelogGenerator = () => {
  const { toast } = useToast();
  const [owner, setOwner] = useState("DLinRT-eu");
  const [repo, setRepo] = useState("website");
  const [since, setSince] = useState("2025-04-01");
  const [loading, setLoading] = useState(false);
  const [generatedEntries, setGeneratedEntries] = useState<ChangelogEntry[]>([]);
  const [summaries, setSummaries] = useState<ChangelogEntry[]>([]);
  const [viewMode, setViewMode] = useState<'detailed' | 'summary'>('summary');
  const [stats, setStats] = useState<{ totalCommits: number; monthsProcessed: number } | null>(null);

  const handleGenerate = async () => {
    if (!owner || !repo) {
      toast({
        title: "Missing Information",
        description: "Please provide repository owner and name",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-changelog', {
        body: { owner, repo, since },
      });

      if (error) throw error;

      const result = data as GenerateResult;

      if (!result.success) {
        throw new Error(result.error || 'Failed to generate changelog');
      }

      setGeneratedEntries(result.entries);
      setSummaries(result.summaries || []);
      setStats({
        totalCommits: result.totalCommits,
        monthsProcessed: result.monthsProcessed,
      });

      toast({
        title: "Changelog Generated",
        description: `Generated ${result.entries.length} detailed entries and ${result.summaries?.length || 0} monthly summaries`,
      });
    } catch (error: any) {
      console.error('Error generating changelog:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate changelog from GitHub",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const exportAsTypeScript = () => {
    const tsCode = `// Auto-generated changelog entries from GitHub commits
// Generated on: ${new Date().toISOString()}

export const generatedChangelogEntries: ChangelogEntry[] = ${JSON.stringify(generatedEntries, null, 2)};

// Add these entries to your changelogData array in src/data/changelog.ts
`;

    const blob = new Blob([tsCode], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `changelog-detailed-${new Date().toISOString().split('T')[0]}.ts`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Exported",
      description: "Detailed changelog entries exported as TypeScript file",
    });
  };

  const exportSummaryAsTypeScript = () => {
    const tsCode = `// Auto-generated monthly changelog summaries from GitHub commits
// Generated on: ${new Date().toISOString()}
// Repository: ${owner}/${repo}
// Period: ${since || 'all time'} to ${new Date().toISOString().split('T')[0]}

export const monthlySummaries: ChangelogEntry[] = ${JSON.stringify(summaries, null, 2)};

// Add these to the beginning of changelogData array in src/data/changelog.ts
`;

    const blob = new Blob([tsCode], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `changelog-summary-${new Date().toISOString().split('T')[0]}.ts`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Exported",
      description: "Monthly summaries exported as TypeScript file",
    });
  };

  return (
    <PageLayout
      title="Changelog Generator"
      description="Automatically generate changelog entries from GitHub commits"
    >
      <div className="space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This tool fetches commits from your GitHub repository and automatically generates
            changelog entries based on commit messages. Use conventional commit formats
            (feat:, fix:, docs:) for best results.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              Repository Configuration
            </CardTitle>
            <CardDescription>
              Configure the GitHub repository to generate changelog from
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="owner">Repository Owner</Label>
                <Input
                  id="owner"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  placeholder="e.g., DLinRT-eu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repo">Repository Name</Label>
                <Input
                  id="repo"
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  placeholder="e.g., website"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="since" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Start Date (optional)
              </Label>
              <Input
                id="since"
                type="date"
                value={since}
                onChange={(e) => setSince(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to fetch all commits, or specify a date to start from
              </p>
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Changelog"
              )}
            </Button>
          </CardContent>
        </Card>

        {stats && (
          <Card>
            <CardHeader>
              <CardTitle>Generation Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{stats.totalCommits}</div>
                  <div className="text-sm text-muted-foreground">Total Commits</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.monthsProcessed}</div>
                  <div className="text-sm text-muted-foreground">Months Covered</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{summaries.length}</div>
                  <div className="text-sm text-muted-foreground">Monthly Summaries</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{generatedEntries.length}</div>
                  <div className="text-sm text-muted-foreground">Detailed Entries</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {(generatedEntries.length > 0 || summaries.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Changelog</CardTitle>
              <CardDescription>
                Review and export changelog entries in detailed or summary format
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'detailed' | 'summary')}>
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="summary" className="gap-2">
                      <FileText className="h-4 w-4" />
                      Monthly Summary ({summaries.length})
                    </TabsTrigger>
                    <TabsTrigger value="detailed" className="gap-2">
                      <GitBranch className="h-4 w-4" />
                      Detailed ({generatedEntries.length})
                    </TabsTrigger>
                  </TabsList>
                  
                  {viewMode === 'summary' ? (
                    <Button onClick={exportSummaryAsTypeScript} variant="outline" disabled={summaries.length === 0}>
                      <Download className="mr-2 h-4 w-4" />
                      Export Summary
                    </Button>
                  ) : (
                    <Button onClick={exportAsTypeScript} variant="outline" disabled={generatedEntries.length === 0}>
                      <Download className="mr-2 h-4 w-4" />
                      Export Detailed
                    </Button>
                  )}
                </div>

                <TabsContent value="summary">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-6">
                      {summaries.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                          No monthly summaries generated yet
                        </div>
                      ) : (
                        summaries.map((entry) => (
                          <Card key={entry.id} className="border-2">
                            <CardHeader>
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="font-mono">
                                    {entry.version}
                                  </Badge>
                                  <Badge variant="secondary">{entry.date}</Badge>
                                </div>
                              </div>
                              <CardTitle className="text-2xl">{entry.title}</CardTitle>
                              <CardDescription className="text-base">
                                {entry.description}
                              </CardDescription>
                            </CardHeader>
                            {entry.details && (
                              <CardContent>
                                <div className="prose prose-sm max-w-none">
                                  <pre className="whitespace-pre-wrap font-sans bg-muted/50 p-4 rounded-md text-sm leading-relaxed">
                                    {entry.details}
                                  </pre>
                                </div>
                              </CardContent>
                            )}
                          </Card>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="detailed">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-4">
                      {generatedEntries.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                          No detailed entries generated yet
                        </div>
                      ) : (
                        generatedEntries.map((entry) => (
                          <Card key={entry.id}>
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline">{entry.version}</Badge>
                                    <Badge variant="secondary">{entry.date}</Badge>
                                  </div>
                                  <CardTitle className="text-lg">{entry.title}</CardTitle>
                                </div>
                                <Badge className={getCategoryColor(entry.category)}>
                                  {getCategoryLabel(entry.category)}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground mb-2">
                                {entry.description}
                              </p>
                              {entry.details && (
                                <div className="text-xs text-muted-foreground bg-muted p-2 rounded mt-2 font-mono">
                                  {entry.details}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default ChangelogGenerator;
