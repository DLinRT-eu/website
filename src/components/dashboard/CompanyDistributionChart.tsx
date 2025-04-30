
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; 
import { 
  ChartContainer, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { ArrowDown, ArrowUp } from "lucide-react";

interface CompanyDistributionChartProps {
  companyData: {
    name: string;
    value: number;
  }[];
  totalCompanies: number;
  selectedTask: string;
}

const CompanyDistributionChart: React.FC<CompanyDistributionChartProps> = ({
  companyData: initialCompanyData,
  totalCompanies,
  selectedTask
}) => {
  const [sortOrder, setSortOrder] = useState<"valueDesc" | "nameAsc" | "nameDesc">("valueDesc");
  
  // Apply sorting
  const sortedCompanyData = [...initialCompanyData].sort((a, b) => {
    if (sortOrder === "valueDesc") {
      return b.value - a.value;
    } else if (sortOrder === "nameAsc") {
      return a.name.localeCompare(b.name);
    } else { // nameDesc
      return b.name.localeCompare(a.name);
    }
  });

  // Toggle sort order
  const handleToggleSort = () => {
    if (sortOrder === "valueDesc") {
      setSortOrder("nameAsc");
    } else if (sortOrder === "nameAsc") {
      setSortOrder("nameDesc");
    } else {
      setSortOrder("valueDesc");
    }
  };

  // Get sort button text and icon
  const getSortButtonContent = () => {
    if (sortOrder === "valueDesc") {
      return (
        <>
          Sort Alphabetically <ArrowDown className="h-4 w-4 ml-1" />
        </>
      );
    } else if (sortOrder === "nameAsc") {
      return (
        <>
          A-Z <ArrowDown className="h-4 w-4 ml-1" />
        </>
      );
    } else {
      return (
        <>
          Z-A <ArrowUp className="h-4 w-4 ml-1" />
        </>
      );
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Products by Company ({totalCompanies} companies) {selectedTask !== "all" ? `(${selectedTask})` : ""}</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleToggleSort}
          className="flex items-center text-xs"
        >
          {getSortButtonContent()}
        </Button>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px]" config={{}}>
          <BarChart layout="vertical" data={sortedCompanyData}>
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
