
import { RevisionAgeGroups } from '@/utils/revisionUtils';

export interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

export const transformRevisionData = (revisionAgeGroups: RevisionAgeGroups): ChartDataItem[] => {
  return [
    { name: '0-3 months', value: revisionAgeGroups.shortTerm, color: '#10B981' }, // Green
    { name: '3-6 months', value: revisionAgeGroups.mediumTerm, color: '#FBBF24' }, // Yellow
    { name: '6-12 months', value: revisionAgeGroups.longTerm, color: '#F97316' }, // Orange
    { name: '> 12 months', value: revisionAgeGroups.critical, color: '#EF4444' }, // Red
  ];
};
