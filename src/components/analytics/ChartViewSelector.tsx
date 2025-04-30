
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChartViewSelectorProps {
  chartView: 'daily' | 'weekly' | 'monthly';
  setChartView: (view: 'daily' | 'weekly' | 'monthly') => void;
}

const ChartViewSelector: React.FC<ChartViewSelectorProps> = ({ chartView, setChartView }) => {
  return (
    <Select 
      value={chartView} 
      onValueChange={(value) => setChartView(value as 'daily' | 'weekly' | 'monthly')}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="View" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="daily">Daily</SelectItem>
        <SelectItem value="weekly">Weekly</SelectItem>
        <SelectItem value="monthly">Monthly</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ChartViewSelector;
