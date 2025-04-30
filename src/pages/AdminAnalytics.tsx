
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, UserCircle2, Eye, Clock } from "lucide-react";
import { format } from "date-fns";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Line, LineChart, TooltipProps } from "recharts";
import analyticsService from '@/services/AnalyticsService';
import SEO from '@/components/SEO';

// Define a type for our chart data point
type ChartDataPoint = {
  date: string;
  visits: number;
  uniqueVisitors: number;
};

// Define a type for the tooltip payload item
interface ChartTooltipItem {
  dataKey: string;
  value: number;
  color: string;
  payload: ChartDataPoint;
}

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState<any>({});
  const [topPages, setTopPages] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    endDate: new Date()
  });
  const [chartView, setChartView] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  
  // Format data for charts
  const formatChartData = () => {
    const data = analyticsService.getAnalytics(
      dateRange.startDate.toISOString().split('T')[0],
      dateRange.endDate.toISOString().split('T')[0]
    );
    
    setAnalyticsData(data);
    
    // Get top pages
    const topPagesData = analyticsService.getTopPages(
      dateRange.startDate.toISOString().split('T')[0],
      dateRange.endDate.toISOString().split('T')[0]
    );
    setTopPages(topPagesData);
  };

  // Initial load and when date range changes
  useEffect(() => {
    formatChartData();
  }, [dateRange]);

  // Transform data for charts based on date grouping
  const getChartData = () => {
    const chartData = Object.entries(analyticsData).map(([date, dayData]: [string, any]) => ({
      date,
      visits: dayData.totalVisits,
      uniqueVisitors: dayData.uniqueVisitors
    }));
    
    // Sort by date
    chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return chartData;
  };

  const chartData = getChartData();
  
  // Calculate totals
  const getTotalVisits = () => {
    return Object.values(analyticsData).reduce((sum: number, day: any) => sum + day.totalVisits, 0);
  };
  
  const getTotalUniqueVisitors = () => {
    return Object.values(analyticsData).reduce((sum: number, day: any) => sum + day.uniqueVisitors, 0);
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return format(date, "MMM dd, yyyy");
  };

  return (
    <div className="container mx-auto p-6">
      <SEO
        title="Admin Analytics"
        description="Private analytics dashboard showing visitor statistics"
        canonical="https://dlinrt.eu/analytics"
        noindex={true} // Hide from search engines
      />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Analytics Dashboard</h1>
        
        <div className="flex flex-wrap gap-2">
          {/* Date range selector */}
          <div className="flex items-center space-x-2">
            <Popover open={startOpen} onOpenChange={setStartOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatDate(dateRange.startDate)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateRange.startDate}
                  onSelect={(date) => {
                    if (date) {
                      setDateRange(prev => ({ ...prev, startDate: date }));
                      setStartOpen(false);
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <span>to</span>
            <Popover open={endOpen} onOpenChange={setEndOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatDate(dateRange.endDate)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateRange.endDate}
                  onSelect={(date) => {
                    if (date) {
                      setDateRange(prev => ({ ...prev, endDate: date }));
                      setEndOpen(false);
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* View selector */}
          <Select 
            value={chartView} 
            onValueChange={(value) => setChartView(value as 'daily' | 'weekly' | 'monthly')}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2 text-[#00A6D6]" />
              <span className="text-2xl font-bold">{getTotalVisits()}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unique Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UserCircle2 className="h-4 w-4 mr-2 text-[#00A6D6]" />
              <span className="text-2xl font-bold">{getTotalUniqueVisitors()}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Date Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2 text-[#00A6D6]" />
              <span className="text-sm font-medium">
                {formatDate(dateRange.startDate)} - {formatDate(dateRange.endDate)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Visits Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
      </div>
      
      {/* Top Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
          <CardDescription>Most visited pages and average time spent</CardDescription>
        </CardHeader>
        <CardContent>
          {topPages.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead className="w-[100px] text-right">Visits</TableHead>
                  <TableHead className="w-[150px] text-right">Avg. Time (sec)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPages.map((page, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {page.path === '/' ? 'Home' : page.title}
                    </TableCell>
                    <TableCell className="text-right">{page.visits}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        {page.avgDuration}s
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-muted-foreground py-8">No page data available for the selected period</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
