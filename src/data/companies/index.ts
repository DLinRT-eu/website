
import { CompanyDetails } from "@/types/company";
import { AUTO_CONTOURING_COMPANIES } from "./auto-contouring";
import { MEDICAL_IMAGING_COMPANIES } from "./medical-imaging";
import { SPECIALIZED_SOLUTIONS_COMPANIES } from "./specialized-solutions";
import { RADIOTHERAPY_EQUIPMENT_COMPANIES } from "./radiotherapy-equipment";

// Combine all companies
export const COMPANIES: CompanyDetails[] = [
  ...AUTO_CONTOURING_COMPANIES,
  ...MEDICAL_IMAGING_COMPANIES,
  ...SPECIALIZED_SOLUTIONS_COMPANIES,
  ...RADIOTHERAPY_EQUIPMENT_COMPANIES
];

// Export categories for filtering
export {
  AUTO_CONTOURING_COMPANIES,
  MEDICAL_IMAGING_COMPANIES,
  SPECIALIZED_SOLUTIONS_COMPANIES,
  RADIOTHERAPY_EQUIPMENT_COMPANIES
};
