
import React from 'react';

interface LegendItem {
  name: string;
  color: string;
}

interface ChartLegendProps {
  items: LegendItem[];
}

const ChartLegend: React.FC<ChartLegendProps> = ({ items }) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-xs text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartLegend;
