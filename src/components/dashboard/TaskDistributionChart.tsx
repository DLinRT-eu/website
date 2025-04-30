
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
          <BarChart 
            data={taskData}
            margin={{ top: 5, right: 30, left: 5, bottom: 80 }} // Increased bottom margin for more space
          >
            <XAxis 
              dataKey="name" 
              angle={-20} // Changed angle to -20 degrees
              textAnchor="end" 
              height={90} // Increased height to provide more space for labels
              tick={{
                fontSize: 12,
                dy: 8 // Added dy attribute for vertical adjustment
              }}
              tickMargin={15} // Added tickMargin for more space between text and axis
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
