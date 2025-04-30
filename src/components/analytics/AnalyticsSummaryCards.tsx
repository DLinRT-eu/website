
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle2, Eye, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface AnalyticsSummaryCardsProps {
  totalVisits: number;
  uniqueVisitors: number;
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
}

const AnalyticsSummaryCards: React.FC<AnalyticsSummaryCardsProps> = ({ 
  totalVisits, 
  uniqueVisitors, 
  dateRange 
}) => {
  // Format date for display
  const formatDate = (date: Date) => {
    return format(date, "MMM dd, yyyy");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Visits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-2 text-[#00A6D6]" />
            <span className="text-2xl font-bold">{totalVisits}</span>
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
            <span className="text-2xl font-bold">{uniqueVisitors}</span>
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
  );
};

export default AnalyticsSummaryCards;
