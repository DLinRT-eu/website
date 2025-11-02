
import { ProductDetails } from "@/types/productDetails";
import { PYMEDIX_PRODUCTS } from "./pymedix";
import { MVISION_REGISTRATION_PRODUCTS } from "./mvision";

export const REGISTRATION_PRODUCTS: ProductDetails[] = [
  ...PYMEDIX_PRODUCTS,
  ...MVISION_REGISTRATION_PRODUCTS
];
