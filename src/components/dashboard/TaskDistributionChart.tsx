
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltipContent, 
  ChartTooltip
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

interface TaskDistributionChartProps {
  taskData: {
    name: string;
    value: number;
    isSelected: boolean;
    fill: string;
  }[];
  totalProducts: number;
  onTaskClick: (data: any) => void;
}

const TaskDistributionChart: React.FC<TaskDistributionChartProps> = ({ 
  taskData, 
  totalProducts, 
  onTaskClick 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products by Task ({totalProducts} total)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px]" config={{}}>
          <BarChart data={taskData}>
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={70} 
              tick={{fontSize: 12}}
            />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar 
              dataKey="value" 
              onClick={onTaskClick} 
              cursor="pointer"
              fillOpacity={0.9}
            >
              {taskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
        <div className="mt-4 text-sm text-muted-foreground text-center">
          Click on any bar to filter by task
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskDistributionChart;
