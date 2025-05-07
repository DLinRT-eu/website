
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltipContent, 
  ChartTooltip
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import ResponsiveChartWrapper from './ResponsiveChartWrapper';

interface TaskDistributionChartProps {
  taskData: {
    name: string;
    value: number;
    isSelected: boolean;
    fill: string;
  }[];
  totalProducts: number;
  onTaskClick: (data: any) => void;
  selectedTask: string;
}

const TaskDistributionChart: React.FC<TaskDistributionChartProps> = ({ 
  taskData, 
  totalProducts, 
  onTaskClick,
  selectedTask 
}) => {
  const isMobile = useIsMobile();

  // Responsive settings based on device
  const chartMargin = isMobile 
    ? { top: 5, right: 10, left: 0, bottom: 100 }
    : { top: 5, right: 30, left: 5, bottom: 80 };

  const axisHeight = isMobile ? 100 : 90;
  const tickFontSize = isMobile ? 10 : 12;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-2xl">Products by Task ({totalProducts} total)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveChartWrapper minHeight="300px">
          <ChartContainer className="h-full" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={taskData}
                margin={chartMargin} 
              >
                <XAxis 
                  dataKey="name" 
                  angle={-20}
                  textAnchor="end" 
                  height={axisHeight}
                  tick={{
                    fontSize: tickFontSize,
                    dy: 8
                  }}
                  tickMargin={15}
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
            </ResponsiveContainer>
          </ChartContainer>
        </ResponsiveChartWrapper>
        <div className="mt-4 text-sm text-muted-foreground text-center">
          Click on any bar to filter by task
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskDistributionChart;
