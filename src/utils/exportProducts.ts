
import { Product } from "@/types/product";

/**
 * Escapes a value for CSV format according to RFC 4180:
 * - Wraps values with commas in quotes
 * - Escapes quotes by doubling them
 * - Handles arrays by joining with semicolons instead of commas
 */
const escapeValueForCsv = (value: any): string => {
  if (value === undefined || value === null) {
    return "";
  }

  // Convert to string if not already
  let stringValue = String(value);
  
  // For arrays, join with semicolons to avoid CSV column confusion
  if (Array.isArray(value)) {
    stringValue = value.map(item => String(item).trim()).join("; ");
  }

  // Check if the value needs to be quoted (contains commas, quotes, or newlines)
  const needsQuoting = /[",\n\r]/.test(stringValue);
  
  // If it contains quotes, escape them by doubling them
  if (stringValue.includes('"')) {
    stringValue = stringValue.replace(/"/g, '""');
  }
  
  // Return the properly formatted value
  return needsQuoting ? `"${stringValue}"` : stringValue;
};

export const exportProductsToCSV = (products: Product[]) => {
  // Define all possible headers to ensure consistent columns
  const headers = [
    "Name", "Company", "Category", "Description", "Features",
    "Subspeciality", "Modality", "Anatomical Location", "Disease Targeted", 
    "Key Features", "Supported Structures", 
    "Technical Population", "Technical Input", "Technical Input Format",
    "Technical Output", "Technical Output Format",
    "Integration Methods", "Deployment Options", "Trigger For Analysis", "Processing Time",
    "CE Status", "CE Class", "CE Type", "FDA Status", "Intended Use",
    "Market Since", "Distribution Channels", "Countries Present", "Paying Customers", "Research Users",
    "Pricing Model", "Pricing Factors",
    "Release Date", "Version", "Website", "Company URL", "Product URL", 
    "Clinical Evidence", "Last Updated", "Last Verified", "Last Revised"
  ];
  
  // Map product data to CSV rows
  const data = products.map(product => [
    escapeValueForCsv(product.name),
    escapeValueForCsv(product.company),
    escapeValueForCsv(product.category),
    escapeValueForCsv(product.description),
    escapeValueForCsv(product.features),
    escapeValueForCsv(product.subspeciality),
    escapeValueForCsv(product.modality),
    escapeValueForCsv(product.anatomicalLocation),
    escapeValueForCsv(product.diseaseTargeted),
    escapeValueForCsv(product.keyFeatures),
    escapeValueForCsv(product.supportedStructures),
    escapeValueForCsv(product.technicalSpecifications?.population),
    escapeValueForCsv(product.technicalSpecifications?.input),
    escapeValueForCsv(product.technicalSpecifications?.inputFormat),
    escapeValueForCsv(product.technicalSpecifications?.output),
    escapeValueForCsv(product.technicalSpecifications?.outputFormat),
    escapeValueForCsv(product.technology?.integration),
    escapeValueForCsv(product.technology?.deployment),
    escapeValueForCsv(product.technology?.triggerForAnalysis),
    escapeValueForCsv(product.technology?.processingTime),
    escapeValueForCsv(product.regulatory?.ce?.status),
    escapeValueForCsv(product.regulatory?.ce?.class),
    escapeValueForCsv(product.regulatory?.ce?.type),
    escapeValueForCsv(product.regulatory?.fda),
    escapeValueForCsv(product.regulatory?.intendedUseStatement),
    escapeValueForCsv(product.market?.onMarketSince),
    escapeValueForCsv(product.market?.distributionChannels),
    escapeValueForCsv(product.market?.countriesPresent),
    escapeValueForCsv(product.market?.payingCustomers),
    escapeValueForCsv(product.market?.researchUsers),
    // Handle pricing properly based on its type
    escapeValueForCsv(typeof product.pricing === 'string' ? product.pricing : product.pricing?.model),
    escapeValueForCsv(typeof product.pricing === 'string' ? '' : product.pricing?.basedOn),
    escapeValueForCsv(product.releaseDate),
    escapeValueForCsv(product.version),
    escapeValueForCsv(product.website),
    escapeValueForCsv(product.companyUrl),
    escapeValueForCsv(product.productUrl),
    escapeValueForCsv(product.clinicalEvidence),
    escapeValueForCsv(product.lastUpdated),
    escapeValueForCsv(product.lastVerified),
    escapeValueForCsv(product.lastRevised)
  ]);

  // Join rows with newlines and create CSV content
  const csvContent = [
    headers.join(","),
    ...data.map(row => row.join(","))
  ].join("\n");

  // Create a Blob and trigger download
  try {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "dlinrt-products.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url); // Clean up
  } catch (error) {
    console.error("Error generating CSV file:", error);
  }
};
