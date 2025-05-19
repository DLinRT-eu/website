
// This file is being kept for backwards compatibility
// The main interface is now in productDetails.d.ts
import { Product } from './product';
import type { ProductDetails as ExtendedProductDetails } from './productDetails';

export interface Structure {
  name: string;
  type: "OAR" | "GTV" | "Elective";
  description?: string;
}

// Re-export the interface from the .d.ts file
export type ProductDetails = ExtendedProductDetails;
