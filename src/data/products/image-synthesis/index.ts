
import { ProductDetails } from "@/types/productDetails";
import { THERAPANACEA_PRODUCTS } from "./therapanacea";
import { PHILIPS_PRODUCTS } from "./philips";
import { SIEMENS_PRODUCTS } from "./siemens";
import { SPECTRONIC_PRODUCTS } from "./spectronic";
import { SYNTHETICMR_PRODUCTS } from "./syntheticmr";

export const IMAGE_SYNTHESIS_PRODUCTS: ProductDetails[] = [
  ...THERAPANACEA_PRODUCTS,
  ...PHILIPS_PRODUCTS,
  ...SIEMENS_PRODUCTS,
  ...SPECTRONIC_PRODUCTS,
  ...SYNTHETICMR_PRODUCTS
];
