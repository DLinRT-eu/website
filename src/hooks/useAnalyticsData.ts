import React, { useState, useEffect, useMemo } from 'react';
import { subDays, format } from 'date-fns';
import analyticsTracker from '@/services/analytics';
import { DailyVisitData, TopPageData } from '@/services/analytics/types';
import { useToast } from '@/hooks/use-toast';

export const useAnalyticsData = () => {
  const [dateRange, setDateRange] = useState({
    startDate: subDays(new Date(), 30),
    endDate: new Date()
  });
  const [chartView, setChartView] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [analyticsData, setAnalyticsData] = useState<Record<string, DailyVisitData>>({});
  const [topPages, setTopPages] = useState<TopPageData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load analytics data
  useEffect(() => {
    const loadAnalyticsData = async () => {
      setLoading(true);
      try {
        const startDateStr = format(dateRange.startDate, 'yyyy-MM-dd');
        const endDateStr = format(dateRange.endDate, 'yyyy-MM-dd');
        
        const [data, pages] = await Promise.all([
          analyticsTracker.getAnalytics(startDateStr, endDateStr),
          analyticsTracker.getTopPages(startDateStr, endDateStr, 10)
        ]);
        
        setAnalyticsData(data);
        setTopPages(pages);
      } catch (error) {
        console.error('Error loading analytics data:', error);
        toast({
          title: "Error Loading Data",
          description: "Failed to load analytics data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadAnalyticsData();
  }, [dateRange, toast]);

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

  const handleClearData = async () => {
    try {
      await analyticsTracker.clearAnalytics();
      setAnalyticsData({});
      setTopPages([]);
      toast({
        title: "Analytics Data Cleared",
        description: "All analytics data has been deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear analytics data. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleRefresh = () => {
    setDateRange({ ...dateRange });
  };

  return {
    // State
    dateRange,
    setDateRange,
    chartView,
    setChartView,
    loading,
    topPages,
    
    // Computed data
    summaryMetrics,
    chartData,
    
    // Actions
    handleClearData,
    handleRefresh
  };
};