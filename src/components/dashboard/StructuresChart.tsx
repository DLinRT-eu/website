
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
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Supported Structures in Auto-Contouring Products ({structureData.length} structures)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[400px]" config={{}}>
          <BarChart 
            data={structureData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{fontSize: 12}}
            />
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
