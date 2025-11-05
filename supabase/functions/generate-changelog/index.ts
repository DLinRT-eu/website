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

function aggregateCommitMessages(commits: GitHubCommit[]): string[] {
  const messages: string[] = [];
  
  commits.forEach(commit => {
    const { title } = parseCommitMessage(commit.commit.message);
    messages.push(title);
  });
  
  return messages;
}

function generateMonthlySummaries(commitsByMonth: Map<string, GitHubCommit[]>): ChangelogEntry[] {
  const summaries: ChangelogEntry[] = [];
  const sortedMonths = Array.from(commitsByMonth.keys()).sort().reverse();
  
  sortedMonths.forEach((monthKey, index) => {
    const monthCommits = commitsByMonth.get(monthKey)!;
    const [year, month] = monthKey.split('-');
    
    // Group by category
    const categoryCounts: Record<string, number> = {
      feature: 0,
      improvement: 0,
      bugfix: 0,
      documentation: 0,
      security: 0,
    };
    
    const categoryCommits: Record<string, GitHubCommit[]> = {
      feature: [],
      improvement: [],
      bugfix: [],
      documentation: [],
      security: [],
    };
    
    monthCommits.forEach(commit => {
      const category = categorizeCommit(commit.commit.message);
      categoryCounts[category]++;
      categoryCommits[category].push(commit);
    });
    
    // Generate details with categorized changes
    let details = '';
    
    if (categoryCounts.feature > 0) {
      details += `### New Features (${categoryCounts.feature})\n`;
      aggregateCommitMessages(categoryCommits.feature).forEach(msg => {
        details += `- ${msg}\n`;
      });
      details += '\n';
    }
    
    if (categoryCounts.improvement > 0) {
      details += `### Improvements (${categoryCounts.improvement})\n`;
      aggregateCommitMessages(categoryCommits.improvement).forEach(msg => {
        details += `- ${msg}\n`;
      });
      details += '\n';
    }
    
    if (categoryCounts.bugfix > 0) {
      details += `### Bug Fixes (${categoryCounts.bugfix})\n`;
      aggregateCommitMessages(categoryCommits.bugfix).forEach(msg => {
        details += `- ${msg}\n`;
      });
      details += '\n';
    }
    
    if (categoryCounts.documentation > 0) {
      details += `### Documentation (${categoryCounts.documentation})\n`;
      aggregateCommitMessages(categoryCommits.documentation).forEach(msg => {
        details += `- ${msg}\n`;
      });
      details += '\n';
    }
    
    if (categoryCounts.security > 0) {
      details += `### Security (${categoryCounts.security})\n`;
      aggregateCommitMessages(categoryCommits.security).forEach(msg => {
        details += `- ${msg}\n`;
      });
      details += '\n';
    }
    
    // Generate description
    const parts: string[] = [];
    if (categoryCounts.feature > 0) parts.push(`${categoryCounts.feature} new feature${categoryCounts.feature > 1 ? 's' : ''}`);
    if (categoryCounts.improvement > 0) parts.push(`${categoryCounts.improvement} improvement${categoryCounts.improvement > 1 ? 's' : ''}`);
    if (categoryCounts.bugfix > 0) parts.push(`${categoryCounts.bugfix} bug fix${categoryCounts.bugfix > 1 ? 'es' : ''}`);
    
    const description = `Monthly release including ${parts.join(', ')}`;
    
    // Get month name
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[parseInt(month) - 1];
    
    // Last day of month
    const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
    const date = `${year}-${month}-${String(lastDay).padStart(2, '0')}`;
    
    summaries.push({
      id: `changelog-summary-${year}-${month}`,
      version: `${year}.${month}.0`,
      date,
      category: 'improvement',
      title: `${monthName} ${year} Updates`,
      description,
      details: details.trim(),
    });
  });
  
  return summaries;
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

    // Generate monthly summaries
    const monthlySummaries = generateMonthlySummaries(commitsByMonth);
    console.log(`Generated ${monthlySummaries.length} monthly summaries`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        entries: changelogEntries,
        summaries: monthlySummaries,
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
