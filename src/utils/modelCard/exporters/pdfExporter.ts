import { ProductDetails } from "@/types/productDetails";
import jsPDF from 'jspdf';
import { generateModelCardData } from "../dataGenerator";
import { createSafeFileName } from "./shared";

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
      if (yPosition > 260) {
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
        yPosition += 10; // Increased spacing for subheadings
        doc.setTextColor(0, 0, 0);
      } else {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        
        // Add proper spacing after colon and before value
        const labelText = safeLabel + ':  '; // Added extra space after colon
        doc.text(labelText, margin + 5, yPosition);
        
        doc.setFont('helvetica', 'normal');
        const labelWidth = doc.getTextWidth(labelText) + 8; // Add safety margin
        const minSpacing = 10; // Minimum spacing between label and value
        const actualLabelWidth = Math.max(labelWidth, minSpacing);
        const maxWidth = contentWidth - actualLabelWidth - 10; // Added safety margin
        
        // Ensure we have enough width for the value text
        if (maxWidth > 30) {
          const lines = doc.splitTextToSize(safeValue, maxWidth);
          doc.text(lines, margin + actualLabelWidth, yPosition);
          
          // Improved line height calculation
          const lineHeight = 6; // Increased from 5
          const additionalSpacing = 3; // Extra spacing between fields
          yPosition += Math.max(lines.length * lineHeight, 8) + additionalSpacing;
        } else {
          // If label is too long, put value on next line
          yPosition += 8;
          const lines = doc.splitTextToSize(safeValue, contentWidth - 15);
          doc.text(lines, margin + 10, yPosition);
          yPosition += lines.length * 6 + 3;
        }
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
