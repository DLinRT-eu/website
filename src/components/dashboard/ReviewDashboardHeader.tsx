import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileSpreadsheet, Download } from 'lucide-react';

interface ReviewDashboardHeaderProps {
  criticalCount: number;
  warningCount: number;
  overdueCount: number;
  onExportCSV: () => void;
  onExportExcel: () => void;
}

export const ReviewDashboardHeader: React.FC<ReviewDashboardHeaderProps> = ({
  criticalCount,
  warningCount,
  overdueCount,
  onExportCSV,
  onExportExcel
}) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Review Dashboard</h1>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onExportCSV}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
        <Button
          variant="outline"
          onClick={onExportExcel}
          className="flex items-center gap-2"
        >
          <FileSpreadsheet className="h-4 w-4" />
          Export Excel
        </Button>
        <Badge variant="destructive" className="text-sm">
          {criticalCount} Critical
        </Badge>
        <Badge variant="warning" className="text-sm">
          {warningCount} Warnings
        </Badge>
        <Badge variant="secondary" className="text-sm">
          {overdueCount} Overdue
        </Badge>
      </div>
    </div>
  );
};