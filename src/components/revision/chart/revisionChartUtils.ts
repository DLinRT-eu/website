
import { RevisionAgeGroups } from '@/utils/revisionUtils';

export interface ChartDataItem {
  name: string;
  value: number;
  color: string;
  tooltip?: string;  // Added tooltip for enhanced UI feedback
}

export const transformRevisionData = (revisionAgeGroups: RevisionAgeGroups): ChartDataItem[] => {
  return [
    { 
      name: 'Recent (0-3 months)', 
      value: revisionAgeGroups.shortTerm, 
      color: '#10B981',  // Green
      tooltip: `Recent (0-3 months): ${revisionAgeGroups.shortTerm} products`
    },
    { 
      name: 'Due Soon (3-6 months)', 
      value: revisionAgeGroups.mediumTerm, 
      color: '#FBBF24',  // Yellow
      tooltip: `Due Soon (3-6 months): ${revisionAgeGroups.mediumTerm} products`
    },
    { 
      name: 'Overdue (6-12 months)', 
      value: revisionAgeGroups.longTerm, 
      color: '#F97316',  // Orange
      tooltip: `Overdue (6-12 months): ${revisionAgeGroups.longTerm} products`
    },
    { 
      name: 'Critical (> 12 months)', 
      value: revisionAgeGroups.critical, 
      color: '#EF4444',  // Red
      tooltip: `Critical (> 12 months): ${revisionAgeGroups.critical} products`
    },
  ];
};
