
import { ProductDetails } from "@/types/productDetails";
import { PHILIPS_INTELLISPACE_PRODUCTS } from "./philips-intellispace";
import { PHILIPS_SMARTDOSE_PRODUCTS } from "./philips-smartdose";
import { GE_PRODUCTS } from "./ge-healthcare";
import { SIEMENS_PRODUCTS } from "./siemens";
import { CANON_PRODUCTS } from "./canon";
import { AIRS_MEDICAL_PRODUCTS } from "./airs-medical";
import { UNITED_IMAGING_PRODUCTS } from "./united-imaging";
import { SUBTLE_MEDICAL_PRODUCTS } from "./subtle-medical";
import { SUBTLE_MEDICAL_GAD_PRODUCTS } from "./subtle-medical-gad";
import { ACCURAY_PRODUCTS } from "./accuray";

export const IMAGE_ENHANCEMENT_PRODUCTS: ProductDetails[] = [
  ...PHILIPS_INTELLISPACE_PRODUCTS,
  ...PHILIPS_SMARTDOSE_PRODUCTS,
  ...GE_PRODUCTS,
  ...SIEMENS_PRODUCTS,
  ...CANON_PRODUCTS,
  ...AIRS_MEDICAL_PRODUCTS,
  ...UNITED_IMAGING_PRODUCTS,
  ...SUBTLE_MEDICAL_PRODUCTS,
  ...SUBTLE_MEDICAL_GAD_PRODUCTS,
  ...ACCURAY_PRODUCTS
];
