
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltipContent, 
  ChartTooltip,
  ChartLegend,
  ChartLegendContent 
} from "@/components/ui/chart";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import dataService from "@/services/DataService";
import { LayoutDashboard } from "lucide-react";
import { getAllOptions } from "@/utils/filterOptions";

const Dashboard = () => {
  // Get all data needed for charts
  const products = dataService.getAllProducts();
  const companies = dataService.getAllCompanies();

  // Prepare data for task distribution
  const taskData = getAllOptions('category').map(category => ({
    name: category,
    value: products.filter(p => p.category === category).length
  }));

  // Prepare data for anatomical location distribution
  const locationData = getAllOptions('anatomicalLocation').map(location => ({
    name: location,
    value: products.filter(p => p.anatomicalLocation?.includes(location)).length
  }));

  // Prepare data for modality distribution
  const modalityData = getAllOptions('modality').map(modality => ({
    name: modality || 'Unknown',
    value: products.filter(p => p.modality === modality).length
  }));

  // Prepare data for company products
  const companyData = companies
    .map(company => ({
      name: company.name,
      value: products.filter(p => p.company === company.name).length
    }))
    .sort((a, b) => b.value - a.value);

  // Custom colors with better contrast and readability
  const COLORS = [
    '#0EA5E9',   // Bright Ocean Blue
    '#8B5CF6',   // Vivid Purple
    '#10B981',   // Emerald Green
    '#F43F5E',   // Vibrant Red
    '#F59E0B',   // Amber
  ];

  // Custom label formatter for pie chart
  const renderCustomizedLabel = ({ name, percent }) => {
    return `${name} (${(percent * 100).toFixed(0)}%)`;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <LayoutDashboard className="h-6 w-6 text-[#00A6D6]" />
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tasks Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Products by Task</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]" config={{}}>
              <BarChart data={taskData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#00A6D6" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Anatomical Location Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Products by Location</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[400px]" config={{}}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={locationData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={renderCustomizedLabel}
                  >
                    {locationData.map((entry, index) => (
                      <Cell 
                        key={entry.name} 
                        fill={COLORS[index % COLORS.length]} 
                        stroke="var(--background)"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    wrapperStyle={{ 
                      paddingTop: '10px',
                      fontSize: '12px',
                      color: 'var(--muted-foreground)'
                    }}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Modality Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Products by Modality</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]" config={{}}>
              <BarChart data={modalityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#00A6D6" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Company Products */}
        <Card>
          <CardHeader>
            <CardTitle>Products by Company</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]" config={{}}>
              <BarChart layout="vertical" data={companyData}>
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#00A6D6" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
