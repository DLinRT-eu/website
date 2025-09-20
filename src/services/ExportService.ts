import { ProductDetails } from "@/types/productDetails";
import { Initiative } from "@/types/initiative";
import { exportProductsToCSV } from "@/utils/exportProducts";
import { exportModelCardToExcel } from "@/utils/modelCard/exporters/excelExporter";
import { exportModelCardToPDF } from "@/utils/modelCard/exporters/pdfExporter";
import { exportModelCardToJSON } from "@/utils/modelCard/exporters/jsonExporter";
import { exportBulkProductsToExcel } from "@/utils/modelCard/exporters/bulkExcelExporter";
import { exportBulkProductsToPDF } from "@/utils/modelCard/exporters/bulkPdfExporter";
import { exportBulkProductsToJSON } from "@/utils/modelCard/exporters/bulkJsonExporter";

export type ExportFormat = "csv" | "excel" | "pdf" | "json";
export type ExportType = "products" | "initiatives" | "comparison" | "analytics";

interface ExportOptions {
  filename?: string;
  includeMetadata?: boolean;
  fields?: string[];
}

class ExportService {
  /**
   * Export products in various formats
   */
  async exportProducts(
    products: ProductDetails[], 
    format: ExportFormat, 
    options: ExportOptions = {}
  ): Promise<void> {
    const filename = options.filename || `products-export-${Date.now()}`;
    
    if (products.length === 0) {
      throw new Error('No products to export');
    }
    
    switch (format) {
      case "csv":
        exportProductsToCSV(products);
        break;
      case "excel":
        if (products.length === 1) {
          exportModelCardToExcel(products[0]);
        } else {
          exportBulkProductsToExcel(products);
        }
        break;
      case "pdf":
        if (products.length === 1) {
          exportModelCardToPDF(products[0]);
        } else {
          await exportBulkProductsToPDF(products);
        }
        break;
      case "json":
        if (products.length === 1) {
          exportModelCardToJSON(products[0]);
        } else {
          exportBulkProductsToJSON(products);
        }
        break;
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  /**
   * Export initiatives in various formats
   */
  async exportInitiatives(
    initiatives: Initiative[],
    format: ExportFormat,
    options: ExportOptions = {}
  ): Promise<void> {
    const filename = options.filename || `initiatives-export-${Date.now()}`;
    
    // Transform initiatives to a format suitable for export
    const exportData = initiatives.map(initiative => ({
      id: initiative.id,
      name: initiative.name,
      organization: initiative.organization,
      category: initiative.category,
      status: initiative.status,
      description: initiative.description,
      startDate: initiative.startDate,
      endDate: initiative.endDate,
      tags: initiative.tags?.join(', ') || '',
      website: initiative.website || ''
    }));

    switch (format) {
      case "csv":
        this.exportToCSV(exportData, filename);
        break;
      case "json":
        this.downloadJSON(exportData, filename);
        break;
      default:
        throw new Error(`Format ${format} not supported for initiatives export`);
    }
  }

  /**
   * Generic CSV export helper
   */
  private exportToCSV(data: any[], filename: string): void {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') 
            ? `"${value.replace(/"/g, '""')}"` 
            : value;
        }).join(',')
      )
    ].join('\n');

    this.downloadFile(csvContent, `${filename}.csv`, 'text/csv');
  }

  /**
   * Generic JSON export helper
   */
  private downloadJSON(data: any, filename: string): void {
    const jsonContent = JSON.stringify(data, null, 2);
    this.downloadFile(jsonContent, `${filename}.json`, 'application/json');
  }

  /**
   * Generic file download helper
   */
  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Bulk export multiple datasets
   */
  async bulkExport(
    exports: Array<{
      data: any[];
      type: ExportType;
      format: ExportFormat;
      filename?: string;
    }>
  ): Promise<void> {
    const promises = exports.map(({ data, type, format, filename }) => {
      switch (type) {
        case "products":
          return this.exportProducts(data as ProductDetails[], format, { filename });
        case "initiatives":
          return this.exportInitiatives(data as Initiative[], format, { filename });
        default:
          throw new Error(`Unsupported export type: ${type}`);
      }
    });

    await Promise.all(promises);
  }
}

export default new ExportService();