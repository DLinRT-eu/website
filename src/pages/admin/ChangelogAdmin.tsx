import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Archive, 
  Edit, 
  Trash2,
  Calendar,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Bug,
  FileText,
  Shield,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getCategoryLabel, getCategoryColor, type ChangelogCategory } from '@/data/changelog';
import PageLayout from '@/components/layout/PageLayout';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReactMarkdown from 'react-markdown';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ChangelogEntry {
  id: string;
  entry_id: string;
  version: string;
  date: string;
  category: ChangelogCategory;
  title: string;
  description: string;
  details: string | null;
  author: string | null;
  status: 'draft' | 'pending' | 'published' | 'archived';
  auto_generated: boolean;
  github_data: any;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const ChangelogAdmin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<string>('pending');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);

  // Fetch changelog entries
  const { data: entries = [], isLoading } = useQuery({
    queryKey: ['changelog-entries-admin', selectedStatus],
    queryFn: async () => {
      const query = supabase
        .from('changelog_entries')
        .select('*')
        .order('date', { ascending: false });
      
      if (selectedStatus !== 'all') {
        query.eq('status', selectedStatus);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as ChangelogEntry[];
    },
  });

  // Publish entry mutation
  const publishMutation = useMutation({
    mutationFn: async (entryId: string) => {
      const { error } = await supabase
        .from('changelog_entries')
        .update({ 
          status: 'published',
          published_at: new Date().toISOString(),
        })
        .eq('id', entryId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['changelog-entries-admin'] });
      toast({
        title: 'Entry Published',
        description: 'The changelog entry is now visible on the public changelog page.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Archive entry mutation
  const archiveMutation = useMutation({
    mutationFn: async (entryId: string) => {
      const { error } = await supabase
        .from('changelog_entries')
        .update({ status: 'archived' })
        .eq('id', entryId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['changelog-entries-admin'] });
      toast({
        title: 'Entry Archived',
        description: 'The changelog entry has been archived.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete entry mutation
  const deleteMutation = useMutation({
    mutationFn: async (entryId: string) => {
      const { error } = await supabase
        .from('changelog_entries')
        .delete()
        .eq('id', entryId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['changelog-entries-admin'] });
      toast({
        title: 'Entry Deleted',
        description: 'The changelog entry has been permanently deleted.',
      });
      setDeleteDialogOpen(false);
      setEntryToDelete(null);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Trigger monthly generation mutation
  const triggerGenerationMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('auto-generate-monthly-changelog');
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['changelog-entries-admin'] });
      toast({
        title: 'Generation Complete',
        description: data.message || 'Monthly changelog has been generated.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Generation Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

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

  const getStatusBadge = (status: string) => {
    const colors = {
      draft: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
      pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      published: 'bg-green-500/10 text-green-500 border-green-500/20',
      archived: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
    };
    return (
      <Badge variant="outline" className={colors[status as keyof typeof colors]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleDelete = (entryId: string) => {
    setEntryToDelete(entryId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (entryToDelete) {
      deleteMutation.mutate(entryToDelete);
    }
  };

  return (
    <PageLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Changelog Management</h1>
            <p className="text-muted-foreground">
              Review and publish auto-generated changelog entries
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => triggerGenerationMutation.mutate()}
              disabled={triggerGenerationMutation.isPending}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${triggerGenerationMutation.isPending ? 'animate-spin' : ''}`} />
              Generate Now
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/changelog')}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Public Changelog
            </Button>
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Automatic Monthly Generation</AlertTitle>
          <AlertDescription>
            Changelog entries are automatically generated on the 1st of each month from GitHub commits. 
            Review pending entries below and publish them to make them visible on the public changelog page.
          </AlertDescription>
        </Alert>

        {/* Status Filter Tabs */}
        <Tabs value={selectedStatus} onValueChange={setSelectedStatus} className="mb-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              {entries.filter(e => e.status === 'pending').length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {entries.filter(e => e.status === 'pending').length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Entries List */}
        {isLoading ? (
          <Card className="p-12 text-center">
            <RefreshCw className="h-8 w-8 mx-auto mb-4 animate-spin text-muted-foreground" />
            <p className="text-muted-foreground">Loading entries...</p>
          </Card>
        ) : entries.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No entries found</h3>
            <p className="text-muted-foreground mb-4">
              {selectedStatus === 'pending' 
                ? 'No pending entries. Changelog entries are generated automatically on the 1st of each month.'
                : `No ${selectedStatus} entries.`}
            </p>
            {selectedStatus === 'pending' && (
              <Button
                onClick={() => triggerGenerationMutation.mutate()}
                disabled={triggerGenerationMutation.isPending}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${triggerGenerationMutation.isPending ? 'animate-spin' : ''}`} />
                Generate Manually
              </Button>
            )}
          </Card>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <Card key={entry.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          v{entry.version}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={getCategoryColor(entry.category)}
                        >
                          {getCategoryIcon(entry.category)}
                          <span className="ml-1">{getCategoryLabel(entry.category)}</span>
                        </Badge>
                        {getStatusBadge(entry.status)}
                        {entry.auto_generated && (
                          <Badge variant="outline" className="text-xs">
                            Auto-generated
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{entry.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(new Date(entry.date), 'MMMM d, yyyy')}
                        </span>
                        {entry.github_data?.totalCommits && (
                          <span className="text-xs">
                            {entry.github_data.totalCommits} commits
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {entry.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => publishMutation.mutate(entry.id)}
                            disabled={publishMutation.isPending}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Publish
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => archiveMutation.mutate(entry.id)}
                            disabled={archiveMutation.isPending}
                          >
                            <Archive className="h-4 w-4 mr-1" />
                            Archive
                          </Button>
                        </>
                      )}
                      {entry.status === 'published' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => archiveMutation.mutate(entry.id)}
                          disabled={archiveMutation.isPending}
                        >
                          <Archive className="h-4 w-4 mr-1" />
                          Unpublish
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(entry.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{entry.description}</p>
                  
                  {entry.details && (
                    <div className="prose prose-sm max-w-none border-t pt-4">
                      <ReactMarkdown>{entry.details}</ReactMarkdown>
                    </div>
                  )}

                  {entry.github_data?.commitsByCategory && (
                    <div className="flex gap-4 text-xs text-muted-foreground border-t pt-3">
                      <span>Features: {entry.github_data.commitsByCategory.feature || 0}</span>
                      <span>Improvements: {entry.github_data.commitsByCategory.improvement || 0}</span>
                      <span>Bug Fixes: {entry.github_data.commitsByCategory.bugfix || 0}</span>
                      <span>Docs: {entry.github_data.commitsByCategory.documentation || 0}</span>
                      <span>Security: {entry.github_data.commitsByCategory.security || 0}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the changelog entry. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
};

export default ChangelogAdmin;
