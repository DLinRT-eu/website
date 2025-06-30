
export interface ReviewProduct {
  id: string;
  name: string;
  company: string;
  category: string;
  status: 'critical' | 'warning' | 'ok';
  urgency: 'high' | 'medium' | 'low' | 'recent';
  daysSinceReview: number;
  issueCount: number;
  lastRevised?: string;
}

export const TEAM_MEMBERS = [
  "Unassigned",
  "Alice",
  "Bob",
  "Carol",
  "David",
  "Eva",
  "Mustafa Kadhim"
];
