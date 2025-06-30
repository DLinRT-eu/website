import { ProductDetails } from "@/types/productDetails";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { generateModelCardData } from "./dataGenerator";

// Helper function to safely create filenames
const createSafeFileName = (productName: string, extension: string): string => {
  const safeName = productName.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '_');
  return `${safeName}_ModelCard.${extension}`;
};

export const exportModelCardToExcel = (product: ProductDetails) => {
  try {
    const modelCard = generateModelCardData(product);
    
    // Create workbook with multiple sheets
    const wb = XLSX.utils.book_new();
    
    // Basic Information Sheet
    const basicInfoSheet = XLSX.utils.json_to_sheet([
      { Field: "Product Name", Value: modelCard.basicInfo.productName },
      { Field: "Version", Value: modelCard.basicInfo.version },
      { Field: "Company", Value: modelCard.basicInfo.company },
      { Field: "Company URL", Value: modelCard.contact.companyUrl },
      { Field: "Product URL", Value: modelCard.contact.productUrl },
      { Field: "Logo URL", Value: modelCard.contact.logoUrl },
      { Field: "Category", Value: modelCard.basicInfo.category },
      { Field: "Secondary Categories", Value: modelCard.basicInfo.secondaryCategories },
      { Field: "Release Date", Value: modelCard.basicInfo.releaseDate },
      { Field: "Last Updated", Value: modelCard.basicInfo.lastUpdated },
      { Field: "CE Status", Value: modelCard.basicInfo.ceStatus },
      { Field: "FDA Status", Value: modelCard.basicInfo.fdaStatus },
    ]);
    XLSX.utils.book_append_sheet(wb, basicInfoSheet, "Basic Information");
    
    // Clinical Application Sheet
    const clinicalSheet = XLSX.utils.json_to_sheet([
      { Field: "Intended Use", Value: modelCard.clinicalApplication.intendedUse },
      { Field: "Target Anatomy", Value: modelCard.clinicalApplication.targetAnatomy },
      { Field: "Disease Targeted", Value: modelCard.clinicalApplication.diseaseTargeted },
      { Field: "Modality Support", Value: modelCard.clinicalApplication.modalitySupport },
      { Field: "Clinical Evidence", Value: modelCard.clinicalApplication.clinicalEvidence },
    ]);
    XLSX.utils.book_append_sheet(wb, clinicalSheet, "Clinical Application");
    
    // Technical Specifications Sheet
    const technicalSheet = XLSX.utils.json_to_sheet([
      { Field: "Input Formats", Value: modelCard.technicalSpecs.inputFormats },
      { Field: "Output Formats", Value: modelCard.technicalSpecs.outputFormats },
      { Field: "Processing Time", Value: modelCard.technicalSpecs.processingTime },
      { Field: "Integration", Value: modelCard.technicalSpecs.integration },
      { Field: "Deployment", Value: modelCard.technicalSpecs.deployment },
      { Field: "Population", Value: modelCard.technicalSpecs.population },
    ]);
    XLSX.utils.book_append_sheet(wb, technicalSheet, "Technical Specs");
    
    // Performance & Validation Sheet
    const performanceSheet = XLSX.utils.json_to_sheet([
      { Field: "Supported Structures", Value: modelCard.performance.supportedStructures },
      { Field: "Limitations", Value: modelCard.performance.limitations },
      { Field: "Evidence", Value: modelCard.performance.evidence },
    ]);
    XLSX.utils.book_append_sheet(wb, performanceSheet, "Performance");
    
    // Regulatory & Market Sheet
    const regulatorySheet = XLSX.utils.json_to_sheet([
      { Field: "CE Details", Value: modelCard.regulatory.ceDetails },
      { Field: "FDA Details", Value: modelCard.regulatory.fdaDetails },
      { Field: "Intended Use Statement", Value: modelCard.regulatory.intendedUseStatement },
      { Field: "Market Presence", Value: modelCard.regulatory.marketPresence },
    ]);
    XLSX.utils.book_append_sheet(wb, regulatorySheet, "Regulatory & Market");
    
    // Contact Information Sheet
    const contactSheet = XLSX.utils.json_to_sheet([
      { Field: "Website", Value: modelCard.contact.website },
      { Field: "Company URL", Value: modelCard.contact.companyUrl },
      { Field: "Product URL", Value: modelCard.contact.productUrl },
      { Field: "Logo URL", Value: modelCard.contact.logoUrl },
      { Field: "Contact Email", Value: modelCard.contact.contactEmail },
      { Field: "Support Email", Value: modelCard.contact.supportEmail },
    ]);
    XLSX.utils.book_append_sheet(wb, contactSheet, "Contact Information");
    
    // Quality Assurance Sheet
    const qualitySheet = XLSX.utils.json_to_sheet([
      { Field: "Last Verified", Value: modelCard.quality.lastVerified },
      { Field: "Last Revised", Value: modelCard.quality.lastRevised },
      { Field: "Source", Value: modelCard.quality.source },
      { Field: "GitHub URL", Value: modelCard.quality.githubUrl },
    ]);
    XLSX.utils.book_append_sheet(wb, qualitySheet, "Quality Assurance");
    
    // Save the file
    const fileName = createSafeFileName(product.name, 'xlsx');
    XLSX.writeFileXLSX(wb, fileName);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw new Error('Failed to export to Excel format');
  }
};

