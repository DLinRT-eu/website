
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
import { Button } from '@/components/ui/button';
import { BarChart3, Trash2, Shield, RefreshCw } from 'lucide-react';
import { isTrackingAllowed } from '@/services/analytics/storageUtils';
import { getCookieConsent } from '@/utils/cookieUtils';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/SEO';

const Analytics = () => {
  const [dateRange, setDateRange] = useState({
    startDate: subDays(new Date(), 30),
    endDate: new Date()
  });
  const [chartView, setChartView] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [analyticsData, setAnalyticsData] = useState<Record<string, DailyVisitData>>({});
  const [topPages, setTopPages] = useState<any[]>([]);
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
    // Trigger a re-fetch by updating the effect dependency
    setDateRange({ ...dateRange });
  };

  const trackingEnabled = isTrackingAllowed();
  const consent = getCookieConsent();

  return (
    <>
      <SEO 
        title="Analytics - Deep Learning in Radiotherapy"
        description="Website analytics and traffic insights for Deep Learning in Radiotherapy platform"
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
            <Button 
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <ChartViewSelector chartView={chartView} setChartView={setChartView} />
            <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
          </div>
        </div>

        {/* Tracking Status Alert */}
        {!trackingEnabled && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-yellow-800">
                <Shield className="h-5 w-5" />
                <p className="text-sm">
                  Analytics tracking is currently disabled. To see new data, please accept analytics cookies in your cookie preferences.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            <span>Loading analytics data...</span>
          </div>
        )}

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

        {/* GDPR Compliance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Privacy Notice */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy & GDPR Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  This analytics data is stored securely in our database and uses cookies only with your explicit consent. 
                  All visitor tracking is anonymous and privacy-focused.
                </p>
                <p>
                  <strong>Data retention:</strong> Maximum 1 year<br/>
                  <strong>Cookie consent:</strong> {consent?.analytics ? 'Granted' : 'Not granted'}<br/>
                  <strong>Consent date:</strong> {consent?.timestamp ? new Date(consent.timestamp).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Your Data Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                You have the right to delete your analytics data at any time. This action is irreversible.
              </p>
              <Button 
                onClick={handleClearData}
                variant="outline"
                className="w-full flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                disabled={loading}
              >
                <Trash2 className="h-4 w-4" />
                Clear All Analytics Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Analytics;
