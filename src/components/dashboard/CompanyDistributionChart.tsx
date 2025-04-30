
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

interface CompanyDistributionChartProps {
  companyData: {
    name: string;
    value: number;
  }[];
  totalCompanies: number;
  selectedTask: string;
}

const CompanyDistributionChart: React.FC<CompanyDistributionChartProps> = ({
  companyData,
  totalCompanies,
  selectedTask
}) => {
  // Sort companies by product count, descending
  const sortedData = [...companyData].sort((a, b) => b.value - a.value);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products by Company ({totalCompanies} total) {selectedTask !== "all" ? `(${selectedTask})` : ""}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[400px]" config={{}}>
          <BarChart 
            data={sortedData} 
            layout="vertical"
            margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
          >
            <XAxis type="number" />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={120}
              tick={{ 
                fontSize: 13, 
                fontWeight: 500,
                textAnchor: 'end',
                lineHeight: '16px'
              }}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="#00A6D6" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CompanyDistributionChart;
