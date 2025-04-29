
import { ProductDetails } from "@/types/productDetails";
import { RAYSEARCH_TREATMENT_PLANNING_PRODUCTS } from "./treatment-planning/raysearch";
import { MVISION_TREATMENT_PLANNING_PRODUCTS } from "./treatment-planning/mvision";

export const TREATMENT_PLANNING_PRODUCTS: ProductDetails[] = [
    ...RAYSEARCH_TREATMENT_PLANNING_PRODUCTS,
    ...MVISION_TREATMENT_PLANNING_PRODUCTS
];
