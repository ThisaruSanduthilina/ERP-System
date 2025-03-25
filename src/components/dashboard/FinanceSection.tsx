import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, CreditCard, PiggyBank } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const FinanceSection = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Revenue Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Monthly Revenue</span>
                <span className="text-sm font-medium">$45,000</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Quarterly Target</span>
                <span className="text-sm font-medium">$120,000 / $150,000</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Financial Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-700">Profit Margin</p>
                <p className="text-sm text-green-600">+15% from last month</p>
              </div>
              <p className="text-xl font-bold text-green-700">24%</p>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-700">Operating Costs</p>
                <p className="text-sm text-blue-600">-3% from last month</p>
              </div>
              <p className="text-xl font-bold text-blue-700">$28K</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="h-5 w-5" />
            Budget Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-purple-700">Marketing</span>
                <span className="text-sm text-purple-600">$12,000 / $15,000</span>
              </div>
              <Progress value={80} className="h-2" indicatorClassName="bg-purple-500" />
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-orange-700">Operations</span>
                <span className="text-sm text-orange-600">$28,000 / $35,000</span>
              </div>
              <Progress value={85} className="h-2" indicatorClassName="bg-orange-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};