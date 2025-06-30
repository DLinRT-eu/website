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
      { Field: "Company Revision Date", Value: modelCard.quality.companyRevisionDate },
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
      { Section: "Quality Assurance", Field: "Company Revision Date", Value: modelCard.quality.companyRevisionDate },
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
    const lightGray = [245, 245, 245]; // Light background
    
    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    // Helper function to add a section header matching webpage style
    const addSectionHeader = (title: string) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Add some spacing before section
      yPosition += 5;
      
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(margin, yPosition - 5, contentWidth, 14, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(title, margin + 8, yPosition + 5);
      yPosition += 22;
      doc.setTextColor(0, 0, 0);
    };
    
    // Helper function to add field-value pairs with card-like styling
    const addField = (label: string, value: string, isSubheading = false) => {
      if (yPosition > 265) {
        doc.addPage();
        yPosition = 20;
      }
      
      const safeLabel = String(label || '');
      const safeValue = String(value || 'N/A');
      
      if (isSubheading) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        doc.text(safeLabel, margin, yPosition);
        yPosition += 8;
        doc.setTextColor(0, 0, 0);
      } else {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(safeLabel + ':', margin + 5, yPosition);
        
        doc.setFont('helvetica', 'normal');
        const labelWidth = doc.getTextWidth(safeLabel + ': ') + 5;
        const maxWidth = contentWidth - labelWidth - 5;
        const lines = doc.splitTextToSize(safeValue, maxWidth);
        
        doc.text(lines, margin + labelWidth, yPosition);
        yPosition += Math.max(lines.length * 5, 6) + 4;
      }
    };
    
    // Helper function to add a list of items
    const addList = (items: string[], indent = 10) => {
      if (!items || items.length === 0) return;
      
      items.forEach(item => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text('• ' + item, margin + indent, yPosition);
        yPosition += 6;
      });
    };
    
    // Title header matching webpage
    doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.rect(0, 0, pageWidth, 35, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('AI Model Card', margin, 18);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(modelCard.basicInfo.productName, margin, 28);
    
    // Add company logo space (placeholder)
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - margin - 40, 15);
    doc.text(`Company: ${modelCard.basicInfo.company}`, pageWidth - margin - 40, 22);
    
    yPosition = 50;
    doc.setTextColor(0, 0, 0);
    
    // General Information Section (matching webpage)
    addSectionHeader('General Information');
    addField('Product Name', modelCard.basicInfo.productName);
    addField('Company', modelCard.basicInfo.company);
    addField('Version', modelCard.basicInfo.version);
    addField('Category', modelCard.basicInfo.category);
    if (modelCard.basicInfo.secondaryCategories !== "N/A") {
      addField('Secondary Categories', modelCard.basicInfo.secondaryCategories);
    }
    addField('Release Date', modelCard.basicInfo.releaseDate);
    addField('Last Updated', modelCard.basicInfo.lastUpdated);
    addField('Description', modelCard.clinicalApplication.intendedUse);
    
    // Product Features Section (if available)
    if (product.features && product.features.length > 0) {
      addSectionHeader('Product Features');
      addList(product.features);
    }
    
    // Technical Specifications Section
    addSectionHeader('Technical Specifications');
    addField('Input Formats', modelCard.technicalSpecs.inputFormats);
    addField('Output Formats', modelCard.technicalSpecs.outputFormats);
    addField('Processing Time', modelCard.technicalSpecs.processingTime);
    addField('Integration Options', modelCard.technicalSpecs.integration);
    addField('Deployment Options', modelCard.technicalSpecs.deployment);
    addField('Target Population', modelCard.technicalSpecs.population);
    addField('Modality Support', modelCard.clinicalApplication.modalitySupport);
    addField('Target Anatomy', modelCard.clinicalApplication.targetAnatomy);
    addField('Disease Targeted', modelCard.clinicalApplication.diseaseTargeted);
    
    // Supported Structures Section (for Auto-Contouring)
    if (modelCard.performance.supportedStructures !== "N/A") {
      addSectionHeader('Supported Structures');
      addField('Structures', modelCard.performance.supportedStructures);
    }
    
    // Evidence & Limitations Section
    addSectionHeader('Evidence & Limitations');
    addField('Clinical Evidence', modelCard.clinicalApplication.clinicalEvidence);
    addField('Performance Evidence', modelCard.performance.evidence);
    addField('Limitations', modelCard.performance.limitations);
    
    // Regulatory Information Section
    addSectionHeader('Regulatory Information');
    addField('CE Certification', modelCard.basicInfo.ceStatus);
    addField('CE Details', modelCard.regulatory.ceDetails);
    addField('FDA Status', modelCard.basicInfo.fdaStatus);
    addField('FDA Details', modelCard.regulatory.fdaDetails);
    addField('Intended Use Statement', modelCard.regulatory.intendedUseStatement);
    
    // Market Information Section
    addSectionHeader('Market Information');
    addField('Market Presence', modelCard.regulatory.marketPresence);
    if (product.market?.onMarketSince) {
      addField('On Market Since', product.market.onMarketSince);
    }
    if (product.market?.distributionChannels) {
      addField('Distribution Channels', product.market.distributionChannels.join('; '));
    }
    if (product.market?.payingCustomers) {
      addField('Paying Customers', product.market.payingCustomers);
    }
    
    // Pricing Information Section
    if (product.pricing) {
      addSectionHeader('Pricing Information');
      const pricingText = typeof product.pricing === 'string' 
        ? product.pricing 
        : `Model: ${Array.isArray(product.pricing.model) ? product.pricing.model.join('; ') : (product.pricing.model || 'N/A')}, Based on: ${Array.isArray(product.pricing.basedOn) ? product.pricing.basedOn.join('; ') : (product.pricing.basedOn || 'N/A')}`;
      addField('Pricing Model', pricingText);
    }
    
    // Contact Information Section
    addSectionHeader('Contact Information');
    addField('Website', modelCard.contact.website);
    addField('Company URL', modelCard.contact.companyUrl);
    addField('Product URL', modelCard.contact.productUrl);
    addField('Contact Email', modelCard.contact.contactEmail);
    addField('Support Email', modelCard.contact.supportEmail);
    if (product.contactPhone) {
      addField('Contact Phone', product.contactPhone);
    }
    
    // Quality Assurance Section
    addSectionHeader('Quality Assurance');
    addField('Last Verified', modelCard.quality.lastVerified);
    addField('Last Revised', modelCard.quality.lastRevised);
    addField('Company Revision Date', modelCard.quality.companyRevisionDate);
    addField('Source', modelCard.quality.source);
    addField('GitHub URL', modelCard.quality.githubUrl);
    
    // Footer on all pages
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, doc.internal.pageSize.height - 10);
      doc.text('DLinRT.eu Model Card', margin, doc.internal.pageSize.height - 10);
      doc.text(modelCard.basicInfo.productName, margin + 60, doc.internal.pageSize.height - 10);
    }
    
    // Save the PDF
    const fileName = createSafeFileName(product.name, 'pdf');
    doc.save(fileName);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw new Error('Failed to export to PDF format');
  }
};
