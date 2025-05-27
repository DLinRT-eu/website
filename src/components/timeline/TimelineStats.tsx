
import React from 'react';
import { Calendar, TrendingUp, Package, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TimelineStatsProps {
  stats: {
    totalProducts: number;
    firstRelease: Date | null;
    lastRelease: Date | null;
    categoryStats: Record<string, number>;
    timeSpan: number;
  };
}

const TimelineStats: React.FC<TimelineStatsProps> = ({ stats }) => {
  const topCategory = Object.entries(stats.categoryStats)
    .sort(([,a], [,b]) => b - a)[0];

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProducts}</div>
          <p className="text-xs text-muted-foreground">
            Products with release dates
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Time Span</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.timeSpan}</div>
          <p className="text-xs text-muted-foreground">
            Years of development
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">First Release</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">{formatDate(stats.firstRelease)}</div>
          <p className="text-xs text-muted-foreground">
            Earliest product launch
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Category</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">
            {topCategory ? topCategory[0] : 'N/A'}
          </div>
          <p className="text-xs text-muted-foreground">
            {topCategory ? `${topCategory[1]} products` : 'No data'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelineStats;
