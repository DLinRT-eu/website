import { ProductDetails } from "@/types/productDetails";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

export interface ComparisonRow {
  field: string;
  [key: string]: any;
}

const createSafeFileName = (baseName: string, extension: string): string => {
  const cleanName = baseName.replace(/[^a-zA-Z0-9\s-_]/g, '').trim();
  const timestamp = new Date().toISOString().slice(0, 10);
  return `${cleanName}_${timestamp}.${extension}`;
};

export const exportComparisonToExcel = (products: ProductDetails[], comparisonData: ComparisonRow[]) => {
  try {
    const wb = XLSX.utils.book_new();
    
    // Create comparison sheet with products as columns
    const comparisonSheet = XLSX.utils.json_to_sheet(comparisonData);
    XLSX.utils.book_append_sheet(wb, comparisonSheet, "Product Comparison");
    
    // Create individual product details sheets
    products.forEach((product, index) => {
      const productData = [
        { Field: "Product Name", Value: product.name || "N/A" },
        { Field: "Company", Value: product.company || "N/A" },
        { Field: "Description", Value: product.description || "N/A" },
        { Field: "Category", Value: product.category || "N/A" },
        { Field: "Certification", Value: product.certification || "N/A" },
        { Field: "Modality", Value: Array.isArray(product.modality) ? product.modality.join(', ') : (product.modality || "N/A") },
        { Field: "Anatomical Location", Value: Array.isArray(product.anatomicalLocation) ? product.anatomicalLocation.join(', ') : (product.anatomicalLocation || "N/A") },
        { Field: "Release Date", Value: product.releaseDate || "N/A" },
        { Field: "Last Updated", Value: product.lastUpdated || "N/A" },
        { Field: "Key Features", Value: Array.isArray(product.features) ? product.features.join(', ') : (product.features || "N/A") },
        { Field: "Additional Features", Value: Array.isArray(product.keyFeatures) ? product.keyFeatures.join(', ') : (product.keyFeatures || "N/A") },
        { Field: "Website", Value: product.website || product.productUrl || "N/A" },
        { Field: "Product URL", Value: product.productUrl || "N/A" },
        { Field: "Disease Targeted", Value: Array.isArray(product.diseaseTargeted) ? product.diseaseTargeted.join(', ') : (product.diseaseTargeted || "N/A") },
        { Field: "Suggested Use", Value: product.suggestedUse || "N/A" },
        { Field: "Clinical Evidence", Value: product.clinicalEvidence || "N/A" },
      ];
      
      const productSheet = XLSX.utils.json_to_sheet(productData);
      const sheetName = `${product.name?.substring(0, 25) || 'Product'}_${index + 1}`;
      XLSX.utils.book_append_sheet(wb, productSheet, sheetName);
    });
    
    // Save the file
    const fileName = createSafeFileName(`Product_Comparison_${products.map(p => p.name).join('_vs_')}`, 'xlsx');
    XLSX.writeFileXLSX(wb, fileName);
  } catch (error) {
    console.error('Error exporting comparison to Excel:', error);
    throw new Error('Failed to export comparison to Excel format');
  }
};

