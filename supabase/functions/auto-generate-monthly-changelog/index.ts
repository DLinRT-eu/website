import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Calculate last month's date range
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    
    const since = lastMonth.toISOString().split('T')[0];
    const until = lastMonthEnd.toISOString().split('T')[0];

    console.log(`Auto-generating changelog for ${since} to ${until}`);

    // Fetch GitHub commits for last month
    const GITHUB_TOKEN = Deno.env.get('GITHUB_TOKEN');
    const owner = 'DLinRT-eu';
    const repo = 'website';
    
    const githubUrl = `https://api.github.com/repos/${owner}/${repo}/commits?since=${since}T00:00:00Z&until=${until}T23:59:59Z&per_page=100`;
    
    const githubHeaders: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Supabase-Functions',
    };
    
    if (GITHUB_TOKEN) {
      githubHeaders['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(githubUrl, { headers: githubHeaders });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const commits = await response.json();
    
    if (!commits || commits.length === 0) {
      console.log('No commits found for last month');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'No commits in period',
          period: { since, until },
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${commits.length} commits`);

    // Categorize and group commits
    const categorizeCommit = (message: string): string => {
      const lowerMessage = message.toLowerCase();
      if (lowerMessage.startsWith('feat') || lowerMessage.includes('add') || lowerMessage.includes('new')) {
        return 'feature';
      }
      if (lowerMessage.startsWith('fix') || lowerMessage.includes('bug') || lowerMessage.includes('issue')) {
        return 'bugfix';
      }
      if (lowerMessage.startsWith('docs') || lowerMessage.includes('documentation')) {
        return 'documentation';
      }
      if (lowerMessage.includes('security') || lowerMessage.includes('vulnerability')) {
        return 'security';
      }
      return 'improvement';
    };

    const commitsByCategory: Record<string, string[]> = {
      feature: [],
      improvement: [],
      bugfix: [],
      documentation: [],
      security: [],
    };

    commits.forEach((commit: any) => {
      const message = commit.commit.message.split('\n')[0];
      const category = categorizeCommit(message);
      const cleanMessage = message.replace(/^(feat|fix|docs|chore|refactor|style|test|perf|build|ci)(\(.+?\))?:\s*/i, '').trim();
      if (cleanMessage) {
        commitsByCategory[category].push(cleanMessage);
      }
    });

    // Generate summary details
    let details = '';
    const categoryNames = {
      feature: 'New Features',
      improvement: 'Improvements',
      bugfix: 'Bug Fixes',
      documentation: 'Documentation',
      security: 'Security',
    };

    for (const [category, categoryName] of Object.entries(categoryNames)) {
      const items = commitsByCategory[category];
      if (items.length > 0) {
        details += `### ${categoryName} (${items.length})\n`;
        items.forEach(item => {
          details += `- ${item}\n`;
        });
        details += '\n';
      }
    }

    // Determine primary category (most commits)
    const primaryCategory = Object.entries(commitsByCategory)
      .sort((a, b) => b[1].length - a[1].length)[0][0];

    // Generate version and entry ID
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[lastMonth.getMonth()];
    const year = lastMonth.getFullYear();
    
    const version = `${year}.${String(lastMonth.getMonth() + 1).padStart(2, '0')}.0`;
    const entryId = `changelog-${year}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
    const title = `${monthName} ${year} Updates`;
    
    const totalFeatures = commitsByCategory.feature.length;
    const totalImprovements = commitsByCategory.improvement.length;
    const totalBugfixes = commitsByCategory.bugfix.length;
    
    const description = `Monthly release including ${totalFeatures} new features, ${totalImprovements} improvements, and ${totalBugfixes} bug fixes`;

    // Check if entry already exists
    const { data: existing } = await supabase
      .from('changelog_entries')
      .select('id, status')
      .eq('entry_id', entryId)
      .single();

    if (existing) {
      console.log('Entry already exists:', entryId, 'with status:', existing.status);
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Entry already exists',
          entryId,
          status: existing.status,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert into database with 'pending' status
    const { data: newEntry, error: insertError } = await supabase
      .from('changelog_entries')
      .insert({
        entry_id: entryId,
        version,
        date: until,
        category: primaryCategory,
        title,
        description,
        details: details.trim(),
        status: 'pending',
        auto_generated: true,
        github_data: {
          totalCommits: commits.length,
          period: { since, until },
          commitsByCategory: Object.fromEntries(
            Object.entries(commitsByCategory).map(([k, v]) => [k, v.length])
          ),
        },
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw insertError;
    }

    console.log('Monthly changelog created successfully:', entryId);

    // Create notification for admins
    const { data: adminUsers } = await supabase
      .from('user_roles')
      .select('user_id')
      .eq('role', 'admin');

    if (adminUsers && adminUsers.length > 0) {
      const notifications = adminUsers.map(admin => ({
        user_id: admin.user_id,
        title: 'New Changelog Entry Pending',
        message: `Monthly changelog for ${monthName} ${year} has been auto-generated and needs review`,
        type: 'info',
        link: '/admin/changelog',
      }));

      await supabase
        .from('notifications')
        .insert(notifications);
      
      console.log(`Created ${notifications.length} notifications for admins`);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        entry: newEntry,
        message: 'Monthly changelog created and pending admin approval',
        stats: {
          totalCommits: commits.length,
          features: totalFeatures,
          improvements: totalImprovements,
          bugfixes: totalBugfixes,
        },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in auto-generate-monthly-changelog:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500,
      }
    );
  }
});
