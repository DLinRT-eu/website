
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Download } from 'lucide-react';
import { exportReviewToCSV, exportReviewToExcel } from '@/utils/reviewExport';
import { useToast } from "@/hooks/use-toast";
import { ReviewProduct } from '../types/reviewTypes';

interface ExportButtonsProps {
  reviewProducts: ReviewProduct[];
  assignments: Record<string, string>;
  productCount: number;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({
  reviewProducts,
  assignments,
  productCount
}) => {
  const { toast } = useToast();

  const handleExportCSV = () => {
    try {
      exportReviewToCSV(reviewProducts, assignments);
      toast({
        title: "Export Successful",
        description: `Exported ${productCount} products to CSV`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export to CSV format",
        variant: "destructive",
      });
    }
  };

  const handleExportExcel = () => {
    try {
      exportReviewToExcel(reviewProducts, assignments);
      toast({
        title: "Export Successful",
        description: `Exported ${productCount} products to Excel`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export to Excel format",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2 justify-end">
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportCSV}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Export CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportExcel}
        className="flex items-center gap-2"
      >
        <FileSpreadsheet className="h-4 w-4" />
        Export Excel
      </Button>
    </div>
  );
};

export default ExportButtons;
