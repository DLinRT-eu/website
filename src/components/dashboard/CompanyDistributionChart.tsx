
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import ResponsiveChartWrapper from './ResponsiveChartWrapper';
import { validateChartData, validateCountingMode, validateTotalCount, validateFilterValue } from '@/utils/chartDataValidation';

// Custom tooltip component for company chart
const CompanyTooltip = ({ active, payload, countingMode }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const { name, value, products } = data;
    
    return (
      <div className="bg-popover border border-border rounded-lg shadow-lg p-3 max-w-sm">
        <div className="font-semibold text-sm mb-2">
          {name}
        </div>
        <div className="text-sm mb-2">
          {countingMode === 'models' ? 'AI Models' : 'Products'}: {value}
        </div>
        {products && products.length > 0 && (
          <div className="text-xs text-muted-foreground">
            <div className="font-medium mb-1">Products:</div>
            <ul className="space-y-1">
              {products.map((product: any, index: number) => (
                <li key={index} className="truncate">
                  • {product.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  return null;
};

interface CompanyDistributionChartProps {
  companyData: {
    name: string;
    value: number;
    company?: any;
    products?: any[];
  }[];
  totalCompanies: number;
  countingMode?: 'models' | 'products';
  selectedTask: string;
  selectedLocation?: string;
  selectedModality?: string;
}

const CompanyDistributionChart: React.FC<CompanyDistributionChartProps> = ({
  companyData,
  totalCompanies,
  countingMode = 'models',
  selectedTask,
  selectedLocation = "all",
  selectedModality = "all"
}) => {
  const isMobile = useIsMobile();
  
  // Validate and sanitize all inputs
  const validatedCompanyData = validateChartData(companyData);
  const validatedTotalCompanies = validateTotalCount(totalCompanies);
  const validatedCountingMode = validateCountingMode(countingMode);
  const validatedSelectedTask = validateFilterValue(selectedTask);
  const validatedSelectedLocation = validateFilterValue(selectedLocation);
  const validatedSelectedModality = validateFilterValue(selectedModality);
  
  // Sort companies by model count, descending
  const sortedData = validatedCompanyData && validatedCompanyData.length > 0 
    ? [...validatedCompanyData].sort((a, b) => b.value - a.value)
    : [];

  // For mobile, limit the number of companies displayed to improve readability
  const displayData = isMobile ? sortedData.slice(0, 15) : sortedData;
    
  // Get active filters list for title display
  const activeFilters = [];
  if (validatedSelectedTask !== "all") activeFilters.push(`Task: ${validatedSelectedTask}`);
  if (validatedSelectedLocation !== "all") activeFilters.push(`Location: ${validatedSelectedLocation}`);
  if (validatedSelectedModality !== "all") activeFilters.push(`Modality: ${validatedSelectedModality}`);
  
  const filterText = activeFilters.length > 0 
    ? `(${activeFilters.join(", ")})`
    : "";

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-2xl">
          {validatedCountingMode === 'models' ? 'AI Models' : 'Products'} by Company ({validatedTotalCompanies} total) {filterText}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {displayData.length > 0 ? (
          <ResponsiveChartWrapper minHeight={isMobile ? "350px" : "400px"}>
            <ChartContainer className="h-full" config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={displayData} 
                  layout="vertical"
                  margin={isMobile ? { top: 5, right: 20, left: 120, bottom: 5 } : { top: 5, right: 30, left: 180, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={isMobile ? 115 : 175}
                    tick={{ 
                      fontSize: isMobile ? 10 : 12, 
                      fontWeight: 500,
                      textAnchor: 'end',
                      fill: '#374151'
                    }}
                    tickMargin={5}
                    interval={0}
                  />
                  <Tooltip content={<CompanyTooltip countingMode={validatedCountingMode} />} />
                  <Bar dataKey="value" fill="#00A6D6" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </ResponsiveChartWrapper>
        ) : (
          <div className="py-12 text-center text-muted-foreground">
            No company models available for the current filters.
          </div>
        )}
        {isMobile && sortedData.length > 15 && (
            <div className="mt-4 text-sm text-center text-muted-foreground">
              Showing top 15 companies. View on desktop for all {validatedCompanyData.length} companies.
            </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompanyDistributionChart;
