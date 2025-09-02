import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Download, FileText, FileSpreadsheet, FileJson } from 'lucide-react';
import ExportService, { ExportFormat, ExportType } from '@/services/ExportService';
import { useToast } from '@/hooks/use-toast';

interface ExportButtonProps {
  data: any[];
  type: ExportType;
  filename?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  disabled?: boolean;
}

const ExportButton = ({ 
  data, 
  type, 
  filename,
  variant = "outline",
  size = "default",
  disabled = false 
}: ExportButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async (format: ExportFormat) => {
    if (data.length === 0) {
      toast({
        title: "No data to export",
        description: "Please ensure there is data available for export.",
        variant: "destructive"
      });
      return;
    }

    setIsExporting(true);
    
    try {
      switch (type) {
        case "products":
          await ExportService.exportProducts(data, format, { filename });
          break;
        case "initiatives":
          await ExportService.exportInitiatives(data, format, { filename });
          break;
        default:
          throw new Error(`Export type ${type} not supported`);
      }
      
      toast({
        title: "Export successful",
        description: `Data exported as ${format.toUpperCase()} file.`
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "An error occurred during export. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportFormats = [
    { format: 'csv' as ExportFormat, label: 'CSV', icon: FileText },
    { format: 'excel' as ExportFormat, label: 'Excel', icon: FileSpreadsheet },
    { format: 'json' as ExportFormat, label: 'JSON', icon: FileJson }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size={size} 
          disabled={disabled || isExporting || data.length === 0}
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Export'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {exportFormats.map(({ format, label, icon: Icon }) => (
          <DropdownMenuItem 
            key={format}
            onClick={() => handleExport(format)}
            disabled={isExporting}
          >
            <Icon className="w-4 h-4 mr-2" />
            Export as {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportButton;