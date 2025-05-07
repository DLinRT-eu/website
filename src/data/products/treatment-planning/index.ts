
import { ProductDetails } from "@/types/productDetails";
import { MVISION_TREATMENT_PLANNING_PRODUCTS } from "./mvision";
import { RAYSEARCH_PLANNING_PRODUCTS } from "./raysearch-planning";

export const TREATMENT_PLANNING_PRODUCTS: ProductDetails[] = [
  ...MVISION_TREATMENT_PLANNING_PRODUCTS,
  ...RAYSEARCH_PLANNING_PRODUCTS
];
