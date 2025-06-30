
import React, { useState, useEffect, useMemo } from 'react';
import { subDays, format } from 'date-fns';
import analyticsTracker from '@/services/analytics';
import { DailyVisitData } from '@/services/analytics/types';
import AnalyticsSummaryCards from '@/components/analytics/AnalyticsSummaryCards';
import VisitorTrafficChart from '@/components/analytics/VisitorTrafficChart';
import TopPagesTable from '@/components/analytics/TopPagesTable';
import DateRangeSelector from '@/components/analytics/DateRangeSelector';
import ChartViewSelector from '@/components/analytics/ChartViewSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import SEO from '@/components/SEO';

const Analytics = () => {
  const [dateRange, setDateRange] = useState({
    startDate: subDays(new Date(), 30),
    endDate: new Date()
  });
  const [chartView, setChartView] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [analyticsData, setAnalyticsData] = useState<Record<string, DailyVisitData>>({});

  // Load analytics data
  useEffect(() => {
    const startDateStr = format(dateRange.startDate, 'yyyy-MM-dd');
    const endDateStr = format(dateRange.endDate, 'yyyy-MM-dd');
    const data = analyticsTracker.getAnalytics(startDateStr, endDateStr);
    setAnalyticsData(data);
  }, [dateRange]);

  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    const totalVisits = Object.values(analyticsData).reduce((sum, day) => sum + day.totalVisits, 0);
    const uniqueVisitors = Object.values(analyticsData).reduce((sum, day) => sum + day.uniqueVisitors, 0);
    
    return {
      totalVisits,
      uniqueVisitors
    };
  }, [analyticsData]);

  // Prepare chart data
  const chartData = useMemo(() => {
    return Object.values(analyticsData)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(day => ({
        date: day.date,
        visits: day.totalVisits,
        uniqueVisitors: day.uniqueVisitors
      }));
  }, [analyticsData]);

  // Get top pages
  const topPages = useMemo(() => {
    const startDateStr = format(dateRange.startDate, 'yyyy-MM-dd');
    const endDateStr = format(dateRange.endDate, 'yyyy-MM-dd');
    return analyticsTracker.getTopPages(startDateStr, endDateStr, 10);
  }, [dateRange]);

  return (
    <>
      <SEO 
        title="Analytics - Deep Learning in Radiotherapy"
        description="Website analytics and traffic insights for Deep Learning in Radiotherapy platform"
        keywords="analytics, traffic, website statistics, page views, visitors"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-[#00A6D6]" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">Track website traffic and user engagement</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ChartViewSelector chartView={chartView} setChartView={setChartView} />
            <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
          </div>
        </div>

        {/* Summary Cards */}
        <AnalyticsSummaryCards
          totalVisits={summaryMetrics.totalVisits}
          uniqueVisitors={summaryMetrics.uniqueVisitors}
          dateRange={dateRange}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Traffic Chart */}
          <VisitorTrafficChart chartData={chartData} />
          
          {/* Top Pages */}
          <TopPagesTable topPages={topPages} />
        </div>

        {/* Privacy Notice */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Privacy Notice</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This analytics data is stored locally in your browser and does not use cookies or send data to external servers. 
              All visitor tracking is anonymous and privacy-focused.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Analytics;
