export interface Structure {
  name: string;
  type: "OAR" | "GTV" | "Elective";
  description?: string;
}

export interface ProductDetails {
  id: string;
  name: string;
  category: string;
  description: string;
  modality?: string[];
  anatomicalLocation?: string[];
  structures?: Structure[];
  yearIntroduced?: number;
  manufacturer: string;
  website?: string;
  features?: string[];
  certifications?: string[];
  researchPapers?: string[];
  reviews?: string[];
  pricing?: string;
  contacts?: {
    sales?: string;
    support?: string;
  };
  lastUpdated: string;
  tags?: string[];
}
