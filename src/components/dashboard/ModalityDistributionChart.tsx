
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import ResponsiveChartWrapper from './ResponsiveChartWrapper';
import { CircleCheckIcon } from 'lucide-react';

interface ModalityDistributionChartProps {
  modalityData: {
    name: string;
    value: number;
    isSelected?: boolean;
    isFiltered?: boolean;
    fill?: string;
  }[];
  totalModalities: number;
  countingMode?: 'models' | 'products';
  selectedModality: string;
  selectedTask: string;
  selectedLocation: string;
  onModalityClick: (data: any) => void;
}

const ModalityDistributionChart: React.FC<ModalityDistributionChartProps> = ({
  modalityData,
  totalModalities,
  countingMode = 'models',
  selectedModality,
  selectedTask,
  selectedLocation,
  onModalityClick
}) => {
  const isMobile = useIsMobile();

  // Single modality view
  if (selectedModality !== "all" && modalityData.length === 1) {
    // Get the selected modality data
    const modality = modalityData[0];
    
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg md:text-2xl flex items-center gap-2">
            {countingMode === 'models' ? 'AI Models' : 'Products'} by Modality ({totalModalities} total)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <div className="rounded-full bg-purple-100 p-6 mb-4">
              <CircleCheckIcon className="h-12 w-12 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">{modality.name}</h3>
            <p className="text-muted-foreground mb-2">Selected Modality</p>
            <p className="text-3xl font-bold">{modality.value}</p>
            <p className="text-muted-foreground">{countingMode === 'models' ? 'AI Models' : 'Products'}</p>
            
            <button 
              onClick={() => onModalityClick({ name: modality.name })}
              className="mt-6 text-sm text-purple-500 underline cursor-pointer hover:text-purple-700"
            >
              Click to clear filter
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Multiple modalities view (normal bar chart)
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-2xl">
          {countingMode === 'models' ? 'AI Models' : 'Products'} by Modality ({totalModalities} total)
          {selectedTask !== "all" && <span className="text-sm font-normal ml-2 text-muted-foreground">filtered by task</span>}
          {selectedLocation !== "all" && <span className="text-sm font-normal ml-2 text-muted-foreground">filtered by location</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveChartWrapper minHeight="320px">
          <ChartContainer className="h-full" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modalityData} margin={isMobile ? { top: 5, right: 10, left: 5, bottom: 70 } : { top: 5, right: 30, left: 10, bottom: 30 }}>
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
                  onClick={onModalityClick}
                  cursor="pointer"
                  fillOpacity={0.9}
                >
                  {modalityData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.isSelected ? '#F43F5E' : (entry.isFiltered ? '#FFC107' : '#00A6D6')} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ResponsiveChartWrapper>
        <div className="mt-4 text-sm text-muted-foreground text-center">
          Click on any bar to filter by modality
        </div>
      </CardContent>
    </Card>
  );
};

export default ModalityDistributionChart;
