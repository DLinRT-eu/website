
import { ProductDetails } from "@/types/productDetails";
import { PHILIPS_MRCAT_BRAIN_PRODUCTS } from "./philips-mrcat-brain";
import { PHILIPS_MRCAT_PELVIS_PRODUCTS } from "./philips-mrcat-pelvis";
import { PHILIPS_MRCAT_HEAD_NECK_PRODUCTS } from "./philips-mrcat-head-neck";
import { SIEMENS_PRODUCTS } from "./siemens";
import { SPECTRONIC_PRODUCTS } from "./spectronic";
import { SYNTHETICMR_PRODUCTS } from "./syntheticmr";
import { THERAPANACEA_PRODUCTS } from "./therapanacea";
import { THERAPANACEA_ADAPTBOX_PRODUCTS } from "./therapanacea-adaptbox";

export const IMAGE_SYNTHESIS_PRODUCTS: ProductDetails[] = [
  ...PHILIPS_MRCAT_BRAIN_PRODUCTS,
  ...PHILIPS_MRCAT_PELVIS_PRODUCTS,
  ...PHILIPS_MRCAT_HEAD_NECK_PRODUCTS,
  ...SIEMENS_PRODUCTS,
  ...SPECTRONIC_PRODUCTS,
  ...SYNTHETICMR_PRODUCTS,
  ...THERAPANACEA_PRODUCTS,
  ...THERAPANACEA_ADAPTBOX_PRODUCTS
];
