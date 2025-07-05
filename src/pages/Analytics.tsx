import React from 'react';
import { RefreshCw } from 'lucide-react';
import AnalyticsSummaryCards from '@/components/analytics/AnalyticsSummaryCards';
import VisitorTrafficChart from '@/components/analytics/VisitorTrafficChart';
import TopPagesTable from '@/components/analytics/TopPagesTable';
import { AnalyticsHeader } from '@/components/analytics/AnalyticsHeader';
import { AnalyticsStatusCard } from '@/components/analytics/AnalyticsStatusCard';
import { AnalyticsGDPRSection } from '@/components/analytics/AnalyticsGDPRSection';
import { isTrackingAllowed } from '@/services/analytics/storageUtils';
import { getCookieConsent } from '@/utils/cookieUtils';
import { useAnalyticsData } from '@/hooks/useAnalyticsData';
import SEO from '@/components/SEO';

const Analytics = () => {
  const {
    dateRange,
    setDateRange,
    chartView,
    setChartView,
    loading,
    topPages,
    summaryMetrics,
    chartData,
    handleClearData,
    handleRefresh
  } = useAnalyticsData();

  const trackingEnabled = isTrackingAllowed();
  const consent = getCookieConsent();

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Website Analytics & Traffic Insights - DLinRT Deep Learning Platform"
        description="Comprehensive analytics dashboard showing website traffic, user engagement, and page performance metrics for the Deep Learning in Radiotherapy platform. Monitor visitor trends and popular content."
      />
      
      <div className="container mx-auto px-4 md:px-8 py-8">
        <AnalyticsHeader
          chartView={chartView}
          setChartView={setChartView}
          dateRange={dateRange}
          setDateRange={setDateRange}
          loading={loading}
          onRefresh={handleRefresh}
        />

        <AnalyticsStatusCard trackingEnabled={trackingEnabled} />

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Traffic Chart */}
          <VisitorTrafficChart chartData={chartData} />
          
          {/* Top Pages */}
          <TopPagesTable topPages={topPages} />
        </div>

        {/* GDPR Compliance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6">
          <AnalyticsGDPRSection
            consent={consent}
            loading={loading}
            onClearData={handleClearData}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;