import React, { useState } from 'react';
import { ProductDetails } from '@/types/productDetails';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Download, ExternalLink } from 'lucide-react';
import { exportModelCardToExcel, exportModelCardToCSV } from '@/utils/modelCard';

interface ProductComparisonProps {
  products: ProductDetails[];
  isOpen: boolean;
  onClose: () => void;
}

interface ComparisonRow {
  field: string;
  [key: string]: any;
}

const ProductComparison = ({ products, isOpen, onClose }: ProductComparisonProps) => {
  const [exportFormat, setExportFormat] = useState<'excel' | 'csv'>('excel');

  // Create comparison data structure
  const createComparisonData = (): ComparisonRow[] => {
    const fields = [
      { key: 'name', label: 'Product Name' },
      { key: 'company', label: 'Company' },
      { key: 'description', label: 'Description' },
      { key: 'category', label: 'Category' },
      { key: 'certification', label: 'Certification' },
      { key: 'modality', label: 'Modality' },
      { key: 'anatomicalLocation', label: 'Anatomical Location' },
      { key: 'releaseDate', label: 'Release Date' },
      { key: 'lastUpdated', label: 'Last Updated' },
      { key: 'features', label: 'Key Features' },
      { key: 'website', label: 'Website' },
    ];

    return fields.map(field => {
      const row: ComparisonRow = { field: field.label };
      
      products.forEach((product, index) => {
        const value = product[field.key as keyof ProductDetails];
        let displayValue = '';

        if (Array.isArray(value)) {
          displayValue = value.join(', ');
        } else if (value) {
          displayValue = String(value);
        } else {
          displayValue = 'N/A';
        }

        row[`product_${index}`] = displayValue;
      });

      return row;
    });
  };

  // Create dynamic columns based on products
  const createColumns = (): ColumnDef<ComparisonRow>[] => {
    const columns: ColumnDef<ComparisonRow>[] = [
      {
        accessorKey: 'field',
        header: 'Field',
        cell: ({ row }) => (
          <div className="font-medium text-primary">{row.getValue('field')}</div>
        ),
      },
    ];

    products.forEach((product, index) => {
      columns.push({
        accessorKey: `product_${index}`,
        header: () => (
          <div className="text-center">
            <div className="font-semibold">{product.name}</div>
            <div className="text-sm text-muted-foreground">{product.company}</div>
          </div>
        ),
        cell: ({ row, getValue }) => {
          const value = getValue() as string;
          const field = row.getValue('field') as string;
          
          // Special formatting for certain fields
          if (field === 'Website' && value !== 'N/A') {
            return (
              <a 
                href={value} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                View <ExternalLink className="h-3 w-3" />
              </a>
            );
          }
          
          if (field === 'Certification' && value !== 'N/A') {
            return <Badge variant="secondary">{value}</Badge>;
          }
          
          if (field === 'Category' && value !== 'N/A') {
            return <Badge variant="outline">{value}</Badge>;
          }

          if (field === 'Key Features' && value !== 'N/A') {
            return (
              <div className="max-w-xs">
                <div className="text-sm line-clamp-3">{value}</div>
              </div>
            );
          }

          return (
            <div className="max-w-xs">
              <div className="text-sm break-words">{value}</div>
            </div>
          );
        },
      });
    });

    return columns;
  };

  const handleExportComparison = () => {
    const comparisonData = createComparisonData();
    
    // Create a simplified structure for Excel/CSV export
    const exportData = {
      id: `comparison_${Date.now()}`,
      name: `Product Comparison - ${products.map(p => p.name).join(' vs ')}`,
      description: `Comparison of ${products.length} products`,
      company: 'Multiple',
      category: 'Comparison',
      comparisonData: comparisonData,
      products: products.map(p => ({
        name: p.name,
        company: p.company,
        category: p.category,
        certification: p.certification,
        modality: p.modality,
        anatomicalLocation: p.anatomicalLocation,
        features: p.features,
        website: p.website
      }))
    } as any;

    try {
      if (exportFormat === 'excel') {
        exportModelCardToExcel(exportData);
      } else {
        exportModelCardToCSV(exportData);
      }
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const comparisonData = createComparisonData();
  const columns = createColumns();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden" aria-describedby="comparison-description">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Product Comparison</span>
            <div id="comparison-description" className="sr-only">
              Compare selected products side by side with export options
            </div>
            <div className="flex items-center gap-2">
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value as 'excel' | 'csv')}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
              <Button
                onClick={handleExportComparison}
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="overflow-auto max-h-[70vh]">
          <DataTable
            columns={columns}
            data={comparisonData}
            defaultSort={[]}
          />
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Comparing {products.length} products
          </p>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductComparison;