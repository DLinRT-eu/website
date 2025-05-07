
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import ResponsiveChartWrapper from './ResponsiveChartWrapper';

interface ModalityDistributionChartProps {
  modalityData: {
    name: string;
    value: number;
    isSelected?: boolean;
    fill?: string;
  }[];
  totalModalities: number;
  selectedModality: string;
  onModalityClick: (data: any) => void;
}

const ModalityDistributionChart: React.FC<ModalityDistributionChartProps> = ({
  modalityData,
  totalModalities,
  selectedModality,
  onModalityClick
}) => {
  const isMobile = useIsMobile();

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-2xl">Products by Modality ({totalModalities} total)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveChartWrapper minHeight="300px">
          <ChartContainer className="h-full" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modalityData} margin={isMobile ? { top: 5, right: 10, left: 0, bottom: 20 } : { top: 5, right: 30, left: 10, bottom: 5 }}>
                <XAxis 
                  dataKey="name"
                  tick={{
                    fontSize: isMobile ? 10 : 12,
                  }}
                  angle={isMobile ? -20 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
                  height={isMobile ? 60 : 30}
                />
                <YAxis />
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
                      fill={entry.isSelected ? '#F43F5E' : '#00A6D6'} 
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
