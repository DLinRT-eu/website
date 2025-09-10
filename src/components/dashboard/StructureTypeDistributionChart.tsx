import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StructureTypeData {
  productName: string;
  companyName: string;
  OARs: number;
  Targets: number;
  Elective: number;
  total: number;
}

interface StructureTypeDistributionChartProps {
  structureTypeData: StructureTypeData[];
}

const StructureTypeDistributionChart: React.FC<StructureTypeDistributionChartProps> = ({ structureTypeData }) => {
  // Calculate totals for the title
  const totals = structureTypeData.reduce((acc, curr) => ({
    OARs: acc.OARs + curr.OARs,
    Targets: acc.Targets + curr.Targets,
    Elective: acc.Elective + curr.Elective
  }), { OARs: 0, Targets: 0, Elective: 0 });

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Structure Type Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">
          Total structures by type: {totals.OARs} OARs, {totals.Targets} Targets, {totals.Elective} Elective
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={structureTypeData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="productName"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={80}
              />
              <YAxis />
              <Tooltip 
                formatter={(value: number, name: string) => [value, name]}
                labelFormatter={(label, payload) => {
                  if (payload && payload.length > 0) {
                    const data = payload[0].payload;
                    return `${data.companyName} - ${data.productName}`;
                  }
                  return `Product: ${label}`;
                }}
              />
              <Legend />
              <Bar dataKey="OARs" stackId="a" fill="#3b82f6" name="OARs" />
              <Bar dataKey="Targets" stackId="a" fill="#ef4444" name="Targets" />
              <Bar dataKey="Elective" stackId="a" fill="#8b5cf6" name="Elective" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StructureTypeDistributionChart;
