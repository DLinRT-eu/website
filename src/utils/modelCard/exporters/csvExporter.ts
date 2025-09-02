
import { ProductDetails } from "@/types/productDetails";
import { generateModelCardData } from "../dataGenerator";
import { createSafeFileName } from "./shared";

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
      { Section: "Basic Information", Field: "Logo Source", Value: modelCard.contact.logoSource },
      { Section: "Basic Information", Field: "Category", Value: modelCard.basicInfo.category },
      { Section: "Basic Information", Field: "Secondary Categories", Value: modelCard.basicInfo.secondaryCategories },
      { Section: "Basic Information", Field: "Release Date", Value: modelCard.basicInfo.releaseDate },
      { Section: "Basic Information", Field: "Last Updated", Value: modelCard.basicInfo.lastUpdated },
      { Section: "Basic Information", Field: "CE Status", Value: modelCard.basicInfo.ceStatus },
      { Section: "Basic Information", Field: "FDA Status", Value: modelCard.basicInfo.fdaStatus },
      
      // Key Features
      { Section: "Key Features", Field: "Features Count", Value: modelCard.keyFeatures.count.toString() },
      ...modelCard.keyFeatures.features.map((feature, index) => ({
        Section: "Key Features",
        Field: `Feature ${index + 1}`,
        Value: feature
      })),
      
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
      { Section: "Contact Information", Field: "Logo Source", Value: modelCard.contact.logoSource },
      { Section: "Contact Information", Field: "Contact Email", Value: modelCard.contact.contactEmail },
      { Section: "Contact Information", Field: "Support Email", Value: modelCard.contact.supportEmail },
      
      // Quality Assurance
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
