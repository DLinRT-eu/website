
import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Area,
  AreaChart
} from 'recharts';
import { ProductDetails } from '@/types/productDetails';

interface TimelineChartProps {
  data: Array<{
    period: string;
    date: Date;
    count: number;
    products: ProductDetails[];
    [key: string]: any;
  }>;
  granularity: "monthly" | "quarterly" | "yearly";
  products: ProductDetails[];
}

const TimelineChart: React.FC<TimelineChartProps> = ({ data, granularity, products }) => {
  const categories = [...new Set(products.map(p => p.category))];
  
  const colors = [
    '#00A6D6', '#2563eb', '#dc2626', '#ea580c', '#65a30d', 
    '#7c3aed', '#db2777', '#0891b2', '#4338ca', '#059669'
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    const data = payload[0]?.payload;
    if (!data) return null;

    return (
      <div className="bg-white p-4 border rounded-lg shadow-lg">
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        <p className="text-sm text-gray-600 mb-2">
          Total Products Released: <span className="font-medium">{data.count}</span>
        </p>
        {data.products?.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-700">Released Products:</p>
            {data.products.slice(0, 5).map((product: ProductDetails, idx: number) => (
              <p key={idx} className="text-xs text-gray-600">
                • {product.name} ({product.company})
              </p>
            ))}
            {data.products.length > 5 && (
              <p className="text-xs text-gray-500">
                ... and {data.products.length - 5} more
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-500">
        <div className="text-center">
          <p className="text-lg font-medium">No data available</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00A6D6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#00A6D6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="period" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#00A6D6"
            strokeWidth={2}
            fill="url(#totalGradient)"
            name="Products Released"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Category breakdown chart */}
      {categories.length > 1 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Release Timeline by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="period" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              {categories.map((category, index) => (
                <Line
                  key={category}
                  type="monotone"
                  dataKey={category}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name={category}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default TimelineChart;
