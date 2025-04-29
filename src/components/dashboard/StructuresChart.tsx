
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

interface StructuresChartProps {
  structureData: {
    name: string;
    value: number;
  }[];
}

const StructuresChart: React.FC<StructuresChartProps> = ({
  structureData
}) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Supported Structures in Auto-Contouring Products ({structureData.length} structures)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[400px]" config={{}}>
          <BarChart data={structureData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="#8B5CF6" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default StructuresChart;
