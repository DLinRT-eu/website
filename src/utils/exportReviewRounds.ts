import { supabase } from "@/integrations/supabase/client";
import { ALL_PRODUCTS } from "@/data";
import * as XLSX from 'xlsx';

export interface AssignmentExportData {
  roundName: string;
  roundNumber: number;
  productId: string;
  productName: string;
  productCategory: string;
  productCompany: string;
  reviewerName: string;
  reviewerEmail: string;
  matchScore: number;
  status: string;
  priority: string;
  assignedDate: string;
  deadline: string | null;
}

/**
 * Fetches all assignment data for a specific review round
 */
export async function fetchRoundAssignments(roundId: string): Promise<AssignmentExportData[]> {
  // Get round details
  const { data: round, error: roundError } = await supabase
    .from('review_rounds')
    .select('name, round_number')
    .eq('id', roundId)
    .single();

  if (roundError) throw roundError;

  // Get all product reviews for this round
  const { data: reviews, error: reviewsError } = await supabase
    .from('product_reviews')
    .select(`
      product_id,
      assigned_to,
      status,
      priority,
      deadline,
      assigned_at,
      profiles!product_reviews_assigned_to_fkey(first_name, last_name, email)
    `)
    .eq('review_round_id', roundId);

  if (reviewsError) throw reviewsError;

  // Get assignment history to find match scores
  const { data: history, error: historyError } = await supabase
    .from('assignment_history')
    .select('product_id, assigned_to')
    .eq('review_round_id', roundId)
    .eq('change_type', 'initial');

  if (historyError) throw historyError;

  // Build the export data
  const exportData: AssignmentExportData[] = reviews.map((review: any) => {
    const product = ALL_PRODUCTS.find(p => p.id === review.product_id);
    const reviewer = review.profiles;
    
    return {
      roundName: round.name,
      roundNumber: round.round_number,
      productId: review.product_id,
      productName: product?.name || 'Unknown Product',
      productCategory: product?.category || 'Unknown',
      productCompany: product?.company || 'Unknown',
      reviewerName: reviewer ? `${reviewer.first_name} ${reviewer.last_name}` : 'Unassigned',
      reviewerEmail: reviewer?.email || '',
      matchScore: 0, // We don't store match scores, but can be enhanced
      status: review.status,
      priority: review.priority,
      assignedDate: review.assigned_at ? new Date(review.assigned_at).toLocaleDateString() : '',
      deadline: review.deadline ? new Date(review.deadline).toLocaleDateString() : null
    };
  });

  return exportData;
}

/**
 * Fetches all assignments across all review rounds
 */
export async function fetchAllRoundAssignments(): Promise<AssignmentExportData[]> {
  // Get all rounds
  const { data: rounds, error: roundsError } = await supabase
    .from('review_rounds')
    .select('id, name, round_number')
    .order('round_number', { ascending: false });

  if (roundsError) throw roundsError;

  // Get all product reviews
  const { data: reviews, error: reviewsError } = await supabase
    .from('product_reviews')
    .select(`
      product_id,
      assigned_to,
      status,
      priority,
      deadline,
      assigned_at,
      review_round_id,
      profiles!product_reviews_assigned_to_fkey(first_name, last_name, email)
    `);

  if (reviewsError) throw reviewsError;

  // Build the export data
  const exportData: AssignmentExportData[] = reviews.map((review: any) => {
    const product = ALL_PRODUCTS.find(p => p.id === review.product_id);
    const reviewer = review.profiles;
    const round = rounds.find(r => r.id === review.review_round_id);
    
    return {
      roundName: round?.name || 'Unknown Round',
      roundNumber: round?.round_number || 0,
      productId: review.product_id,
      productName: product?.name || 'Unknown Product',
      productCategory: product?.category || 'Unknown',
      productCompany: product?.company || 'Unknown',
      reviewerName: reviewer ? `${reviewer.first_name} ${reviewer.last_name}` : 'Unassigned',
      reviewerEmail: reviewer?.email || '',
      matchScore: 0,
      status: review.status,
      priority: review.priority,
      assignedDate: review.assigned_at ? new Date(review.assigned_at).toLocaleDateString() : '',
      deadline: review.deadline ? new Date(review.deadline).toLocaleDateString() : null
    };
  });

  return exportData;
}

/**
 * Exports assignment data to CSV format
 */
export function exportToCSV(data: AssignmentExportData[], filename: string = 'review-assignments.csv') {
  if (data.length === 0) {
    throw new Error('No data to export');
  }

  // Create CSV headers
  const headers = [
    'Round Name',
    'Round Number',
    'Product ID',
    'Product Name',
    'Category',
    'Company',
    'Reviewer Name',
    'Reviewer Email',
    'Match Score',
    'Status',
    'Priority',
    'Assigned Date',
    'Deadline'
  ];

  // Create CSV rows
  const rows = data.map(item => [
    item.roundName,
    item.roundNumber,
    item.productId,
    item.productName,
    item.productCategory,
    item.productCompany,
    item.reviewerName,
    item.reviewerEmail,
    item.matchScore,
    item.status,
    item.priority,
    item.assignedDate,
    item.deadline || 'N/A'
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => {
      // Escape quotes and wrap in quotes if contains comma
      const cellStr = String(cell);
      if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
        return `"${cellStr.replace(/"/g, '""')}"`;
      }
      return cellStr;
    }).join(','))
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exports assignment data to Excel format
 */
export function exportToExcel(data: AssignmentExportData[], filename: string = 'review-assignments.xlsx') {
  if (data.length === 0) {
    throw new Error('No data to export');
  }

  // Prepare data for Excel
  const worksheetData = data.map(item => ({
    'Round Name': item.roundName,
    'Round Number': item.roundNumber,
    'Product ID': item.productId,
    'Product Name': item.productName,
    'Category': item.productCategory,
    'Company': item.productCompany,
    'Reviewer Name': item.reviewerName,
    'Reviewer Email': item.reviewerEmail,
    'Match Score': item.matchScore,
    'Status': item.status,
    'Priority': item.priority,
    'Assigned Date': item.assignedDate,
    'Deadline': item.deadline || 'N/A'
  }));

  // Create workbook and worksheet
  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Assignments');

  // Auto-size columns
  const maxWidth = 50;
  const columnWidths = Object.keys(worksheetData[0] || {}).map(key => {
    const maxLength = Math.max(
      key.length,
      ...worksheetData.map(row => String(row[key as keyof typeof row]).length)
    );
    return { wch: Math.min(maxLength + 2, maxWidth) };
  });
  worksheet['!cols'] = columnWidths;

  // Write file
  XLSX.writeFile(workbook, filename);
}
