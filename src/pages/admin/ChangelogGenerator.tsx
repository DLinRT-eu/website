import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Download, GitBranch, Calendar, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
      setStats({
        totalCommits: result.totalCommits,
        monthsProcessed: result.monthsProcessed,
      });

      toast({
        title: "Changelog Generated",
        description: `Generated ${result.entries.length} entries from ${result.totalCommits} commits`,
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
    a.download = `changelog-generated-${new Date().toISOString().split('T')[0]}.ts`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Exported",
      description: "Changelog entries exported as TypeScript file",
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
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{generatedEntries.length}</div>
                  <div className="text-sm text-muted-foreground">Entries Generated</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.totalCommits}</div>
                  <div className="text-sm text-muted-foreground">Total Commits</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.monthsProcessed}</div>
                  <div className="text-sm text-muted-foreground">Months Covered</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {generatedEntries.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Generated Entries</CardTitle>
                  <CardDescription>
                    Review and export the generated changelog entries
                  </CardDescription>
                </div>
                <Button onClick={exportAsTypeScript} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export as TypeScript
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {generatedEntries.map((entry) => (
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
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default ChangelogGenerator;
