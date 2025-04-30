
import { ProductDetails } from "@/types/productDetails";
import { CompanyDetails } from "@/types/company";
import { NewsItem } from "@/types/news";
import { Initiative } from "@/types/initiative";
import { NEWS_ITEMS } from "./news";
import { COMPANIES } from "./companies";
import { AUTO_CONTOURING_PRODUCTS } from "./products/auto-contouring/index";
import { IMAGE_SYNTHESIS_PRODUCTS } from "./products/image-synthesis/index";
import { REGISTRATION_PRODUCTS } from "./products/registration";
import { TREATMENT_PLANNING_PRODUCTS } from "./products/treatment-planning";
import { CLINICAL_PREDICTION_PRODUCTS } from "./products/clinical-prediction";
import { RECONSTRUCTION_PRODUCTS } from "./products/reconstruction";
import { IMAGE_ENHANCEMENT_PRODUCTS } from "./products/image-enhancement";
import { ALL_INITIATIVES, CHALLENGE_INITIATIVES, DATASET_INITIATIVES, RESEARCH_PROJECT_INITIATIVES } from "./initiatives";

// Combine all products
export const ALL_PRODUCTS: ProductDetails[] = [
  ...AUTO_CONTOURING_PRODUCTS,
  ...IMAGE_SYNTHESIS_PRODUCTS,
  ...REGISTRATION_PRODUCTS,
  ...TREATMENT_PLANNING_PRODUCTS,
  ...CLINICAL_PREDICTION_PRODUCTS,
  ...RECONSTRUCTION_PRODUCTS,
  ...IMAGE_ENHANCEMENT_PRODUCTS
];

// Export everything
export {
  NEWS_ITEMS,
  COMPANIES,
  AUTO_CONTOURING_PRODUCTS,
  IMAGE_SYNTHESIS_PRODUCTS,
  REGISTRATION_PRODUCTS,
  TREATMENT_PLANNING_PRODUCTS,
  CLINICAL_PREDICTION_PRODUCTS,
  RECONSTRUCTION_PRODUCTS,
  IMAGE_ENHANCEMENT_PRODUCTS,
  ALL_INITIATIVES,
  CHALLENGE_INITIATIVES, 
  DATASET_INITIATIVES,
  RESEARCH_PROJECT_INITIATIVES
};

// Type exports
export type { NewsItem, CompanyDetails, Initiative };
