import { Button } from "@/components/ui/button";
import { Download, Upload, AlertCircle } from "lucide-react";
import { toast } from "sonner";
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
import { useState, useRef } from "react";

interface PreferenceData {
  version: string;
  exported_at: string;
  categories: Array<{ category: string; priority: number }>;
  companies: Array<{ company_id: string; priority: number }>;
  products: Array<{ product_id: string; priority: number }>;
}

interface PreferenceImportExportProps {
  onExport: () => PreferenceData;
  onImport: (data: PreferenceData) => Promise<void>;
}

export function PreferenceImportExport({ onExport, onImport }: PreferenceImportExportProps) {
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importData, setImportData] = useState<PreferenceData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      const data = onExport();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reviewer-preferences-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Preferences exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export preferences');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content) as PreferenceData;
        
        // Validate structure
        if (!data.version || !data.categories || !data.companies || !data.products) {
          throw new Error('Invalid preference file format');
        }

        setImportData(data);
        setShowImportDialog(true);
      } catch (error) {
        console.error('Import error:', error);
        toast.error('Invalid preference file');
      }
    };
    reader.readAsText(file);
    
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConfirmImport = async () => {
    if (!importData) return;

    try {
      await onImport(importData);
      toast.success('Preferences imported successfully');
      setShowImportDialog(false);
      setImportData(null);
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import preferences');
    }
  };

  const totalImportCount = importData 
    ? importData.categories.length + importData.companies.length + importData.products.length
    : 0;

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
        >
          <Download className="h-4 w-4 mr-2" />
          Export Template
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          Import Template
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      <AlertDialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              Confirm Import
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>
                This will add the following preferences to your account:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>{importData?.categories.length || 0} task categories</li>
                <li>{importData?.companies.length || 0} companies</li>
                <li>{importData?.products.length || 0} products</li>
              </ul>
              <p className="text-xs text-muted-foreground">
                Total: {totalImportCount} preferences
              </p>
              <p className="font-medium">
                Existing preferences will be preserved. This only adds new preferences.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setShowImportDialog(false);
              setImportData(null);
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmImport}>
              Import Preferences
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
