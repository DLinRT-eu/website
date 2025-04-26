import { ProductDetails } from "@/types/productDetails";
import { CompanyDetails } from "@/types/company";
import { NewsItem } from "@/types/news";
import { NEWS_ITEMS } from "./news";
import { COMPANIES } from "./companies";
import { AUTO_CONTOURING_PRODUCTS } from "./products/auto-contouring";
import { REGISTRATION_PRODUCTS } from "./products/registration";
import { TREATMENT_PLANNING_PRODUCTS } from "./products/treatment-planning";
import { IMAGE_SYNTHESIS_PRODUCTS } from "./products/image-synthesis/index";

// Combine all products
export const ALL_PRODUCTS: ProductDetails[] = [
  ...AUTO_CONTOURING_PRODUCTS,
  ...REGISTRATION_PRODUCTS,
  ...TREATMENT_PLANNING_PRODUCTS,
  ...IMAGE_SYNTHESIS_PRODUCTS
];

// Export everything
export {
  NEWS_ITEMS,
  COMPANIES,
  AUTO_CONTOURING_PRODUCTS,
  REGISTRATION_PRODUCTS,
  TREATMENT_PLANNING_PRODUCTS,
  IMAGE_SYNTHESIS_PRODUCTS
};

// Type exports
export type { NewsItem, CompanyDetails };
