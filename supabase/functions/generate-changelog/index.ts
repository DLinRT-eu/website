import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

interface ChangelogEntry {
  id: string;
  version: string;
  date: string;
  category: 'feature' | 'improvement' | 'bugfix' | 'documentation' | 'security';
  title: string;
  description: string;
  details?: string;
}

function categorizeCommit(message: string): 'feature' | 'improvement' | 'bugfix' | 'documentation' | 'security' {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('feat:') || lowerMessage.includes('feature:') || lowerMessage.includes('add ')) {
    return 'feature';
  }
  if (lowerMessage.includes('fix:') || lowerMessage.includes('bug:') || lowerMessage.includes('fixed ')) {
    return 'bugfix';
  }
  if (lowerMessage.includes('docs:') || lowerMessage.includes('documentation')) {
    return 'documentation';
  }
  if (lowerMessage.includes('security') || lowerMessage.includes('auth') || lowerMessage.includes('rls')) {
    return 'security';
  }
  return 'improvement';
}

function parseCommitMessage(message: string): { title: string; description: string } {
  const lines = message.split('\n').filter(line => line.trim());
  const title = lines[0].replace(/^(feat|fix|docs|chore|refactor|style|test|perf|ci|build|revert):\s*/i, '');
  const description = lines.slice(1).join(' ').trim() || title;
  
  return { title, description };
}

function generateVersionNumber(date: string, existingVersions: Set<string>): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  
  let version = `${year}.${month}.0`;
  let counter = 0;
  
  while (existingVersions.has(version)) {
    counter++;
    version = `${year}.${month}.${counter}`;
  }
  
  existingVersions.add(version);
  return version;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { owner, repo, since } = await req.json();

    if (!owner || !repo) {
      throw new Error('Repository owner and name are required');
    }

    console.log(`Fetching commits from ${owner}/${repo} since ${since || 'beginning'}`);

    // Build GitHub API URL
    let apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=100`;
    if (since) {
      apiUrl += `&since=${since}`;
    }

    // Fetch commits from GitHub API
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Lovable-Changelog-Generator',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API error:', response.status, errorText);
      throw new Error(`GitHub API error: ${response.status} ${errorText}`);
    }

    const commits: GitHubCommit[] = await response.json();
    console.log(`Fetched ${commits.length} commits`);

    // Group commits by month
    const commitsByMonth: Map<string, GitHubCommit[]> = new Map();
    
    commits.forEach(commit => {
      const date = new Date(commit.commit.author.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!commitsByMonth.has(monthKey)) {
        commitsByMonth.set(monthKey, []);
      }
      commitsByMonth.get(monthKey)!.push(commit);
    });

    console.log(`Grouped into ${commitsByMonth.size} months`);

    // Generate changelog entries
    const changelogEntries: ChangelogEntry[] = [];
    const existingVersions = new Set<string>();
    let entryCounter = 1;

    // Sort months in descending order
    const sortedMonths = Array.from(commitsByMonth.keys()).sort().reverse();

    sortedMonths.forEach(monthKey => {
      const monthCommits = commitsByMonth.get(monthKey)!;
      
      // Group commits by category within the month
      const commitsByCategory: Map<string, GitHubCommit[]> = new Map();
      
      monthCommits.forEach(commit => {
        const category = categorizeCommit(commit.commit.message);
        if (!commitsByCategory.has(category)) {
          commitsByCategory.set(category, []);
        }
        commitsByCategory.get(category)!.push(commit);
      });

      // Create entries for each category
      commitsByCategory.forEach((commits, category) => {
        commits.forEach(commit => {
          const { title, description } = parseCommitMessage(commit.commit.message);
          const date = new Date(commit.commit.author.date);
          const version = generateVersionNumber(commit.commit.author.date, existingVersions);
          
          changelogEntries.push({
            id: `changelog-auto-${String(entryCounter).padStart(3, '0')}`,
            version,
            date: date.toISOString().split('T')[0],
            category: category as any,
            title,
            description,
            details: `Commit: ${commit.sha.substring(0, 7)} by ${commit.commit.author.name}\n\n${commit.html_url}`,
          });
          
          entryCounter++;
        });
      });
    });

    console.log(`Generated ${changelogEntries.length} changelog entries`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        entries: changelogEntries,
        totalCommits: commits.length,
        monthsProcessed: commitsByMonth.size,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error generating changelog:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
