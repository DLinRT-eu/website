
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Shield } from 'lucide-react';

interface ProgressCardProps {
  completedChecks: number;
  totalChecks: number;
  passedChecks: number;
  warnings: number;
  failures: number;
  estimatedTimeRemaining: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  completedChecks,
  totalChecks,
  passedChecks,
  warnings,
  failures,
  estimatedTimeRemaining
}) => {
  const progressPercentage = (completedChecks / totalChecks) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Review Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {completedChecks} of {totalChecks} checks completed
            </span>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-green-50">
                <CheckCircle className="w-3 h-3 mr-1" />
                {passedChecks} Passed
              </Badge>
              <Badge variant="outline" className="bg-yellow-50">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {warnings} Warnings
              </Badge>
              <Badge variant="outline" className="bg-red-50">
                <Shield className="w-3 h-3 mr-1" />
                {failures} Failures
              </Badge>
            </div>
          </div>
          <Progress value={progressPercentage} className="w-full" />
          <div className="text-sm text-muted-foreground">
            Estimated time remaining: {estimatedTimeRemaining} minutes
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
