import React, { useState } from 'react';
import { ProductDetails } from '@/types/productDetails';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Download, ExternalLink } from 'lucide-react';
import { exportComparisonToExcel, exportComparisonToCSV, exportComparisonToPDF } from '@/utils/comparison/comparisonExporter';

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
  const [exportFormat, setExportFormat] = useState<'excel' | 'csv' | 'pdf'>('excel');

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
      { key: 'keyFeatures', label: 'Additional Features' },
      { key: 'website', label: 'Website' },
      { key: 'productUrl', label: 'Product URL' },
      { key: 'diseaseTargeted', label: 'Disease Targeted' },
      { key: 'suggestedUse', label: 'Suggested Use' },
      { key: 'clinicalEvidence', label: 'Clinical Evidence' },
    ];

    return fields.map(field => {
      const row: ComparisonRow = { field: field.label };
      
      products.forEach((product, index) => {
        let value: any;
        let displayValue = '';

        // Get the value based on the field key
        switch (field.key) {
          case 'name':
            value = product.name;
            break;
          case 'company':
            value = product.company;
            break;
          case 'description':
            value = product.description;
            break;
          case 'category':
            value = product.category;
            break;
          case 'certification':
            value = product.certification;
            break;
          case 'modality':
            value = product.modality;
            break;
          case 'anatomicalLocation':
            value = product.anatomicalLocation;
            break;
          case 'releaseDate':
            value = product.releaseDate;
            break;
          case 'lastUpdated':
            value = product.lastUpdated;
            break;
          case 'features':
            value = product.features;
            break;
          case 'keyFeatures':
            value = product.keyFeatures;
            break;
          case 'website':
            value = product.website || product.productUrl;
            break;
          case 'productUrl':
            value = product.productUrl;
            break;
          case 'diseaseTargeted':
            value = product.diseaseTargeted;
            break;
          case 'suggestedUse':
            value = product.suggestedUse;
            break;
          case 'clinicalEvidence':
            value = product.clinicalEvidence;
            break;
          default:
            value = product[field.key as keyof ProductDetails];
        }

        // Format the display value
        if (Array.isArray(value) && value.length > 0) {
          displayValue = value.join(', ');
        } else if (value !== null && value !== undefined && value !== '') {
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

  const handleExportComparison = async () => {
    const comparisonData = createComparisonData();
    
    try {
      if (exportFormat === 'excel') {
        exportComparisonToExcel(products, comparisonData);
      } else if (exportFormat === 'csv') {
        exportComparisonToCSV(products, comparisonData);
      } else if (exportFormat === 'pdf') {
        await exportComparisonToPDF(products, comparisonData);
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
                onChange={(e) => setExportFormat(e.target.value as 'excel' | 'csv' | 'pdf')}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
                <option value="pdf">PDF</option>
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