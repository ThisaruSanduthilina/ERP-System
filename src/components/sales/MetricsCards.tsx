import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricsCardsProps {
  totalRevenue: number;
  orderCount: number;
  averageOrderValue: number;
  utilizationRate: string | number;
}

export const MetricsCards = ({
  totalRevenue,
  orderCount,
  averageOrderValue,
  utilizationRate,
}: MetricsCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${(totalRevenue / 1000000).toFixed(2)}M
          </div>
          <p className="text-xs text-muted-foreground">
            Total: ${totalRevenue.toLocaleString()} from {orderCount} orders
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${averageOrderValue.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Per order</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inventory Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{utilizationRate}%</div>
          <p className="text-xs text-muted-foreground">
            Orders vs Inventory
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{orderCount}</div>
          <p className="text-xs text-muted-foreground">All time orders</p>
        </CardContent>
      </Card>
    </div>
  );
};