
import React from 'react';
import { RevisionAgeGroups } from '@/utils/revisionUtils';
import ResponsiveChartWrapper from '../dashboard/ResponsiveChartWrapper';
import { useIsMobile } from "@/hooks/use-mobile";
import ChartLegend from './chart/ChartLegend';
import RevisionBarChart from './chart/RevisionBarChart';
import { transformRevisionData } from './chart/revisionChartUtils';

interface RevisionChartProps {
  revisionAgeGroups: RevisionAgeGroups;
}

const RevisionChart: React.FC<RevisionChartProps> = ({ revisionAgeGroups }) => {
  const isMobile = useIsMobile();
  
  // Transform data for chart using the utility function
  const chartData = transformRevisionData(revisionAgeGroups);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Revision Age Distribution</h3>
      <ResponsiveChartWrapper minHeight={isMobile ? "250px" : "300px"}>
        <RevisionBarChart data={chartData} />
      </ResponsiveChartWrapper>
      <ChartLegend items={chartData} />
    </div>
  );
};

export default RevisionChart;
