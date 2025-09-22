import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import ResponsiveChartWrapper from './ResponsiveChartWrapper';
import { validateChartData, validateTotalCount, validateCountingMode, validateFilterValue } from '@/utils/chartDataValidation';

interface CertificationDistributionChartProps {
  certificationData: {
    name: string;
    value: number;
    fill: string;
  }[];
  totalCertified: number;
  countingMode?: 'models' | 'products';
  selectedTask: string;
  selectedLocation: string;
  selectedModality: string;
}

const CertificationDistributionChart: React.FC<CertificationDistributionChartProps> = ({
  certificationData,
  totalCertified,
  countingMode = 'models',
  selectedTask,
  selectedLocation,
  selectedModality
}) => {
  const isMobile = useIsMobile();
  
  // Validate and sanitize all inputs
  const validatedCertificationData = validateChartData(certificationData);
  const validatedTotalCertified = validateTotalCount(totalCertified);
  const validatedCountingMode = validateCountingMode(countingMode);
  const validatedSelectedTask = validateFilterValue(selectedTask);
  const validatedSelectedLocation = validateFilterValue(selectedLocation);
  const validatedSelectedModality = validateFilterValue(selectedModality);

  // Custom label formatter for pie chart based on device
  const renderCustomizedLabel = ({ name, percent }: { name: string; percent: number }) => {
    if (isMobile && name.length > 8) {
      return `${(percent * 100).toFixed(0)}%`;
    }
    return `${name} (${(percent * 100).toFixed(0)}%)`;
  };

  const pieRadius = isMobile ? 70 : 100;

  // Show message if no data
  if (validatedCertificationData.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg md:text-2xl">
            Regulatory Certification Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center min-h-[350px]">
            <p className="text-muted-foreground">No certification data available for current filters</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-2xl">
          Regulatory Certification Distribution ({validatedTotalCertified} total {validatedCountingMode})
          {validatedSelectedTask !== "all" && <span className="text-sm font-normal ml-2 text-muted-foreground">filtered by task</span>}
          {validatedSelectedLocation !== "all" && <span className="text-sm font-normal ml-2 text-muted-foreground">filtered by location</span>}
          {validatedSelectedModality !== "all" && <span className="text-sm font-normal ml-2 text-muted-foreground">filtered by modality</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveChartWrapper minHeight="350px">
          <ChartContainer className="h-full" config={{}}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={validatedCertificationData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={pieRadius}
                  label={renderCustomizedLabel}
                >
                  {validatedCertificationData.map((entry) => (
                    <Cell 
                      key={entry.name} 
                      fill={entry.fill}
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
          Distribution of regulatory approvals (CE, FDA, NMPA) across {validatedCountingMode}
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificationDistributionChart;