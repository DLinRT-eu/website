
export interface CompanyDetails {
  id: string;
  name: string;
  description: string;
  foundedYear?: number;
  headquarters?: string;
  website?: string;
  contactEmail?: string;
  phoneNumber?: string;
  logoUrl?: string;
  employees?: string;
  productIds: string[];
  specializations?: string[];
  markets?: string[];
  partnerships?: string[];
  certifications?: string[];
  lastUpdated?: string;
}
