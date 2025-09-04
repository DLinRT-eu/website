
import { ProductDetails } from "@/types/productDetails";
import { generateModelCardData } from "../dataGenerator";
import { createSafeFileName } from "./shared";

export const exportModelCardToJSON = (product: ProductDetails) => {
  try {
    const modelCard = generateModelCardData(product);
    
    const jsonContent = JSON.stringify({
      productId: product.id,
      exportDate: new Date().toISOString(),
      exportVersion: "2.0",
      modelCard: {
        ...modelCard,
        // Include key features prominently
        keyFeatures: modelCard.keyFeatures,
        // Include logo information
        logoInformation: {
          logoUrl: modelCard.contact.logoUrl,
          logoSource: modelCard.contact.logoSource
        }
      },
      // Ensure regulatory fields are present even when empty
      regulatoryDetails: {
        ce: {
          status: (product as any)?.regulatory?.ce?.status || "",
          class: (product as any)?.regulatory?.ce?.class || "",
          type: (product as any)?.regulatory?.ce?.type || "",
          certificateNumber: (product as any)?.regulatory?.ce?.certificateNumber || "",
          regulationNumber: (product as any)?.regulatory?.ce?.regulationNumber || "",
        },
        fda: {
          status: (typeof (product as any)?.regulatory?.fda === 'string'
            ? (product as any)?.regulatory?.fda
            : (product as any)?.regulatory?.fda?.status) || "",
          class: (product as any)?.regulatory?.fda?.class || "",
          clearanceNumber: (product as any)?.regulatory?.fda?.clearanceNumber || "",
          regulationNumber: (product as any)?.regulatory?.fda?.regulationNumber || "",
          productCode: (product as any)?.regulatory?.fda?.productCode || "",
        }
      }
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
