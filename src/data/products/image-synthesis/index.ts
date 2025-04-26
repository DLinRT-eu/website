
import { ProductDetails } from "@/types/productDetails";
import { DEEPMEDICAL_PRODUCTS } from "./deepmedical";
import { PHILIPS_PRODUCTS } from "./philips";
import { SIEMENS_PRODUCTS } from "./siemens";
import { SPECTRONIC_PRODUCTS } from "./spectronic";
import { GE_PRODUCTS } from "./ge";

export const IMAGE_SYNTHESIS_PRODUCTS: ProductDetails[] = [
  ...DEEPMEDICAL_PRODUCTS,
  ...PHILIPS_PRODUCTS,
  ...SIEMENS_PRODUCTS,
  ...SPECTRONIC_PRODUCTS,
  ...GE_PRODUCTS
];
