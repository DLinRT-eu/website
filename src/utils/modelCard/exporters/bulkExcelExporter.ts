import { ProductDetails } from "@/types/productDetails";
import * as XLSX from 'xlsx';
import { generateModelCardData } from "../dataGenerator";
import { createSafeFileName } from "./shared";

export const exportBulkProductsToExcel = (products: ProductDetails[]) => {
  try {
    const wb = XLSX.utils.book_new();
    
    // Summary Sheet
    const summaryData = products.map((product, index) => ({
      "#": index + 1,
      "Product Name": product.name,
      "Company": product.company,
      "Category": product.category,
      "CE Status": product.regulatory?.ce?.status || "N/A",
      "FDA Status": typeof product.regulatory?.fda === 'string' 
        ? product.regulatory.fda 
        : product.regulatory?.fda?.status || "N/A",
      "Last Updated": product.lastUpdated || "N/A",
      "Release Date": product.releaseDate || "N/A"
    }));
    
    const summarySheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summarySheet, "Products Summary");
    
    // Detailed comparison sheet
    const detailedData = products.map(product => {
      const modelCard = generateModelCardData(product);
      return {
        "Product Name": product.name,
        "Company": product.company,
        "Category": product.category,
        "Secondary Categories": modelCard.basicInfo.secondaryCategories,
        "Version": modelCard.basicInfo.version,
        "Release Date": modelCard.basicInfo.releaseDate,
        "Last Updated": modelCard.basicInfo.lastUpdated,
        "Description": modelCard.clinicalApplication.intendedUse,
        "Key Features": modelCard.keyFeatures.features.join("; "),
        "Target Anatomy": modelCard.clinicalApplication.targetAnatomy,
        "Disease Targeted": modelCard.clinicalApplication.diseaseTargeted,
        "Modality Support": modelCard.clinicalApplication.modalitySupport,
        "Input Formats": modelCard.technicalSpecs.inputFormats,
        "Output Formats": modelCard.technicalSpecs.outputFormats,
        "Processing Time": modelCard.technicalSpecs.processingTime,
        "Integration": modelCard.technicalSpecs.integration,
        "Deployment": modelCard.technicalSpecs.deployment,
        "CE Status": modelCard.basicInfo.ceStatus,
        "CE Details": modelCard.regulatory.ceDetails,
        "FDA Status": modelCard.basicInfo.fdaStatus,
        "FDA Details": modelCard.regulatory.fdaDetails,
        "Clinical Evidence": modelCard.clinicalApplication.clinicalEvidence,
        "Limitations": modelCard.performance.limitations,
        "Website": modelCard.contact.website,
        "Company URL": modelCard.contact.companyUrl,
        "Product URL": modelCard.contact.productUrl,
        "Supported Structures": modelCard.performance.supportedStructures
      };
    });
    
    const detailedSheet = XLSX.utils.json_to_sheet(detailedData);
    XLSX.utils.book_append_sheet(wb, detailedSheet, "Detailed Comparison");
    
    // Regulatory Details Sheet
    const regulatoryData = products.map(product => ({
      "Product Name": product.name,
      "Company": product.company,
      "CE Status": product.regulatory?.ce?.status || "N/A",
      "CE Class": product.regulatory?.ce?.class || "N/A",
      "CE Type": product.regulatory?.ce?.type || "N/A",
      "CE Certificate Number": product.regulatory?.ce?.certificateNumber || "N/A",
      "CE Regulation Number": product.regulatory?.ce?.regulation || "N/A",
      "FDA Status": typeof product.regulatory?.fda === 'string' 
        ? product.regulatory.fda 
        : product.regulatory?.fda?.status || "N/A",
      "FDA Class": typeof product.regulatory?.fda === 'object' && product.regulatory?.fda 
        ? product.regulatory.fda.class || "N/A" 
        : "N/A",
      "FDA Clearance Number": typeof product.regulatory?.fda === 'object' && product.regulatory?.fda 
        ? product.regulatory.fda.clearanceNumber || "N/A" 
        : "N/A",
      "FDA Regulation Number": typeof product.regulatory?.fda === 'object' && product.regulatory?.fda 
        ? product.regulatory.fda.regulationNumber || "N/A" 
        : "N/A",
      "FDA Product Code": typeof product.regulatory?.fda === 'object' && product.regulatory?.fda 
        ? product.regulatory.fda.productCode || "N/A" 
        : "N/A"
    }));
    
    const regulatorySheet = XLSX.utils.json_to_sheet(regulatoryData);
    XLSX.utils.book_append_sheet(wb, regulatorySheet, "Regulatory Details");
    
    // Save the file
    const fileName = createSafeFileName(`bulk-products-export-${products.length}`, 'xlsx');
    XLSX.writeFileXLSX(wb, fileName);
  } catch (error) {
    console.error('Error exporting bulk products to Excel:', error);
    throw new Error('Failed to export products to Excel format');
  }
};