
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Text } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import ResponsiveChartWrapper from './ResponsiveChartWrapper';
import { CircleCheckIcon } from 'lucide-react';

interface LocationDistributionChartProps {
  locationData: {
    name: string;
    value: number;
    isSelected?: boolean;
    fill?: string;
  }[];
  totalLocations: number;
  selectedLocation: string;
  onLocationClick: (data: any) => void;
  colors: string[];
}

const LocationDistributionChart: React.FC<LocationDistributionChartProps> = ({
  locationData,
  totalLocations,
  selectedLocation,
  onLocationClick,
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
  
  // Single location view
  if (selectedLocation !== "all" && locationData.length === 1) {
    // Get the selected location data
    const location = locationData[0];
    
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg md:text-2xl flex items-center gap-2">
            Products by Location ({totalLocations} total)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center min-h-[350px]">
            <div className="rounded-full bg-rose-100 p-6 mb-4">
              <CircleCheckIcon className="h-12 w-12 text-rose-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">{location.name}</h3>
            <p className="text-muted-foreground mb-2">Selected Location</p>
            <p className="text-3xl font-bold">{location.value}</p>
            <p className="text-muted-foreground">Products</p>
            
            <button 
              onClick={() => onLocationClick({ name: location.name })}
              className="mt-6 text-sm text-rose-500 underline cursor-pointer hover:text-rose-700"
            >
              Click to clear filter
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Multiple locations view (normal pie chart)
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-2xl">Products by Location ({totalLocations} total)</CardTitle>
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
                  onClick={onLocationClick}
                  cursor="pointer"
                >
                  {locationData.map((entry, index) => (
                    <Cell 
                      key={entry.name} 
                      fill={entry.isSelected ? '#F43F5E' : colors[index % colors.length]} 
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
        <div className="mt-4 text-sm text-muted-foreground text-center">
          Click on any segment to filter by location
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationDistributionChart;
