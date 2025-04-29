
export interface Initiative {
  id: string;
  name: string;
  category: string;
  description: string;
  website: string;
  organization: string;
  startDate?: string;
  endDate?: string;
  status: "Active" | "Completed" | "Upcoming";
  tags: string[];
  logoUrl?: string;
  features?: string[];
  dataAccess?: string;
  resultsUrl?: string;
  participationInfo?: string;
  relatedPublications?: {
    title: string;
    url: string;
    authors: string;
    year: string;
  }[];
}
