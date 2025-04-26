
export interface Product {
  name: string;
  company: string;
  description: string;
  features: string[];
  category: string;
  certification?: string;
  logoUrl: string;
  anatomicalLocation?: string[];
}
