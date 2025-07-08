
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import ResponsiveChartWrapper from './ResponsiveChartWrapper';

interface CompanyDistributionChartProps {
  companyData: {
    name: string;
    value: number;
  }[];
  totalCompanies: number;
  selectedTask: string;
  selectedLocation?: string;
  selectedModality?: string;
}

const CompanyDistributionChart: React.FC<CompanyDistributionChartProps> = ({
  companyData,
  totalCompanies,
  selectedTask,
  selectedLocation = "all",
  selectedModality = "all"
}) => {
  const isMobile = useIsMobile();
  
  // Sort companies by model count, descending
  const sortedData = companyData && companyData.length > 0 
    ? [...companyData].sort((a, b) => b.value - a.value)
    : [];

  // For mobile, limit the number of companies displayed to improve readability
  const displayData = isMobile ? sortedData.slice(0, 10) : sortedData;

  // Calculate left margin based on the longest company name
  // Reduced multipliers and adjusted min/max values for better space utilization
  const maxCompanyNameLength = displayData.length > 0 
    ? Math.max(...displayData.map(item => item.name.length))
    : 0;
  
  const leftMargin = isMobile ? 
    Math.min(100, Math.max(80, maxCompanyNameLength * 4)) : 
    Math.min(140, Math.max(100, maxCompanyNameLength * 5));
    
  // Get active filters list for title display
  const activeFilters = [];
  if (selectedTask !== "all") activeFilters.push(`Task: ${selectedTask}`);
  if (selectedLocation !== "all") activeFilters.push(`Location: ${selectedLocation}`);
  if (selectedModality !== "all") activeFilters.push(`Modality: ${selectedModality}`);
  
  const filterText = activeFilters.length > 0 
    ? `(${activeFilters.join(", ")})`
    : "";

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-2xl">
          AI Models by Company ({totalCompanies} total) {filterText}
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
                  margin={{ top: 5, right: 20, left: leftMargin, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={leftMargin - 10}
                    tick={{ 
                      fontSize: isMobile ? 11 : 13, 
                      fontWeight: isMobile ? 400 : 500,
                      textAnchor: 'end',
                      dy: 3
                    }}
                    tickMargin={8}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
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
        {isMobile && displayData.length > 10 && (
          <div className="mt-4 text-sm text-center text-muted-foreground">
            Showing top 10 companies. View on desktop for all {companyData.length} companies.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompanyDistributionChart;
