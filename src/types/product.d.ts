
export interface Product {
  id?: string;
  name: string;
  company: string;
  description: string;
  features: string[];
  category: string;
  certification?: string;
  logoUrl: string;
  anatomicalLocation?: string[];
  modality?: string;
  subspeciality?: string;
  diseaseTargeted?: string[];
  releaseDate?: string;
  version?: string;
  price?: number;
  website?: string;
  supportEmail?: string;
  trainingRequired?: boolean;
  compatibleSystems?: string[];
  userRating?: number;
  lastUpdated?: string;
}
