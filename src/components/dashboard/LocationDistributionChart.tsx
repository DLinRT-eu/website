
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import ResponsiveChartWrapper from './ResponsiveChartWrapper';

interface LocationDistributionChartProps {
  locationData: {
    name: string;
    value: number;
  }[];
  totalLocations: number;
  selectedTask: string;
  colors: string[];
}

const LocationDistributionChart: React.FC<LocationDistributionChartProps> = ({
  locationData,
  totalLocations,
  selectedTask,
  colors
}) => {
  const isMobile = useIsMobile();

  // Custom label formatter for pie chart based on device
  const renderCustomizedLabel = ({ name, percent }: { name: string; percent: number }) => {
    if (isMobile && name.length > 6) {
      return `${(percent * 100).toFixed(0)}%`;
    }
    return `${name} (${(percent * 100).toFixed(0)}%)`;
  };

  const pieRadius = isMobile ? 70 : 100;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-2xl">Products by Location ({totalLocations} total) {selectedTask !== "all" ? `(${selectedTask})` : ""}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveChartWrapper minHeight="350px">
          <ChartContainer className="h-full" config={{}}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={locationData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={pieRadius}
                  label={renderCustomizedLabel}
                >
                  {locationData.map((entry, index) => (
                    <Cell 
                      key={entry.name} 
                      fill={colors[index % colors.length]} 
                      stroke="var(--background)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltipContent />} />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ 
                    paddingTop: '10px',
                    fontSize: isMobile ? '10px' : '12px',
                    color: 'var(--muted-foreground)',
                    maxWidth: '100%'
                  }}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ResponsiveChartWrapper>
      </CardContent>
    </Card>
  );
};

export default LocationDistributionChart;
