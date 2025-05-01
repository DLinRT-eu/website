
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import ResponsiveChartWrapper from './ResponsiveChartWrapper';

interface StructuresChartProps {
  structureData: {
    name: string;
    value: number;
  }[];
}

const StructuresChart: React.FC<StructuresChartProps> = ({
  structureData
}) => {
  const isMobile = useIsMobile();
  
  // Limit number of structures on mobile for better visibility
  const displayData = isMobile ? 
    structureData.slice(0, Math.min(8, structureData.length)) : 
    structureData;

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-2xl">
          Supported Structures in Auto-Contouring Products ({structureData.length} structures)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveChartWrapper minHeight={isMobile ? "300px" : "400px"}>
          <ChartContainer className="h-full" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={displayData}
                margin={isMobile ? 
                  { top: 5, right: 10, left: 0, bottom: 80 } : 
                  { top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={isMobile ? 90 : 80}
                  tick={{
                    fontSize: isMobile ? 10 : 12,
                    dy: isMobile ? 10 : 5
                  }}
                  tickMargin={10}
                />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ResponsiveChartWrapper>
        {isMobile && structureData.length > 8 && (
          <div className="mt-4 text-xs text-center text-muted-foreground">
            Showing top 8 structures. View on desktop for all {structureData.length} structures.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StructuresChart;
