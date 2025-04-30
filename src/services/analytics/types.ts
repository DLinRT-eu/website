
// Define analytics-related types
export type PageVisit = {
  path: string;
  title: string;
  timestamp: number;
  duration?: number;
};

export type DailyVisitData = {
  date: string;
  totalVisits: number;
  uniqueVisitors: number;
  pageVisits: {
    [path: string]: {
      count: number;
      totalDuration: number;
    }
  };
};

export type TopPageData = { 
  path: string; 
  title: string;
  visits: number; 
  avgDuration: number;
};

