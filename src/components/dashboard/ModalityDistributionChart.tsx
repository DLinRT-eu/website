
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

interface ModalityDistributionChartProps {
  modalityData: {
    name: string;
    value: number;
  }[];
  totalModalities: number;
  selectedTask: string;
}

const ModalityDistributionChart: React.FC<ModalityDistributionChartProps> = ({
  modalityData,
  totalModalities,
  selectedTask
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products by Modality ({totalModalities} total) {selectedTask !== "all" ? `(${selectedTask})` : ""}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px]" config={{}}>
          <BarChart data={modalityData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="#00A6D6" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ModalityDistributionChart;
