import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ReviewDashboardAlertsProps {
  criticalCount: number;
  overdueCount: number;
}

export const ReviewDashboardAlerts: React.FC<ReviewDashboardAlertsProps> = ({
  criticalCount,
  overdueCount
}) => {
  return (
    <>
      {criticalCount > 0 && (
        <Alert variant="destructive">
          <AlertTitle>Critical Issues Found</AlertTitle>
          <AlertDescription>
            {criticalCount} products have critical issues that require immediate review.
          </AlertDescription>
        </Alert>
      )}

      {overdueCount > 0 && (
        <Alert>
          <AlertTitle>Review Status</AlertTitle>
          <AlertDescription>
            {overdueCount} products are overdue for review ({'>'}12 months).
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};