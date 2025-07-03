import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, RefreshCw } from 'lucide-react';
import DateRangeSelector from '@/components/analytics/DateRangeSelector';
import ChartViewSelector from '@/components/analytics/ChartViewSelector';

interface AnalyticsHeaderProps {
  chartView: 'daily' | 'weekly' | 'monthly';
  setChartView: (view: 'daily' | 'weekly' | 'monthly') => void;
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  setDateRange: (range: { startDate: Date; endDate: Date }) => void;
  loading: boolean;
  onRefresh: () => void;
}

export const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({
  chartView,
  setChartView,
  dateRange,
  setDateRange,
  loading,
  onRefresh
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div className="flex items-center space-x-3">
        <BarChart3 className="h-8 w-8 text-[#00A6D6]" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Track website traffic and user engagement</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <Button 
          onClick={onRefresh}
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
  );
};