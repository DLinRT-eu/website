
import { ProductDetails } from "@/types/productDetails";
import { PHILIPS_PRODUCTS } from "./philips";
import { GE_PRODUCTS } from "./ge-healthcare";
import { SIEMENS_PRODUCTS } from "./siemens";
import { CANON_PRODUCTS } from "./canon";
import { AIRS_MEDICAL_PRODUCTS } from "./airs-medical";
import { UNITED_IMAGING_PRODUCTS } from "./united-imaging";
import { SUBTLE_MEDICAL_PRODUCTS } from "./subtle-medical";
import { ACCURAY_PRODUCTS } from "./accuray";
import { ELEKTA_PRODUCTS } from "./elekta";

export const IMAGE_ENHANCEMENT_PRODUCTS: ProductDetails[] = [
  ...PHILIPS_PRODUCTS,
  ...GE_PRODUCTS,
  ...SIEMENS_PRODUCTS,
  ...CANON_PRODUCTS,
  ...AIRS_MEDICAL_PRODUCTS,
  ...UNITED_IMAGING_PRODUCTS,
  ...SUBTLE_MEDICAL_PRODUCTS,
  ...ACCURAY_PRODUCTS,
  ...ELEKTA_PRODUCTS
];
