
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products by Company ({totalCompanies} companies) {selectedTask !== "all" ? `(${selectedTask})` : ""}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px]" config={{}}>
          <BarChart layout="vertical" data={companyData}>
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="#00A6D6" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CompanyDistributionChart;
