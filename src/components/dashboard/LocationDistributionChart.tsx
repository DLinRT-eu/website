
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

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
  // Custom label formatter for pie chart
  const renderCustomizedLabel = ({ name, percent }: { name: string; percent: number }) => {
    return `${name} (${(percent * 100).toFixed(0)}%)`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products by Location ({totalLocations} total) {selectedTask !== "all" ? `(${selectedTask})` : ""}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[400px]" config={{}}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={locationData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
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
                  fontSize: '12px',
                  color: 'var(--muted-foreground)'
                }}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LocationDistributionChart;
