
import { ProductDetails } from "@/types/productDetails";
import * as XLSX from 'xlsx';
import { generateModelCardData } from "../dataGenerator";
import { createSafeFileName } from "./shared";

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
    
    // Guidelines Compliance Sheet
    const guidelinesSheet = XLSX.utils.json_to_sheet([
      { Field: "Compliance Summary", Value: modelCard.guidelines.compliance },
      { Field: "Guidelines Details", Value: modelCard.guidelines.details },
    ]);
    XLSX.utils.book_append_sheet(wb, guidelinesSheet, "Guidelines");
    
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
