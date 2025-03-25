import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getInventoryItems } from "@/services/inventoryService";
import { getCustomers } from "@/services/customerService";
import { format, startOfMonth, eachDayOfInterval, subDays } from "date-fns";

export const SalesPurchaseChart = () => {
  const { data: inventory } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => getInventoryItems(0, 100),
  });

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers({ skip: 0, limit: 100 }),
  });

  // Calculate daily data for the last 7 days
  const last7Days = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date(),
  });

  const chartData = last7Days.map(date => {
    // For purchases, count inventory items added on this date
    const dailyPurchases = inventory?.filter(item => {
      const itemDate = new Date(item.created_at || new Date());
      return format(itemDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    }).length || 0;

    // For sales, count customers added on this date
    const dailySales = customers?.filter(customer => {
      const customerDate = new Date(customer.created_at);
      return format(customerDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    }).length || 0;

    // Calculate total value of purchases for the day
    const purchaseValue = inventory
      ?.filter(item => {
        const itemDate = new Date(item.created_at || new Date());
        return format(itemDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
      })
      .reduce((sum, item) => sum + (item.price || 0), 0) || 0;

    return {
      date: format(date, 'MMM dd'),
      sales: dailySales,
      purchases: dailyPurchases,
      purchaseValue,
      isToday: format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'),
    };
  });

  return (
    <Card className="bg-white border-none shadow-sm rounded-2xl">
      <CardHeader>
        <CardTitle className="text-sm font-heading font-semibold text-gray-700">
          Weekly Sales & Purchases Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={({ x, y, payload }) => (
                <text
                  x={x}
                  y={y + 10}
                  fill={payload.value === format(new Date(), 'MMM dd') ? '#6366F1' : '#64748b'}
                  textAnchor="middle"
                  fontSize={payload.value === format(new Date(), 'MMM dd') ? 13 : 12}
                  fontWeight={payload.value === format(new Date(), 'MMM dd') ? 'bold' : 'normal'}
                >
                  {payload.value}
                </text>
              )}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border rounded-lg shadow-lg">
                      <p className="font-semibold">{label}</p>
                      <p className="text-purple-600">
                        Sales: {payload[0].value}
                      </p>
                      <p className="text-emerald-600">
                        Purchases: {payload[1].value}
                      </p>
                      <p className="text-gray-600">
                        Purchase Value: ${payload[2].value.toLocaleString()}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              dot={({ payload }) => (
                <circle
                  cx={0}
                  cy={0}
                  r={payload.isToday ? 4 : 3}
                  fill="#8B5CF6"
                  stroke="#8B5CF6"
                  strokeWidth={payload.isToday ? 2 : 1}
                />
              )}
            />
            <Line 
              type="monotone" 
              dataKey="purchases" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={({ payload }) => (
                <circle
                  cx={0}
                  cy={0}
                  r={payload.isToday ? 4 : 3}
                  fill="#10B981"
                  stroke="#10B981"
                  strokeWidth={payload.isToday ? 2 : 1}
                />
              )}
            />
            <Line 
              type="monotone" 
              dataKey="purchaseValue" 
              stroke="#6366F1" 
              strokeWidth={2}
              dot={({ payload }) => (
                <circle
                  cx={0}
                  cy={0}
                  r={payload.isToday ? 4 : 3}
                  fill="#6366F1"
                  stroke="#6366F1"
                  strokeWidth={payload.isToday ? 2 : 1}
                />
              )}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm font-sans text-gray-600">Sales</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm font-sans text-gray-600">Purchases</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <span className="text-sm font-sans text-gray-600">Purchase Value ($)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};