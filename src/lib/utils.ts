import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ProductDetails } from "@/types/productDetails"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Unified feature extraction function - prioritizes keyFeatures over features
export function getKeyFeatures(product: ProductDetails): string[] {
  if (product.keyFeatures && product.keyFeatures.length > 0) {
    return product.keyFeatures;
  }
  if (product.features && product.features.length > 0) {
    return product.features;
  }
  return [];
}

// Helper to get logo information with source attribution
export function getLogoInfo(product: ProductDetails): { url: string; source: string } {
  let logoUrl = "";
  
  if (product.logoUrl && product.logoUrl.trim() !== '') {
    logoUrl = product.logoUrl.startsWith('/') ? product.logoUrl.trim() : `/${product.logoUrl.trim()}`;
  } else {
    // Create a standardized company logo filename
    const standardizedCompany = product.company.toLowerCase().replace(/\s+/g, '-');
    logoUrl = `/logos/${standardizedCompany}.png`;
  }
  
  return {
    url: logoUrl,
    source: `Logo source: ${logoUrl}`
  };
}
