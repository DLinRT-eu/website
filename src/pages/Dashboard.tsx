
import React, { useState, useEffect } from 'react';
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
import { LayoutDashboard, Filter, RefreshCcw } from "lucide-react";
import { getAllOptions } from "@/utils/filterOptions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductDetails } from '@/types/productDetails';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [selectedTask, setSelectedTask] = useState<string>("all");
  const [structureData, setStructureData] = useState<{name: string, value: number}[]>([]);
  const [clickedTask, setClickedTask] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Get all data needed for charts
  const products = dataService.getAllProducts();
  const companies = dataService.getAllCompanies();

  // Get filtered products based on selected task
  const filteredProducts = selectedTask === "all" 
    ? products 
    : products.filter(p => p.category === selectedTask);

  // Get all available tasks/categories
  const allTasks = getAllOptions('category');

  // Prepare data for task distribution
  const taskData = getAllOptions('category').map(category => ({
    name: category,
    value: products.filter(p => p.category === category).length,
    isSelected: category === clickedTask,
    fill: category === clickedTask ? '#F43F5E' : '#00A6D6'  // Directly set the fill based on selection
  }));

  // Total product count
  const totalProducts = products.length;

  // Prepare data for anatomical location distribution
  const locationData = getAllOptions('anatomicalLocation').map(location => ({
    name: location,
    value: filteredProducts.filter(p => p.anatomicalLocation?.includes(location)).length
  })).filter(item => item.value > 0);
  
  const totalLocations = locationData.reduce((sum, item) => sum + item.value, 0);

  // Prepare data for modality distribution
  const modalityData = getAllOptions('modality').map(modality => ({
    name: modality || 'Unknown',
    value: filteredProducts.filter(p => {
      if (Array.isArray(p.modality)) {
        return p.modality.includes(modality);
      }
      return p.modality === modality;
    }).length
  })).filter(item => item.value > 0);
  
  const totalModalities = modalityData.reduce((sum, item) => sum + item.value, 0);

  // Prepare data for company products
  const companyData = companies
    .map(company => ({
      name: company.name,
      value: filteredProducts.filter(p => p.company === company.name).length
    }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);
  
  const totalCompanies = companyData.length;

  // Update structure data when task changes
  useEffect(() => {
    if (selectedTask === "Auto-Contouring") {
      // Get all auto-contouring products
      const autoContouringProducts = products.filter(p => p.category === "Auto-Contouring");
      
      // Extract and count all supported structures
      const structureCounts: Record<string, number> = {};
      autoContouringProducts.forEach((product: ProductDetails) => {
        if (product.supportedStructures && product.supportedStructures.length > 0) {
          product.supportedStructures.forEach(structure => {
            // Extract the structure name (after the colon)
            const structureName = structure.split(":")[1]?.trim() || structure;
            structureCounts[structureName] = (structureCounts[structureName] || 0) + 1;
          });
        }
      });
      
      // Convert to chart data format
      const structureChartData = Object.entries(structureCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 15); // Take top 15 structures for readability
        
      setStructureData(structureChartData);
    } else {
      setStructureData([]);
    }
  }, [selectedTask]);

  // Handle task bar click
  const handleTaskBarClick = (data: any) => {
    const taskName = data.name;
    if (taskName === clickedTask) {
      // If clicking the same task again, reset filter
      setSelectedTask("all");
      setClickedTask(null);
      toast({
        description: "Filter reset to show all products",
      });
    } else {
      // Update selected task
      setSelectedTask(taskName);
      setClickedTask(taskName);
      toast({
        description: `Now showing only ${taskName} products`,
      });
    }
  };

  // Handle reset filter button click
  const handleResetFilter = () => {
    setSelectedTask("all");
    setClickedTask(null);
    toast({
      description: "Filter reset to show all products",
    });
  };

  // Custom colors with better contrast and readability
  const COLORS = [
    '#0EA5E9',   // Bright Ocean Blue
    '#8B5CF6',   // Vivid Purple
    '#10B981',   // Emerald Green
    '#F43F5E',   // Vibrant Red
    '#F59E0B',   // Amber
    '#EC4899',   // Pink
    '#14B8A6',   // Teal
    '#6366F1',   // Indigo
    '#EF4444',   // Red
    '#84CC16',   // Lime
  ];

  // Custom label formatter for pie chart
  const renderCustomizedLabel = ({ name, percent }) => {
    return `${name} (${(percent * 100).toFixed(0)}%)`;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-[#00A6D6]" />
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          {selectedTask !== "all" && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleResetFilter}
              className="flex items-center gap-1"
            >
              <RefreshCcw className="h-4 w-4" /> Reset
            </Button>
          )}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <Select 
              value={selectedTask} 
              onValueChange={setSelectedTask}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by task" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                {allTasks.map(task => (
                  <SelectItem key={task} value={task}>{task}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tasks Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Products by Task ({totalProducts} total)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]" config={{}}>
              <BarChart data={taskData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="value" 
                  fill="#00A6D6" 
                  onClick={handleTaskBarClick} 
                  cursor="pointer"
                  fillOpacity={0.9}
                  // Use the fill property from each data item instead of fillFunction
                />
              </BarChart>
            </ChartContainer>
            <div className="mt-4 text-sm text-muted-foreground text-center">
              Click on any bar to filter by task
            </div>
          </CardContent>
        </Card>

        {/* Anatomical Location Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Products by Location ({totalLocations} total) {selectedTask !== "all" ? `(${selectedTask})` : ""}</CardTitle>
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
            <CardTitle>Products by Modality ({totalModalities} total) {selectedTask !== "all" ? `(${selectedTask})` : ""}</CardTitle>
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
            <CardTitle>Products by Company ({totalCompanies} companies) {selectedTask !== "all" ? `(${selectedTask})` : ""}</CardTitle>
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
        
        {/* Auto-Contouring Structures - Only shown when Auto-Contouring is selected */}
        {selectedTask === "Auto-Contouring" && structureData.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Supported Structures in Auto-Contouring Products ({structureData.length} structures)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[400px]" config={{}}>
                <BarChart data={structureData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#8B5CF6" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
