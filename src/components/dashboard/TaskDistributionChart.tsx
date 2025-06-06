
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer,
  ChartTooltipContent
} from "@/components/ui/chart";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import ResponsiveChartWrapper from './ResponsiveChartWrapper';

interface TaskDistributionChartProps {
  taskData: {
    name: string;
    value: number;
    isSelected?: boolean;
    isFiltered?: boolean;
    fill?: string;
  }[];
  totalProducts: number;
  selectedTask: string;
  selectedLocation?: string;
  selectedModality?: string;
  onTaskClick: (data: any) => void;
}

const TaskDistributionChart: React.FC<TaskDistributionChartProps> = ({
  taskData,
  totalProducts,
  selectedTask,
  selectedLocation = "all",
  selectedModality = "all",
  onTaskClick
}) => {
  const isMobile = useIsMobile();

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-2xl">
          Products by Task ({totalProducts} total)
          {selectedLocation !== "all" && <span className="text-sm font-normal ml-2 text-muted-foreground">filtered by location</span>}
          {selectedModality !== "all" && <span className="text-sm font-normal ml-2 text-muted-foreground">filtered by modality</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveChartWrapper minHeight="320px">
          <ChartContainer className="h-full" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskData} margin={isMobile ? { top: 5, right: 10, left: 5, bottom: 70 } : { top: 5, right: 30, left: 10, bottom: 30 }}>
                <XAxis 
                  dataKey="name"
                  tick={{
                    fontSize: isMobile ? 10 : 12,
                  }}
                  angle={-20}
                  textAnchor="end"
                  height={isMobile ? 70 : 50}
                  tickMargin={8}
                />
                <YAxis 
                  tick={{
                    fontSize: isMobile ? 10 : 12,
                  }}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="value" 
                  onClick={onTaskClick}
                  cursor="pointer"
                  fillOpacity={0.9}
                >
                  {taskData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.isSelected ? '#F43F5E' : '#00A6D6'}
                      fillOpacity={entry.isFiltered ? 0.7 : 1}
                    />
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
