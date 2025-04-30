
import { ProductDetails } from "@/types/productDetails";
import { PHILIPS_PRODUCTS } from "./philips";
import { SIEMENS_PRODUCTS } from "./siemens";
import { SPECTRONIC_PRODUCTS } from "./spectronic";
import { SYNTHETICMR_PRODUCTS } from "./syntheticmr";
import { THERAPANACEA_PRODUCTS } from "./therapanacea";

export const IMAGE_SYNTHESIS_PRODUCTS: ProductDetails[] = [
  ...PHILIPS_PRODUCTS,
  ...SIEMENS_PRODUCTS,
  ...SPECTRONIC_PRODUCTS,
  ...SYNTHETICMR_PRODUCTS,
  ...THERAPANACEA_PRODUCTS
];
