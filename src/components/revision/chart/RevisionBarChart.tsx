
import React from 'react';
import { 
  ChartContainer, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

interface RevisionBarChartProps {
  data: ChartDataItem[];
}

const RevisionBarChart: React.FC<RevisionBarChartProps> = ({ data }) => {
  const isMobile = useIsMobile();

  return (
    <ChartContainer className="h-full" config={{}}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
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
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default RevisionBarChart;
