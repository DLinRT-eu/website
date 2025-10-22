import { DocumentVerification } from '@/components/admin/DocumentVerification';
import PageLayout from '@/components/layout/PageLayout';

export default function DocumentVerificationPage() {
  return (
    <PageLayout 
      title="Document Verification" 
      description="Review and verify user-uploaded documents"
    >
      <DocumentVerification />
    </PageLayout>
  );
}
