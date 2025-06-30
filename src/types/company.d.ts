
export interface CompanyDetails {
  id: string;
  name: string;
  description: string;
  website?: string;
  logoUrl?: string;
  productIds: string[];
  category?: string; // Adding an optional category field
}
