
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer,
  ChartTooltipContent
} from "@/components/ui/chart";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import ResponsiveChartWrapper from './ResponsiveChartWrapper';
import { validateChartData, validateClickData, validateCountingMode, validateTotalCount, validateFilterValue } from '@/utils/chartDataValidation';

interface TaskDistributionChartProps {
  taskData: {
    name: string;
    value: number;
    isSelected?: boolean;
    isFiltered?: boolean;
    fill?: string;
  }[];
  totalModels: number;
  countingMode?: 'models' | 'products';
  selectedTask: string;
  selectedLocation?: string;
  selectedModality?: string;
  onTaskClick: (data: any) => void;
}

const TaskDistributionChart: React.FC<TaskDistributionChartProps> = ({
  taskData,
  totalModels,
  countingMode = 'models',
  selectedTask,
  selectedLocation = "all",
  selectedModality = "all",
  onTaskClick
}) => {
  const isMobile = useIsMobile();
  
  // Validate and sanitize all inputs
  const validatedTaskData = validateChartData(taskData);
  const validatedTotalModels = validateTotalCount(totalModels);
  const validatedCountingMode = validateCountingMode(countingMode);
  const validatedSelectedTask = validateFilterValue(selectedTask);
  const validatedSelectedLocation = validateFilterValue(selectedLocation);
  const validatedSelectedModality = validateFilterValue(selectedModality);
  
  // Secure click handler
  const handleTaskClick = (data: any) => {
    const validatedData = validateClickData(data);
    if (validatedData && onTaskClick) {
      onTaskClick(validatedData);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-2xl">
          {validatedCountingMode === 'models' ? 'AI Models' : 'Products'} by Task ({validatedTotalModels} total)
          {validatedSelectedLocation !== "all" && <span className="text-sm font-normal ml-2 text-muted-foreground">filtered by location</span>}
          {validatedSelectedModality !== "all" && <span className="text-sm font-normal ml-2 text-muted-foreground">filtered by modality</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveChartWrapper minHeight={isMobile ? "400px" : "320px"}>
          <ChartContainer className="h-full" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={validatedTaskData} margin={isMobile ? { top: 5, right: 15, left: 5, bottom: 90 } : { top: 5, right: 30, left: 20, bottom: 80 }}>
                <XAxis 
                  dataKey="name"
                  tick={{
                    fontSize: isMobile ? 11 : 13,
                    fill: '#374151',
                    fontWeight: 500,
                  }}
                  angle={isMobile ? -45 : -35}
                  textAnchor="end"
                  height={isMobile ? 90 : 80}
                  tickMargin={10}
                  interval={0}
                />
                <YAxis 
                  tick={{
                    fontSize: isMobile ? 10 : 12,
                  }}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="value" 
                  onClick={handleTaskClick}
                  cursor="pointer"
                  fillOpacity={0.9}
                >
                  {validatedTaskData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.fill || '#64748B'}
                      fillOpacity={entry.isFiltered ? 0.7 : (entry.isSelected ? 1 : 0.8)}
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
