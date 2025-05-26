
import { ProductDetails } from "@/types/productDetails";
import { PTW_PRODUCTS } from "./ptw";
import { MVISION_PERFORMANCE_PRODUCTS } from "./mvision";

export const PERFORMANCE_MONITOR_PRODUCTS: ProductDetails[] = [
  ...PTW_PRODUCTS,
  ...MVISION_PERFORMANCE_PRODUCTS
];