export const exportModelCardToCSV = (product: ProductDetails) => {
  try {
    const modelCard = generateModelCardData(product);
    
    // Flatten all data into a single CSV structure
    const csvData = [
      // Basic Information
      { Section: "Basic Information", Field: "Product Name", Value: modelCard.basicInfo.productName },
      { Section: "Basic Information", Field: "Version", Value: modelCard.basicInfo.version },
      { Section: "Basic Information", Field: "Company", Value: modelCard.basicInfo.company },
      { Section: "Basic Information", Field: "Company URL", Value: modelCard.contact.companyUrl },
      { Section: "Basic Information", Field: "Product URL", Value: modelCard.contact.productUrl },
      { Section: "Basic Information", Field: "Logo URL", Value: modelCard.contact.logoUrl },
      { Section: "Basic Information", Field: "Category", Value: modelCard.basicInfo.category },
      { Section: "Basic Information", Field: "Secondary Categories", Value: modelCard.basicInfo.secondaryCategories },
      { Section: "Basic Information", Field: "Release Date", Value: modelCard.basicInfo.releaseDate },
      { Section: "Basic Information", Field: "Last Updated", Value: modelCard.basicInfo.lastUpdated },
      { Section: "Basic Information", Field: "CE Status", Value: modelCard.basicInfo.ceStatus },
      { Section: "Basic Information", Field: "FDA Status", Value: modelCard.basicInfo.fdaStatus },
      
      // Clinical Application
      { Section: "Clinical Application", Field: "Intended Use", Value: modelCard.clinicalApplication.intendedUse },
      { Section: "Clinical Application", Field: "Target Anatomy", Value: modelCard.clinicalApplication.targetAnatomy },
      { Section: "Clinical Application", Field: "Disease Targeted", Value: modelCard.clinicalApplication.diseaseTargeted },
      { Section: "Clinical Application", Field: "Modality Support", Value: modelCard.clinicalApplication.modalitySupport },
      { Section: "Clinical Application", Field: "Clinical Evidence", Value: modelCard.clinicalApplication.clinicalEvidence },
      
      // Technical Specifications
      { Section: "Technical Specifications", Field: "Input Formats", Value: modelCard.technicalSpecs.inputFormats },
      { Section: "Technical Specifications", Field: "Output Formats", Value: modelCard.technicalSpecs.outputFormats },
      { Section: "Technical Specifications", Field: "Processing Time", Value: modelCard.technicalSpecs.processingTime },
      { Section: "Technical Specifications", Field: "Integration", Value: modelCard.technicalSpecs.integration },
      { Section: "Technical Specifications", Field: "Deployment", Value: modelCard.technicalSpecs.deployment },
      { Section: "Technical Specifications", Field: "Population", Value: modelCard.technicalSpecs.population },
      
      // Performance & Validation
      { Section: "Performance & Validation", Field: "Supported Structures", Value: modelCard.performance.supportedStructures },
      { Section: "Performance & Validation", Field: "Limitations", Value: modelCard.performance.limitations },
      { Section: "Performance & Validation", Field: "Evidence", Value: modelCard.performance.evidence },
      
      // Regulatory & Market
      { Section: "Regulatory & Market", Field: "CE Details", Value: modelCard.regulatory.ceDetails },
      { Section: "Regulatory & Market", Field: "FDA Details", Value: modelCard.regulatory.fdaDetails },
      { Section: "Regulatory & Market", Field: "Intended Use Statement", Value: modelCard.regulatory.intendedUseStatement },
      { Section: "Regulatory & Market", Field: "Market Presence", Value: modelCard.regulatory.marketPresence },
      
      // Contact Information
      { Section: "Contact Information", Field: "Website", Value: modelCard.contact.website },
      { Section: "Contact Information", Field: "Company URL", Value: modelCard.contact.companyUrl },
      { Section: "Contact Information", Field: "Product URL", Value: modelCard.contact.productUrl },
      { Section: "Contact Information", Field: "Logo URL", Value: modelCard.contact.logoUrl },
      { Section: "Contact Information", Field: "Contact Email", Value: modelCard.contact.contactEmail },
      { Section: "Contact Information", Field: "Support Email", Value: modelCard.contact.supportEmail },
      
      // Quality Assurance
      { Section: "Quality Assurance", Field: "Last Verified", Value: modelCard.quality.lastVerified },
      { Section: "Quality Assurance", Field: "Last Revised", Value: modelCard.quality.lastRevised },
      { Section: "Quality Assurance", Field: "Source", Value: modelCard.quality.source },
      { Section: "Quality Assurance", Field: "GitHub URL", Value: modelCard.quality.githubUrl },
    ];
    
    // Convert to CSV
    const headers = ["Section", "Field", "Value"];
    const csvContent = [
      headers.join(","),
      ...csvData.map(row => 
        headers.map(header => {
          const value = String(row[header as keyof typeof row] || "");
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
    a.setAttribute("download", createSafeFileName(product.name, 'csv'));
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    throw new Error('Failed to export to CSV format');
  }
};

export const exportModelCardToJSON = (product: ProductDetails) => {
  try {
    const modelCard = generateModelCardData(product);
    
    const jsonContent = JSON.stringify({
      productId: product.id,
      exportDate: new Date().toISOString(),
      modelCard: modelCard
    }, null, 2);
    
    const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", createSafeFileName(product.name, 'json'));
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting to JSON:', error);
    throw new Error('Failed to export to JSON format');
  }
};

export const exportModelCardToPDF = (product: ProductDetails) => {
  try {
    const modelCard = generateModelCardData(product);
    const doc = new jsPDF();
    
    // Set up colors and styling
    const primaryColor = [41, 128, 185]; // Blue
    const secondaryColor = [52, 73, 94]; // Dark gray
    
    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    // Helper function to add a section header
    const addSectionHeader = (title: string) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(margin, yPosition - 5, contentWidth, 12, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(title, margin + 5, yPosition + 3);
      yPosition += 20;
      doc.setTextColor(0, 0, 0);
    };
    
    // Helper function to add field-value pairs with improved spacing
    const addField = (label: string, value: string) => {
      if (yPosition > 265) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Ensure we have valid strings
      const safeLabel = String(label || '');
      const safeValue = String(value || 'N/A');
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(safeLabel + ':', margin, yPosition);
      
      doc.setFont('helvetica', 'normal');
      const labelWidth = doc.getTextWidth(safeLabel + ': ');
      const maxWidth = contentWidth - labelWidth;
      const lines = doc.splitTextToSize(safeValue, maxWidth);
      
      doc.text(lines, margin + labelWidth, yPosition);
      yPosition += Math.max(lines.length * 5, 6) + 3; // Better spacing between items
    };
    
    // Title and header
    doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.rect(0, 0, pageWidth, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('AI Model Card', margin, 20);
    doc.setFontSize(12);
    doc.text(modelCard.basicInfo.productName, margin, 25);
    
    yPosition = 45;
    doc.setTextColor(0, 0, 0);
    
    // Add export timestamp
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth - margin - 40, 15);
    
    // Basic Information Section
    addSectionHeader('Basic Information');
    addField('Product Name', modelCard.basicInfo.productName);
    addField('Version', modelCard.basicInfo.version);
    addField('Company', modelCard.basicInfo.company);
    addField('Company URL', modelCard.contact.companyUrl);
    addField('Product URL', modelCard.contact.productUrl);
    addField('Logo URL', modelCard.contact.logoUrl);
    addField('Category', modelCard.basicInfo.category);
    addField('Secondary Categories', modelCard.basicInfo.secondaryCategories);
    addField('Release Date', modelCard.basicInfo.releaseDate);
    addField('Last Updated', modelCard.basicInfo.lastUpdated);
    addField('CE Status', modelCard.basicInfo.ceStatus);
    addField('FDA Status', modelCard.basicInfo.fdaStatus);
    
    // Clinical Application Section
    addSectionHeader('Clinical Application');
    addField('Intended Use', modelCard.clinicalApplication.intendedUse);
    addField('Target Anatomy', modelCard.clinicalApplication.targetAnatomy);
    addField('Disease Targeted', modelCard.clinicalApplication.diseaseTargeted);
    addField('Modality Support', modelCard.clinicalApplication.modalitySupport);
    addField('Clinical Evidence', modelCard.clinicalApplication.clinicalEvidence);
    
    // Technical Specifications Section
    addSectionHeader('Technical Specifications');
    addField('Input Formats', modelCard.technicalSpecs.inputFormats);
    addField('Output Formats', modelCard.technicalSpecs.outputFormats);
    addField('Processing Time', modelCard.technicalSpecs.processingTime);
    addField('Integration', modelCard.technicalSpecs.integration);
    addField('Deployment', modelCard.technicalSpecs.deployment);
    addField('Population', modelCard.technicalSpecs.population);
    
    // Performance & Validation Section
    addSectionHeader('Performance & Validation');
    addField('Supported Structures', modelCard.performance.supportedStructures);
    addField('Limitations', modelCard.performance.limitations);
    addField('Evidence', modelCard.performance.evidence);
    
    // Regulatory & Market Section
    addSectionHeader('Regulatory & Market Information');
    addField('CE Details', modelCard.regulatory.ceDetails);
    addField('FDA Details', modelCard.regulatory.fdaDetails);
    addField('Intended Use Statement', modelCard.regulatory.intendedUseStatement);
    addField('Market Presence', modelCard.regulatory.marketPresence);
    
    // Contact Information Section
    addSectionHeader('Contact Information');
    addField('Website', modelCard.contact.website);
    addField('Company URL', modelCard.contact.companyUrl);
    addField('Product URL', modelCard.contact.productUrl);
    addField('Logo URL', modelCard.contact.logoUrl);
    addField('Contact Email', modelCard.contact.contactEmail);
    addField('Support Email', modelCard.contact.supportEmail);
    
    // Quality Assurance Section
    addSectionHeader('Quality Assurance');
    addField('Last Verified', modelCard.quality.lastVerified);
    addField('Last Revised', modelCard.quality.lastRevised);
    addField('Source', modelCard.quality.source);
    addField('GitHub URL', modelCard.quality.githubUrl);
    
    // Footer on last page
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, doc.internal.pageSize.height - 10);
      doc.text('DLinRT.eu Model Card', margin, doc.internal.pageSize.height - 10);
    }
    
    // Save the PDF
    const fileName = createSafeFileName(product.name, 'pdf');
    doc.save(fileName);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw new Error('Failed to export to PDF format');
  }
};