export const exportComparisonToCSV = (products: ProductDetails[], comparisonData: ComparisonRow[]) => {
  try {
    // Convert comparison data to CSV format
    const headers = Object.keys(comparisonData[0] || {});
    
    const csvContent = [
      headers.join(","),
      ...comparisonData.map(row => 
        headers.map(header => {
          const value = String(row[header] || "");
          // Escape values that contain commas, quotes, or newlines
          if (value.includes(',') || value.includes('"') || value.includes('\n')) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(",")
      )
    ].join("\n");
    
    // Download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", createSafeFileName(`Product_Comparison_${products.map(p => p.name).join('_vs_')}`, 'csv'));
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting comparison to CSV:', error);
    throw new Error('Failed to export comparison to CSV format');
  }
};

export const exportComparisonToPDF = async (products: ProductDetails[], comparisonData: ComparisonRow[]) => {
  try {
    const doc = new jsPDF('landscape', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    
    let yPosition = margin;
    
    // Helper function to check if we need a new page
    const checkPageBreak = (requiredHeight: number) => {
      if (yPosition + requiredHeight > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };
    
    // Helper function to wrap text and return lines
    const wrapText = (text: string, maxWidth: number): string[] => {
      const words = text.split(' ');
      const lines: string[] = [];
      let currentLine = '';
      
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const lineWidth = doc.getTextWidth(testLine);
        
        if (lineWidth <= maxWidth) {
          currentLine = testLine;
        } else {
          if (currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            // Word is too long, split it
            lines.push(word);
          }
        }
      }
      
      if (currentLine) {
        lines.push(currentLine);
      }
      
      return lines;
    };
    
    // Helper function to load company logos
    const addLogo = async (logoUrl: string, x: number, y: number, width: number, height: number) => {
      try {
        const response = await fetch(logoUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        
        return new Promise<void>((resolve) => {
          reader.onload = () => {
            try {
              doc.addImage(reader.result as string, 'JPEG', x, y, width, height);
            } catch (error) {
              console.warn('Could not add logo:', error);
            }
            resolve();
          };
          reader.onerror = () => resolve();
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.warn('Could not load logo:', error);
      }
    };
    
    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Product Comparison Report', margin, yPosition);
    yPosition += 10;
    
    // Subtitle
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Comparing ${products.length} products`, margin, yPosition);
    yPosition += 15;
    
    // Calculate proper column width ensuring all columns fit
    const fieldColumnWidth = 50; // Fixed width for field column
    const availableWidth = contentWidth - fieldColumnWidth - 5; // 5mm gap
    const productColumnWidth = Math.floor(availableWidth / products.length);
    
    // Product headers with logos
    let xPosition = margin + fieldColumnWidth + 5;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const currentX = xPosition + (i * productColumnWidth);
      
      // Ensure logo doesn't go beyond page boundary
      const logoX = Math.min(currentX, pageWidth - margin - 20);
      
      // Add logo if available
      if (product.company) {
        const logoUrl = `/logos/${product.company.toLowerCase().replace(/\s+/g, '-')}.png`;
        try {
          await addLogo(logoUrl, logoX, yPosition - 5, 15, 10);
        } catch (error) {
          // Logo loading failed, continue without logo
        }
      }
      
      // Product name with text wrapping
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      const productNameLines = wrapText(product.name, productColumnWidth - 2);
      productNameLines.forEach((line, lineIndex) => {
        doc.text(line, currentX, yPosition + 8 + (lineIndex * 3));
      });
      
      // Company name
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      const companyNameLines = wrapText(product.company, productColumnWidth - 2);
      const companyStartY = yPosition + 8 + (productNameLines.length * 3) + 2;
      companyNameLines.forEach((line, lineIndex) => {
        doc.text(line, currentX, companyStartY + (lineIndex * 2.5));
      });
    }
    
    yPosition += Math.max(25, 8 + (3 * 3) + 5); // Dynamic spacing based on text
    
    // Table content
    doc.setFontSize(8);
    
    comparisonData.forEach((row) => {
      // Calculate max height needed for this row
      let maxRowHeight = 4;
      
      // Check field name height
      doc.setFont('helvetica', 'bold');
      const fieldLines = wrapText(row.field, fieldColumnWidth - 2);
      maxRowHeight = Math.max(maxRowHeight, fieldLines.length * 3);
      
      // Check product values height
      doc.setFont('helvetica', 'normal');
      for (let i = 0; i < products.length; i++) {
        const value = row[`product_${i}`] || 'N/A';
        const valueLines = wrapText(String(value), productColumnWidth - 2);
        maxRowHeight = Math.max(maxRowHeight, valueLines.length * 3);
      }
      
      checkPageBreak(maxRowHeight + 2);
      
      // Field name
      doc.setFont('helvetica', 'bold');
      fieldLines.forEach((line, lineIndex) => {
        doc.text(line, margin, yPosition + (lineIndex * 3));
      });
      
      // Values for each product
      doc.setFont('helvetica', 'normal');
      
      for (let i = 0; i < products.length; i++) {
        const value = row[`product_${i}`] || 'N/A';
        const currentX = margin + fieldColumnWidth + 5 + (i * productColumnWidth);
        
        const valueLines = wrapText(String(value), productColumnWidth - 2);
        valueLines.forEach((line, lineIndex) => {
          doc.text(line, currentX, yPosition + (lineIndex * 3));
        });
      }
      
      yPosition += maxRowHeight + 2;
      
      // Add separator line every 5 rows
      if (comparisonData.indexOf(row) % 5 === 4) {
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPosition + 1, pageWidth - margin, yPosition + 1);
        yPosition += 3;
      }
    });
    
    // Footer
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, pageHeight - 10);
      doc.text('DLinRT.eu Product Comparison', margin, pageHeight - 10);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, pageHeight - 5);
    }
    
    // Save the PDF
    const fileName = createSafeFileName(`Product_Comparison_${products.map(p => p.name).join('_vs_')}`, 'pdf');
    doc.save(fileName);
  } catch (error) {
    console.error('Error exporting comparison to PDF:', error);
    throw new Error('Failed to export comparison to PDF format');
  }
};