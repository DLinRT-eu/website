
import { ProductDetails } from "@/types/productDetails";
import { LIMBUS_PRODUCTS } from "./limbus";
import { MVISION_PRODUCTS } from "./mvision";
import { MIRADA_PRODUCTS } from "./mirada";
import { RAYSEARCH_PRODUCTS } from "./raysearch";
import { THERAPANACEA_PRODUCTS } from "./therapanacea";
import { PHILIPS_PRODUCTS } from "./philips";

export const AUTO_CONTOURING_PRODUCTS: ProductDetails[] = [
  ...LIMBUS_PRODUCTS,
  ...MVISION_PRODUCTS,
  ...MIRADA_PRODUCTS,
  ...RAYSEARCH_PRODUCTS,
  ...THERAPANACEA_PRODUCTS,
  ...PHILIPS_PRODUCTS
];
