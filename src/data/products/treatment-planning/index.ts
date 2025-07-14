
import { ProductDetails } from "@/types/productDetails";
import { MVISION_PLANNING_PRODUCTS } from "./mvision";
import { RAYSEARCH_PLANNING_PRODUCTS } from "./raysearch-planning";
import { MANTEIA_MOZI_PRODUCTS } from "./manteia-mozi";
import { SUN_NUCLEAR_PRODUCTS } from "./sun-nuclear";

export const TREATMENT_PLANNING_PRODUCTS: ProductDetails[] = [
  ...MVISION_PLANNING_PRODUCTS,
  ...RAYSEARCH_PLANNING_PRODUCTS,
  ...MANTEIA_MOZI_PRODUCTS,
  ...SUN_NUCLEAR_PRODUCTS
];
