import React, { useState } from 'react';
import { ProductDetails } from '@/types/productDetails';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Download, ExternalLink } from 'lucide-react';
import { exportComparisonToExcel, exportComparisonToCSV } from '@/utils/comparison/comparisonExporter';
import { exportComparisonToPDF } from '@/utils/comparison/comparisonPdfExporter';
import StructuredDisplay from './StructuredDisplay';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  // Create comparison data structure
  const createComparisonData = (): ComparisonRow[] => {
    const fields = [
      { key: 'name', label: 'Product Name' },
      { key: 'company', label: 'Company' },
      { key: 'version', label: 'Version/Model' },
      { key: 'algorithm', label: 'Algorithm/Technology' },
      { key: 'description', label: 'Description' },
      { key: 'category', label: 'Category' },
      { key: 'secondaryCategories', label: 'Secondary Categories' },
      { key: 'certification', label: 'Certification' },
      { key: 'modality', label: 'Modality' },
      { key: 'anatomicalLocation', label: 'Anatomical Location' },
      { key: 'processingTime', label: 'Processing Time' },
      { key: 'guidelines', label: 'Guidelines Compliance' },
      { key: 'releaseDate', label: 'Release Date' },
      { key: 'lastUpdated', label: 'Last Updated' },
      { key: 'features', label: 'Key Features' },
      { key: 'keyFeatures', label: 'Additional Features' },
      { key: 'website', label: 'Website' },
      { key: 'productUrl', label: 'Product URL' },
      { key: 'diseaseTargeted', label: 'Disease Targeted' },
      { key: 'suggestedUse', label: 'Suggested Use' },
      { key: 'clinicalEvidence', label: 'Clinical Evidence' },
      { key: 'supportedStructures', label: 'Supported Structures' },
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
          case 'version':
            value = product.version;
            break;
          case 'algorithm':
            // Extract algorithm info from description or features
            const algoInfo = [];
            if (product.description?.toLowerCase().includes('deep learning')) algoInfo.push('Deep Learning');
            if (product.description?.toLowerCase().includes('machine learning')) algoInfo.push('Machine Learning');
            if (product.description?.toLowerCase().includes('ai')) algoInfo.push('Artificial Intelligence');
            if (product.description?.toLowerCase().includes('neural network')) algoInfo.push('Neural Network');
            if (product.description?.toLowerCase().includes('cnn') || product.description?.toLowerCase().includes('convolutional')) algoInfo.push('CNN');
            if (product.description?.toLowerCase().includes('u-net')) algoInfo.push('U-Net');
            if (product.technology?.integration) algoInfo.push(...product.technology.integration);
            value = algoInfo.length > 0 ? algoInfo.join(', ') : 'Not specified';
            break;
          case 'description':
            value = product.description;
            break;
          case 'category':
            value = product.category;
            break;
          case 'secondaryCategories':
            value = product.secondaryCategories;
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
          case 'processingTime':
            value = product.technology?.processingTime;
            break;
          case 'guidelines':
            value = product.guidelines?.map(g => `${g.name} (${g.compliance || 'Not specified'})`);
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
          case 'supportedStructures':
            if (Array.isArray(product.supportedStructures)) {
              if (typeof product.supportedStructures[0] === 'string') {
                value = product.supportedStructures;
              } else {
                value = product.supportedStructures.map((s: any) => s.name || s).filter(Boolean);
              }
            } else {
              value = product.supportedStructures;
            }
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

          if (field === 'Supported Structures' && value !== 'N/A') {
            // Get the original product data for structured display
            const originalProduct = products[index];
            if (originalProduct?.supportedStructures) {
              return <StructuredDisplay structures={originalProduct.supportedStructures} compact />;
            }
            return (
              <div className="max-w-xs">
                <div className="text-sm line-clamp-4">{value}</div>
              </div>
            );
          }

          if ((field === 'Key Features' || field === 'Additional Features') && value !== 'N/A') {
            return (
              <div className="max-w-xs">
                <div className="text-sm line-clamp-4">{value}</div>
              </div>
            );
          }

          if (field === 'Version/Model' && value !== 'N/A') {
            return <Badge variant="outline" className="font-mono">{value}</Badge>;
          }

          if (field === 'Algorithm/Technology' && value !== 'N/A') {
            return (
              <div className="max-w-xs">
                <div className="text-sm font-medium">{value}</div>
              </div>
            );
          }

          if (field === 'Guidelines Compliance' && value !== 'N/A') {
            return (
              <div className="max-w-xs space-y-1">
                {value.split(', ').map((guideline: string, idx: number) => (
                  <Badge key={idx} variant="secondary" className="text-xs block w-fit">
                    {guideline}
                  </Badge>
                ))}
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
      setIsExporting(true);
      if (exportFormat === 'excel') {
        exportComparisonToExcel(products, comparisonData);
        toast({
          title: "Export Successful",
          description: `Exported comparison of ${products.length} products to Excel`,
        });
      } else if (exportFormat === 'csv') {
        exportComparisonToCSV(products, comparisonData);
        toast({
          title: "Export Successful", 
          description: `Exported comparison of ${products.length} products to CSV`,
        });
      } else if (exportFormat === 'pdf') {
        await exportComparisonToPDF(products);
        toast({
          title: "Export Successful",
          description: `Exported comparison of ${products.length} products to PDF`,
        });
      }
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting the comparison",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
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
                disabled={isExporting}
              >
                <Download className="h-4 w-4" />
                {isExporting ? 'Exporting...' : 'Export'}
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