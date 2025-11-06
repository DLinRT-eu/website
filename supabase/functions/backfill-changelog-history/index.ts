import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
}

function categorizeCommit(message: string): string {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('feat') || lowerMessage.includes('add') || lowerMessage.includes('new')) {
    return 'feature';
  } else if (lowerMessage.includes('fix') || lowerMessage.includes('bug')) {
    return 'bugfix';
  } else if (lowerMessage.includes('doc') || lowerMessage.includes('readme')) {
    return 'documentation';
  } else if (lowerMessage.includes('security') || lowerMessage.includes('auth')) {
    return 'security';
  }
  return 'improvement';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify user is admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (!roles) {
      throw new Error('Admin access required');
    }

    // Validate REPO_NAME environment variable
    const githubRepo = Deno.env.get('REPO_NAME');
    
    if (!githubRepo) {
      return new Response(
        JSON.stringify({ 
          error: 'Repository not configured',
          message: 'Please set REPO_NAME secret in Supabase Edge Function settings (e.g., "username/repo-name")',
          instructions: 'Go to Supabase Dashboard → Edge Functions → Secrets → Add REPO_NAME'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Starting changelog backfill from April 2025...');

    // Fetch commits from GitHub (April 2025 to now)
    const startDate = new Date('2025-04-01T00:00:00Z');
    
    const githubToken = Deno.env.get('REPO_TOKEN');
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Supabase-Function',
    };
    
    if (githubToken) {
      headers['Authorization'] = `token ${githubToken}`;
    }

    const githubApiUrl = `https://api.github.com/repos/${githubRepo}/commits?since=${startDate.toISOString()}&per_page=100`;
    
    const githubResponse = await fetch(githubApiUrl, { headers });
    
    if (!githubResponse.ok) {
      throw new Error(`GitHub API error: ${githubResponse.status}`);
    }

    const commits: GitHubCommit[] = await githubResponse.json();
    console.log(`Fetched ${commits.length} commits from GitHub`);

    // Group commits by month
    const commitsByMonth = new Map<string, GitHubCommit[]>();
    
    commits.forEach(commit => {
      const date = new Date(commit.commit.author.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!commitsByMonth.has(monthKey)) {
        commitsByMonth.set(monthKey, []);
      }
      commitsByMonth.get(monthKey)!.push(commit);
    });

    const entriesCreated = [];

    // Create changelog entries for each month
    for (const [monthKey, monthCommits] of commitsByMonth.entries()) {
      const [year, month] = monthKey.split('-');
      const entryDate = `${year}-${month}-01`;
      
      // Categorize commits
      const categorized = {
        feature: [] as string[],
        bugfix: [] as string[],
        security: [] as string[],
        improvement: [] as string[],
        documentation: [] as string[],
      };

      monthCommits.forEach(commit => {
        const category = categorizeCommit(commit.commit.message);
        const title = commit.commit.message.split('\n')[0].substring(0, 100);
        categorized[category as keyof typeof categorized].push(title);
      });

      // Generate details markdown
      let details = '';
      for (const [category, items] of Object.entries(categorized)) {
        if (items.length > 0) {
          details += `### ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;
          items.forEach(item => {
            details += `- ${item}\n`;
          });
          details += '\n';
        }
      }

      // Generate version number
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const version = `${monthNames[parseInt(month) - 1]} ${year}`;

      const entryId = `${monthKey}-backfill`;
      const title = `${version} Updates`;
      const description = `${monthCommits.length} changes this month`;

      // Check if entry already exists
      const { data: existing } = await supabase
        .from('changelog_entries')
        .select('id')
        .eq('id', entryId)
        .single();

      if (!existing) {
        const { error: insertError } = await supabase
          .from('changelog_entries')
          .insert({
            id: entryId,
            version,
            date: entryDate,
            category: 'feature',
            title,
            description,
            details,
            status: 'published',
            published_at: new Date().toISOString(),
          });

        if (insertError) {
          console.error(`Error inserting entry for ${monthKey}:`, insertError);
        } else {
          entriesCreated.push({ month: monthKey, version, commits: monthCommits.length });
          console.log(`Created changelog entry for ${monthKey}`);
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Backfill complete. Created ${entriesCreated.length} changelog entries.`,
        entries: entriesCreated,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in backfill-changelog-history:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
