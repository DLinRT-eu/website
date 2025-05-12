
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleCheck, Clock, PercentCircle, Package } from 'lucide-react';

interface RevisionSummaryCardsProps {
  totalProducts: number;
  productsNeedingRevision: number;
  revisionPercentage: number;
  averageDaysSinceRevision: number;
}

const RevisionSummaryCards: React.FC<RevisionSummaryCardsProps> = ({
  totalProducts,
  productsNeedingRevision,
  revisionPercentage,
  averageDaysSinceRevision
}) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProducts}</div>
          <p className="text-xs text-muted-foreground">
            Products in the database
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Up-to-Date</CardTitle>
          <PercentCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{revisionPercentage}%</div>
          <p className="text-xs text-muted-foreground">
            Products with recent updates
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Need Revision</CardTitle>
          <CircleCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{productsNeedingRevision}</div>
          <p className="text-xs text-muted-foreground">
            Products pending update
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Age</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageDaysSinceRevision} days</div>
          <p className="text-xs text-muted-foreground">
            Since last revision
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevisionSummaryCards;
