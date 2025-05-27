
import { ProductDetails } from "@/types/productDetails";
import { MIRADA_RTX_PRODUCTS } from "./mirada-rtx";
import { PYMEDIX_PRODUCTS } from "./pymedix";

export const REGISTRATION_PRODUCTS: ProductDetails[] = [
  ...MIRADA_RTX_PRODUCTS,
  ...PYMEDIX_PRODUCTS
];
