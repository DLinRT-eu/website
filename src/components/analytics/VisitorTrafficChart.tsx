
import React from 'react';
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Line } from "recharts";

// Define types for chart data
type ChartDataPoint = {
  date: string;
  visits: number;
  uniqueVisitors: number;
};

// Define type for tooltip items
interface ChartTooltipItem {
  dataKey: string;
  value: number;
  color: string;
  payload: ChartDataPoint;
}

interface VisitorTrafficChartProps {
  chartData: ChartDataPoint[];
}

const VisitorTrafficChart: React.FC<VisitorTrafficChartProps> = ({ chartData }) => {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Visitor Traffic</CardTitle>
        <CardDescription>Total page views vs unique visitors</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            visits: { label: "Total Visits", color: "#00A6D6" },
            uniqueVisitors: { label: "Unique Visitors", color: "#22C55E" }
          }}
          className="aspect-[4/2]"
        >
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <XAxis
                dataKey="date"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return format(date, "MMM dd");
                }}
                stroke="#888888"
              />
              <YAxis stroke="#888888" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const date = new Date(payload[0].payload.date);
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="font-medium">{format(date, "MMM dd, yyyy")}</div>
                        {payload.map((item: ChartTooltipItem) => (
                          <div
                            key={item.dataKey}
                            className="flex items-center gap-2"
                          >
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="font-medium text-muted-foreground">
                              {item.dataKey === "visits"
                                ? "Total Visits"
                                : "Unique Visitors"}
                              :
                            </span>
                            <span>{item.value}</span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#00A6D6"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="uniqueVisitors"
                stroke="#22C55E"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default VisitorTrafficChart;
