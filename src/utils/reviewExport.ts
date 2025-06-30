
import { ProductDetails } from "@/types/productDetails";
import { validateProduct, ReviewCheck } from "@/utils/productReviewHelper";
import { getDaysSinceRevision, getUrgencyLevel } from "@/utils/revisionUtils";
import * as XLSX from 'xlsx';

interface ReviewExportData {
  productId: string;
  productName: string;
  company: string;
  category: string;
  status: 'critical' | 'warning' | 'ok';
  urgency: 'high' | 'medium' | 'low' | 'recent';
  daysSinceReview: number;
  criticalIssues: number;
  warnings: number;
  totalIssues: number;
  lastRevised: string;
  assignee: string;
  notes: string;
  issueDetails: string;
}

export const generateReviewExportData = (
  products: ProductDetails[],
  assignments: Record<string, string> = {}
): ReviewExportData[] => {
  return products.map(product => {
    const checks = validateProduct(product);
    const criticalIssues = checks.filter(c => c.status === 'fail' && c.severity === 'high').length;
    const warnings = checks.filter(c => c.status === 'warning' || (c.status === 'fail' && c.severity !== 'high')).length;
    const totalIssues = criticalIssues + warnings;
    
    const status = criticalIssues > 0 ? 'critical' : warnings > 0 ? 'warning' : 'ok';
    const urgency = getUrgencyLevel(product);
    const daysSinceReview = getDaysSinceRevision(product);
    
    // Create issue details summary
    const criticalDetails = checks
      .filter(c => c.status === 'fail' && c.severity === 'high')
      .map(c => `CRITICAL: ${c.field} - ${c.message}`)
      .join('; ');
    
    const warningDetails = checks
      .filter(c => c.status === 'warning' || (c.status === 'fail' && c.severity !== 'high'))
      .map(c => `WARNING: ${c.field} - ${c.message}`)
      .join('; ');
    
    const issueDetails = [criticalDetails, warningDetails].filter(Boolean).join(' | ');
    
    return {
      productId: product.id || '',
      productName: product.name,
      company: product.company,
      category: product.category,
      status,
      urgency,
      daysSinceReview,
      criticalIssues,
      warnings,
      totalIssues,
      lastRevised: product.lastRevised || '2000-01-01',
      assignee: assignments[product.id || ''] || 'Unassigned',
      notes: '',
      issueDetails: issueDetails || 'No issues found'
    };
  });
};

export const exportReviewToCSV = (
  products: ProductDetails[],
  assignments: Record<string, string> = {}
) => {
  const exportData = generateReviewExportData(products, assignments);
  
  const headers = [
    'Product ID',
    'Product Name',
    'Company',
    'Category',
    'Status',
    'Urgency',
    'Days Since Review',
    'Critical Issues',
    'Warnings',
    'Total Issues',
    'Last Revised',
    'Assignee',
    'Notes',
    'Issue Details'
  ];
  
  const csvData = exportData.map(row => [
    row.productId,
    row.productName,
    row.company,
    row.category,
    row.status,
    row.urgency,
    row.daysSinceReview.toString(),
    row.criticalIssues.toString(),
    row.warnings.toString(),
    row.totalIssues.toString(),
    row.lastRevised,
    row.assignee,
    row.notes,
    row.issueDetails
  ]);
  
  const csvContent = [
    headers.join(','),
    ...csvData.map(row => 
      row.map(cell => {
        const value = String(cell || '');
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', `product_review_export_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

export const exportReviewToExcel = (
  products: ProductDetails[],
  assignments: Record<string, string> = {}
) => {
  const exportData = generateReviewExportData(products, assignments);
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  
  // Main review data sheet
  const reviewSheet = XLSX.utils.json_to_sheet(exportData.map(row => ({
    'Product ID': row.productId,
    'Product Name': row.productName,
    'Company': row.company,
    'Category': row.category,
    'Status': row.status,
    'Urgency': row.urgency,
    'Days Since Review': row.daysSinceReview,
    'Critical Issues': row.criticalIssues,
    'Warnings': row.warnings,
    'Total Issues': row.totalIssues,
    'Last Revised': row.lastRevised,
    'Assignee': row.assignee,
    'Notes': row.notes,
    'Issue Details': row.issueDetails
  })));
  
  XLSX.utils.book_append_sheet(wb, reviewSheet, 'Product Review');
  
  // Summary sheet
  const totalProducts = exportData.length;
  const criticalProducts = exportData.filter(p => p.status === 'critical').length;
  const warningProducts = exportData.filter(p => p.status === 'warning').length;
  const okProducts = exportData.filter(p => p.status === 'ok').length;
  const unassignedProducts = exportData.filter(p => p.assignee === 'Unassigned').length;
  
  const summaryData = [
    { Metric: 'Total Products', Value: totalProducts },
    { Metric: 'Products with Critical Issues', Value: criticalProducts },
    { Metric: 'Products with Warnings', Value: warningProducts },
    { Metric: 'Products OK', Value: okProducts },
    { Metric: 'Unassigned Products', Value: unassignedProducts },
    { Metric: 'Export Date', Value: new Date().toISOString().split('T')[0] }
  ];
  
  const summarySheet = XLSX.utils.json_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');
  
  // Save the file
  const fileName = `product_review_export_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFileXLSX(wb, fileName);
};
