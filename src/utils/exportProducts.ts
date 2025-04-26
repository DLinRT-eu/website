
import { Product } from "@/types/product";

export const exportProductsToCSV = (products: Product[]) => {
  const headers = [
    "Name", "Company", "Category", "Description", "Features",
    "Subspeciality", "Modality", "Disease Targeted", "Key Features",
    "Technical Population", "Technical Input", "Technical Output",
    "Integration Methods", "Deployment Options", "Processing Time",
    "CE Status", "CE Class", "FDA Status", "Intended Use",
    "Market Since", "Countries Present", "Paying Customers",
    "Pricing Model", "Pricing Factors",
    "Release Date", "Version", "Price", "Website", "Support Email",
    "Training Required", "Compatible Systems", "User Rating",
    "Last Updated"
  ];
  
  const data = products.map(product => [
    product.name,
    product.company,
    product.category,
    product.description,
    product.features?.join(", ") || "N/A",
    product.subspeciality || "N/A",
    product.modality || "N/A",
    product.diseaseTargeted?.join(", ") || "N/A",
    product.keyFeatures?.join(", ") || "N/A",
    product.technicalSpecifications?.population || "N/A",
    product.technicalSpecifications?.input?.join(", ") || "N/A",
    product.technicalSpecifications?.output?.join(", ") || "N/A",
    product.technology?.integration?.join(", ") || "N/A",
    product.technology?.deployment?.join(", ") || "N/A",
    product.technology?.processingTime || "N/A",
    product.regulatory?.ce?.status || "N/A",
    product.regulatory?.ce?.class || "N/A",
    product.regulatory?.fda || "N/A",
    product.regulatory?.intendedUseStatement || "N/A",
    product.market?.onMarketSince || "N/A",
    product.market?.countriesPresent?.toString() || "N/A",
    product.market?.payingCustomers || "N/A",
    product.pricing?.model?.join(", ") || "N/A",
    product.pricing?.basedOn?.join(", ") || "N/A",
    product.releaseDate || "N/A",
    product.version || "N/A",
    product.price ? `$${product.price}` : "N/A",
    product.website || "N/A",
    product.supportEmail || "N/A",
    product.trainingRequired ? "Yes" : "No",
    product.compatibleSystems?.join(", ") || "N/A",
    product.userRating?.toString() || "N/A",
    product.lastUpdated || "N/A"
  ]);

  const csvContent = [
    headers.join(","),
    ...data.map(row => row.join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "products.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
