
import { ProductDetails } from "@/types/productDetails";
import * as XLSX from 'xlsx';
import { generateModelCardData } from "./dataGenerator";

export const exportModelCardToExcel = (product: ProductDetails) => {
  const modelCard = generateModelCardData(product);
  
  // Create workbook with multiple sheets
  const wb = XLSX.utils.book_new();
  
  // Basic Information Sheet
  const basicInfoSheet = XLSX.utils.json_to_sheet([
    { Field: "Product Name", Value: modelCard.basicInfo.productName },
    { Field: "Version", Value: modelCard.basicInfo.version },
    { Field: "Company", Value: modelCard.basicInfo.company },
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
  const fileName = `${product.name.replace(/[^a-zA-Z0-9]/g, '_')}_ModelCard.xlsx`;
  XLSX.writeFileXLSX(wb, fileName);
};

export const exportModelCardToCSV = (product: ProductDetails) => {
  const modelCard = generateModelCardData(product);
  
  // Flatten all data into a single CSV structure
  const csvData = [
    // Basic Information
    { Section: "Basic Information", Field: "Product Name", Value: modelCard.basicInfo.productName },
    { Section: "Basic Information", Field: "Version", Value: modelCard.basicInfo.version },
    { Section: "Basic Information", Field: "Company", Value: modelCard.basicInfo.company },
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
        const value = row[header as keyof typeof row] || "";
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
  a.setAttribute("download", `${product.name.replace(/[^a-zA-Z0-9]/g, '_')}_ModelCard.csv`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

export const exportModelCardToJSON = (product: ProductDetails) => {
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
  a.setAttribute("download", `${product.name.replace(/[^a-zA-Z0-9]/g, '_')}_ModelCard.json`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
