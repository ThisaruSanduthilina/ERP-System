import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2, Save } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "@/services/customerService";

const initialEarningsData = [
  { month: "Apr", earnings: 1800 },
  { month: "May", earnings: 2000 },
  { month: "Jun", earnings: 1900 },
  { month: "Jul", earnings: 2100 },
  { month: "Aug", earnings: 2000 },
  { month: "Sep", earnings: 2400 },
];

export const EarningsChart = () => {
  const [earningsData, setEarningsData] = useState(initialEarningsData);
  const [isEditing, setIsEditing] = useState(false);
  const [tempEarnings, setTempEarnings] = useState(initialEarningsData);

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers({ skip: 0, limit: 100 }),
  });

  // Calculate total earnings based on customer balances
  const totalEarnings = customers?.reduce((total, customer) => total + (customer.balance || 0), 0) || 0;

  // Update earnings data with real customer data
  const currentMonth = new Date().getMonth();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth - i + 12) % 12;
    return {
      month: monthNames[monthIndex],
      earnings: Math.round(totalEarnings / (i + 1)), // Distribute earnings across months
    };
  }).reverse();

  // Generate chart title based on data range
  const startMonth = lastSixMonths[0].month;
  const endMonth = lastSixMonths[lastSixMonths.length - 1].month;
  const chartTitle = `Customer Balance Overview: ${startMonth} - ${endMonth} (Total: $${totalEarnings.toLocaleString()})`;

  const handleInputChange = (month: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setTempEarnings(prev => 
      prev.map(item => 
        item.month === month ? { ...item, earnings: numValue } : item
      )
    );
  };

  const handleSave = () => {
    setEarningsData(tempEarnings);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setTempEarnings(earningsData);
    setIsEditing(true);
  };

  return (
    <Card className="bg-white border-none shadow-sm rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-heading font-semibold text-gray-700">
          {chartTitle}
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={isEditing ? handleSave : handleEdit}
          className="h-8 w-8"
        >
          {isEditing ? (
            <Save className="h-4 w-4 text-gray-600" />
          ) : (
            <Edit2 className="h-4 w-4 text-gray-600" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={isEditing ? tempEarnings : lastSixMonths}>
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              domain={['dataMin - 200', 'dataMax + 200']}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="#8B5CF6"
              fillOpacity={1}
              fill="url(#colorEarnings)"
            />
          </AreaChart>
        </ResponsiveContainer>

        {isEditing && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {tempEarnings.map((item) => (
              <div key={item.month} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{item.month}</label>
                <Input
                  type="number"
                  value={item.earnings}
                  onChange={(e) => handleInputChange(item.month, e.target.value)}
                  className="h-8"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};