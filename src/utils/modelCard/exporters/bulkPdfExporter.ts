import { ProductDetails } from "@/types/productDetails";
import jsPDF from 'jspdf';
import { generateModelCardData } from "../dataGenerator";
import { createSafeFileName } from "./shared";

export const exportBulkProductsToPDF = async (products: ProductDetails[]) => {
  try {
    const doc = new jsPDF();
    
    // Set up colors and styling
    const primaryColor = [41, 128, 185]; // Blue
    const secondaryColor = [52, 73, 94]; // Dark gray
    
    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    // Helper function to check page break and add new page if needed
    const checkPageBreak = (requiredHeight = 20) => {
      if (yPosition + requiredHeight > 270) {
        doc.addPage();
        yPosition = 20;
      }
    };
    
    // Helper function to add section header
    const addSectionHeader = (title: string) => {
      checkPageBreak(25);
      
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(margin, yPosition - 5, contentWidth, 14, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(title, margin + 8, yPosition + 5);
      yPosition += 22;
      doc.setTextColor(0, 0, 0);
    };
    
    // Helper function to add field-value pairs
    const addField = (label: string, value: string) => {
      checkPageBreak(12);
      
      const safeLabel = String(label || '');
      const safeValue = String(value || 'N/A');
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      const labelText = safeLabel + ':  ';
      doc.text(labelText, margin + 5, yPosition);
      
      doc.setFont('helvetica', 'normal');
      const labelWidth = doc.getTextWidth(labelText) + 8;
      const maxWidth = contentWidth - labelWidth - 10;
      
      if (maxWidth > 30) {
        const lines = doc.splitTextToSize(safeValue, maxWidth);
        doc.text(lines, margin + labelWidth, yPosition);
        yPosition += Math.max(lines.length * 6, 8) + 3;
      } else {
        yPosition += 8;
        const lines = doc.splitTextToSize(safeValue, contentWidth - 15);
        doc.text(lines, margin + 10, yPosition);
        yPosition += lines.length * 6 + 3;
      }
    };
    
    // Title page
    doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.rect(0, 0, pageWidth, 50, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Product Catalog', margin, 25);
    doc.setFontSize(16);
    doc.text(`${products.length} Products`, margin, 40);
    
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - margin - 60, 25);
    doc.text('DLinRT.eu Database', pageWidth - margin - 60, 35);
    
    yPosition = 70;
    doc.setTextColor(0, 0, 0);
    
    // Table of Contents
    addSectionHeader('Table of Contents');
    products.forEach((product, index) => {
      checkPageBreak(8);
      doc.setFontSize(10);
      doc.text(`${index + 1}. ${product.name} (${product.company})`, margin + 5, yPosition);
      yPosition += 8;
    });
    
    // Add each product
    products.forEach((product, index) => {
      doc.addPage();
      yPosition = 20;
      
      const modelCard = generateModelCardData(product);
      
      // Product header
      doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.rect(0, 0, pageWidth, 35, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${product.name}`, margin, 18);
      doc.setFontSize(12);
      doc.text(product.company, margin, 28);
      
      yPosition = 50;
      doc.setTextColor(0, 0, 0);
      
      // General Information
      addSectionHeader('General Information');
      addField('Product Name', product.name);
      addField('Company', product.company);
      addField('Category', product.category);
      addField('Version', modelCard.basicInfo.version);
      addField('Release Date', modelCard.basicInfo.releaseDate);
      addField('Last Updated', modelCard.basicInfo.lastUpdated);
      addField('Description', modelCard.clinicalApplication.intendedUse);
      
      // Key Features
      if (modelCard.keyFeatures.features.length > 0) {
        addSectionHeader('Key Features');
        modelCard.keyFeatures.features.forEach(feature => {
          checkPageBreak(8);
          doc.setFontSize(9);
          doc.text('• ' + feature, margin + 10, yPosition);
          yPosition += 6;
        });
      }
      
      // Technical Specifications
      addSectionHeader('Technical Specifications');
      addField('Input Formats', modelCard.technicalSpecs.inputFormats);
      addField('Output Formats', modelCard.technicalSpecs.outputFormats);
      addField('Processing Time', modelCard.technicalSpecs.processingTime);
      addField('Integration', modelCard.technicalSpecs.integration);
      addField('Deployment', modelCard.technicalSpecs.deployment);
      addField('Modality Support', modelCard.clinicalApplication.modalitySupport);
      
      // Regulatory Information
      addSectionHeader('Regulatory Information');
      addField('CE Status', modelCard.basicInfo.ceStatus);
      addField('FDA Status', modelCard.basicInfo.fdaStatus);
      addField('CE Details', modelCard.regulatory.ceDetails);
      addField('FDA Details', modelCard.regulatory.fdaDetails);
      
      // Contact Information
      addSectionHeader('Contact Information');
      addField('Website', modelCard.contact.website);
      addField('Product URL', modelCard.contact.productUrl);
      addField('Company URL', modelCard.contact.companyUrl);
    });
    
    // Add page numbers to all pages
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, doc.internal.pageSize.height - 10);
      doc.text('DLinRT.eu Product Catalog', margin, doc.internal.pageSize.height - 10);
    }
    
    // Save the PDF
    const fileName = createSafeFileName(`bulk-products-catalog-${products.length}`, 'pdf');
    doc.save(fileName);
  } catch (error) {
    console.error('Error exporting bulk products to PDF:', error);
    throw new Error('Failed to export products to PDF format');
  }
};