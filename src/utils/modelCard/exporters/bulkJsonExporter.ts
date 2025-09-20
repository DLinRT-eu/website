import { ProductDetails } from "@/types/productDetails";
import { generateModelCardData } from "../dataGenerator";
import { createSafeFileName } from "./shared";

export const exportBulkProductsToJSON = (products: ProductDetails[]) => {
  try {
    const exportData = {
      exportMetadata: {
        exportDate: new Date().toISOString(),
        exportVersion: "2.0",
        totalProducts: products.length,
        source: "DLinRT.eu Database"
      },
      products: products.map(product => {
        const modelCard = generateModelCardData(product);
        return {
          productId: product.id,
          modelCard: {
            ...modelCard,
            keyFeatures: modelCard.keyFeatures,
            logoInformation: {
              logoUrl: modelCard.contact.logoUrl,
              logoSource: modelCard.contact.logoSource
            }
          },
          regulatoryDetails: {
            ce: {
              status: product.regulatory?.ce?.status || "",
              class: product.regulatory?.ce?.class || "",
              type: product.regulatory?.ce?.type || "",
              certificateNumber: product.regulatory?.ce?.certificateNumber || "",
              regulationNumber: product.regulatory?.ce?.regulation || "",
            },
            fda: {
              status: typeof product.regulatory?.fda === 'string'
                ? product.regulatory.fda
                : product.regulatory?.fda?.status || "",
              class: typeof product.regulatory?.fda === 'object' && product.regulatory?.fda 
                ? product.regulatory.fda.class || "" 
                : "",
              clearanceNumber: typeof product.regulatory?.fda === 'object' && product.regulatory?.fda 
                ? product.regulatory.fda.clearanceNumber || "" 
                : "",
              regulationNumber: typeof product.regulatory?.fda === 'object' && product.regulatory?.fda 
                ? product.regulatory.fda.regulationNumber || "" 
                : "",
              productCode: typeof product.regulatory?.fda === 'object' && product.regulatory?.fda 
                ? product.regulatory.fda.productCode || "" 
                : "",
            }
          },
          rawProductData: product // Include original product data for completeness
        };
      })
    };
    
    const jsonContent = JSON.stringify(exportData, null, 2);
    
    const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", createSafeFileName(`bulk-products-export-${products.length}`, 'json'));
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting bulk products to JSON:', error);
    throw new Error('Failed to export products to JSON format');
  }
};