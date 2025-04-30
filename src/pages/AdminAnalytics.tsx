
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import analyticsTracker from '@/services/analytics';
import { TopPageData } from '@/services/analytics/types';

// Import refactored components
import DateRangeSelector from '@/components/analytics/DateRangeSelector';
import ChartViewSelector from '@/components/analytics/ChartViewSelector';
import AnalyticsSummaryCards from '@/components/analytics/AnalyticsSummaryCards';
import VisitorTrafficChart from '@/components/analytics/VisitorTrafficChart';
import TopPagesTable from '@/components/analytics/TopPagesTable';

// Define a type for our chart data point
type ChartDataPoint = {
  date: string;
  visits: number;
  uniqueVisitors: number;
};

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState<Record<string, any>>({});
  const [topPages, setTopPages] = useState<TopPageData[]>([]);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    endDate: new Date()
  });
  const [chartView, setChartView] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  
  // Format data for charts
  const formatChartData = () => {
    const data = analyticsTracker.getAnalytics(
      dateRange.startDate.toISOString().split('T')[0],
      dateRange.endDate.toISOString().split('T')[0]
    );
    
    setAnalyticsData(data);
    
    // Get top pages
    const topPagesData = analyticsTracker.getTopPages(
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
  const getChartData = (): ChartDataPoint[] => {
    const chartData = Object.entries(analyticsData).map(([date, dayData]: [string, any]) => ({
      date,
      visits: dayData.totalVisits as number,
      uniqueVisitors: dayData.uniqueVisitors as number
    }));
    
    // Sort by date
    chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return chartData;
  };

  const chartData = getChartData();
  
  // Calculate totals
  const getTotalVisits = () => {
    return Object.values(analyticsData).reduce((sum: number, day: any) => sum + (day.totalVisits as number), 0);
  };
  
  const getTotalUniqueVisitors = () => {
    return Object.values(analyticsData).reduce((sum: number, day: any) => sum + (day.uniqueVisitors as number), 0);
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
          <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
          
          {/* View selector */}
          <ChartViewSelector chartView={chartView} setChartView={setChartView} />
        </div>
      </div>
      
      {/* Summary Cards */}
      <AnalyticsSummaryCards 
        totalVisits={getTotalVisits()} 
        uniqueVisitors={getTotalUniqueVisitors()}
        dateRange={dateRange}
      />
      
      {/* Visits Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <VisitorTrafficChart chartData={chartData} />
      </div>
      
      {/* Top Pages */}
      <TopPagesTable topPages={topPages} />
    </div>
  );
};

export default AdminAnalytics;
