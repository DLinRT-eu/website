import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FileText, CheckCircle, XCircle, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
}

interface ProfileDocument {
  id: string;
  user_id: string;
  document_type: string;
  file_name: string;
  file_size: number;
  file_url: string;
  mime_type: string;
  description: string | null;
  verified_by: string | null;
  verified_at: string | null;
  verification_notes: string | null;
  uploaded_at: string;
  user_profile?: UserProfile;
}

const DOCUMENT_TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'cv_resume', label: 'CV/Resume' },
  { value: 'certification', label: 'Certification' },
  { value: 'publication', label: 'Publication' },
  { value: 'identification', label: 'Identification' },
  { value: 'company_verification', label: 'Company Verification' },
  { value: 'other', label: 'Other' },
];

export const DocumentVerification = () => {
  const [documents, setDocuments] = useState<ProfileDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [selectedDoc, setSelectedDoc] = useState<ProfileDocument | null>(null);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadDocuments();
  }, [filterType]);

  const loadDocuments = async () => {
    try {
      let query = supabase
        .from('profile_documents')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (filterType !== 'all') {
        query = query.eq('document_type', filterType as any);
      }

      const { data: docsData, error: docsError } = await query;
      if (docsError) throw docsError;

      // Fetch user profiles separately
      if (docsData && docsData.length > 0) {
        const userIds = [...new Set(docsData.map(d => d.user_id))];
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, email')
          .in('id', userIds);

        if (profilesError) throw profilesError;

        const profilesMap = new Map(profilesData?.map(p => [p.id, p]) || []);
        
        const enrichedDocs = docsData.map(doc => ({
          ...doc,
          user_profile: profilesMap.get(doc.user_id),
        }));

        setDocuments(enrichedDocs);
      } else {
        setDocuments([]);
      }
    } catch (error) {
      console.error('Error loading documents:', error);
      toast({
        title: 'Error',
        description: 'Failed to load documents',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyDocument = async (approved: boolean) => {
    if (!selectedDoc) return;

    setProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('profile_documents')
        .update({
          verified_by: user.id,
          verified_at: approved ? new Date().toISOString() : null,
          verification_notes: verificationNotes || (approved ? 'Approved' : 'Rejected'),
        })
        .eq('id', selectedDoc.id);

      if (error) throw error;

      // Send notification
      await supabase.rpc('create_notification', {
        p_user_id: selectedDoc.user_id,
        p_title: `Document ${approved ? 'Approved' : 'Rejected'}`,
        p_message: `Your ${selectedDoc.file_name} has been ${approved ? 'approved' : 'rejected'}${verificationNotes ? ': ' + verificationNotes : ''}`,
        p_type: approved ? 'success' : 'error',
        p_link: '/profile',
      });

      toast({
        title: approved ? 'Document Approved' : 'Document Rejected',
        description: 'User has been notified',
      });

      setSelectedDoc(null);
      setVerificationNotes('');
      loadDocuments();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getStatusBadge = (doc: ProfileDocument) => {
    if (doc.verified_at) {
      return (
        <Badge variant="default" className="gap-1">
          <CheckCircle className="h-3 w-3" />
          Verified
        </Badge>
      );
    }
    if (doc.verification_notes?.toLowerCase().includes('reject')) {
      return (
        <Badge variant="destructive" className="gap-1">
          <XCircle className="h-3 w-3" />
          Rejected
        </Badge>
      );
    }
    return <Badge variant="secondary">Pending</Badge>;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Verification
              </CardTitle>
              <CardDescription>
                Review and verify user-uploaded documents
              </CardDescription>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DOCUMENT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading documents...
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No documents found
            </div>
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium truncate">{doc.file_name}</p>
                      {getStatusBadge(doc)}
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>
                        User: {doc.user_profile?.first_name} {doc.user_profile?.last_name} ({doc.user_profile?.email || 'N/A'})
                      </div>
                      <div className="flex items-center gap-3">
                        <span>
                          {DOCUMENT_TYPES.find((t) => t.value === doc.document_type)?.label}
                        </span>
                        <span>•</span>
                        <span>{formatFileSize(doc.file_size)}</span>
                        <span>•</span>
                        <span>
                          {formatDistanceToNow(new Date(doc.uploaded_at), { addSuffix: true })}
                        </span>
                      </div>
                      {doc.description && (
                        <div className="italic">{doc.description}</div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedDoc(doc)}
                    className="ml-4"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Review
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Document</DialogTitle>
            <DialogDescription>
              Verify or reject this document submission
            </DialogDescription>
          </DialogHeader>
          {selectedDoc && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 space-y-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground">User</Label>
                    <p className="font-medium">
                      {selectedDoc.user_profile?.first_name} {selectedDoc.user_profile?.last_name}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{selectedDoc.user_profile?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Document Type</Label>
                    <p className="font-medium">
                      {DOCUMENT_TYPES.find((t) => t.value === selectedDoc.document_type)?.label}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">File Size</Label>
                    <p className="font-medium">{formatFileSize(selectedDoc.file_size)}</p>
                  </div>
                </div>
                {selectedDoc.description && (
                  <div>
                    <Label className="text-muted-foreground">Description</Label>
                    <p className="text-sm">{selectedDoc.description}</p>
                  </div>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <Button
                  variant="outline"
                  onClick={() => window.open(selectedDoc.file_url, '_blank')}
                  className="w-full"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Document
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Verification Notes</Label>
                <Textarea
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  placeholder="Add notes about this verification..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => verifyDocument(false)}
                  variant="destructive"
                  disabled={processing}
                  className="flex-1"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => verifyDocument(true)}
                  disabled={processing}
                  className="flex-1"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
