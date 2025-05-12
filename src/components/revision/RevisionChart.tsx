
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import ResponsiveChartWrapper from '../dashboard/ResponsiveChartWrapper';
import { RevisionAgeGroups } from '@/utils/revisionUtils';

interface RevisionChartProps {
  revisionAgeGroups: RevisionAgeGroups;
}

const RevisionChart: React.FC<RevisionChartProps> = ({ revisionAgeGroups }) => {
  const isMobile = useIsMobile();
  
  // Transform data for chart
  const chartData = [
    { name: '0-3 months', value: revisionAgeGroups.shortTerm, color: '#10B981' }, // Green
    { name: '3-6 months', value: revisionAgeGroups.mediumTerm, color: '#FBBF24' }, // Yellow
    { name: '6-12 months', value: revisionAgeGroups.longTerm, color: '#F97316' }, // Orange
    { name: '> 12 months', value: revisionAgeGroups.critical, color: '#EF4444' }, // Red
  ];

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Revision Age Distribution</h3>
      <ResponsiveChartWrapper minHeight={isMobile ? "250px" : "300px"}>
        <ChartContainer className="h-full" config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            >
              <XAxis 
                dataKey="name"
                tick={{ fontSize: isMobile ? 11 : 13 }}
              />
              <YAxis 
                allowDecimals={false}
                tick={{ fontSize: isMobile ? 11 : 13 }}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" name="Products">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ResponsiveChartWrapper>
      <div className="flex justify-center mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-xs text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevisionChart;
