import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getInventoryItems } from "@/services/inventoryService";
import { getCustomers } from "@/services/customerService";
import { getOrders } from "@/services/orderService";
import { MetricsCards } from "@/components/sales/MetricsCards";
import { TrendCharts } from "@/components/sales/TrendCharts";
import { OrdersTable } from "@/components/sales/OrdersTable";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AnalyticsPage = () => {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  const { data: inventory } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => getInventoryItems(0, 100),
  });

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers({ skip: 0, limit: 100 }),
  });

  const { data: orders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(0, 100),
  });

  // Calculate total revenue and metrics
  const totalRevenue = orders?.reduce((sum, order) => sum + order.total, 0) || 0;
  const orderCount = orders?.length || 0;
  const averageOrderValue = orderCount > 0 ? totalRevenue / orderCount : 0;
  
  // Calculate inventory utilization rate
  const inventoryCount = inventory?.length || 0;
  const utilizationRate = inventoryCount > 0 
    ? ((orderCount / inventoryCount) * 100).toFixed(1) 
    : 0;

  // Calculate order counts by status
  const pendingOrders = orders?.filter(order => order.status === 'Pending') || [];
  const completedOrders = orders?.filter(order => order.status === 'Completed') || [];
  const cancelledOrders = orders?.filter(order => order.status === 'Cancelled') || [];

  // Calculate revenue by status
  const pendingRevenue = pendingOrders.reduce((sum, order) => sum + order.total, 0);
  const completedRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);
  const cancelledRevenue = cancelledOrders.reduce((sum, order) => sum + order.total, 0);

  // Filter orders based on selected status
  const filteredOrders = statusFilter 
    ? orders?.filter(order => order.status === statusFilter)
    : orders;

  const handleOrderUpdated = () => {
    queryClient.invalidateQueries({ queryKey: ['orders'] });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Sales Analytics</h1>

      <MetricsCards
        totalRevenue={totalRevenue}
        orderCount={orderCount}
        averageOrderValue={averageOrderValue}
        utilizationRate={utilizationRate}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">{pendingOrders.length}</div>
            <div className="mt-2 text-sm text-yellow-600">
              Revenue: ${pendingRevenue.toLocaleString()}
            </div>
            <div className="mt-1 text-xs text-yellow-600">
              {((pendingOrders.length / orderCount) * 100).toFixed(1)}% of total orders
            </div>
            <Button 
              onClick={() => setStatusFilter('Pending')}
              variant="outline" 
              className="mt-4 w-full"
            >
              View Pending Orders
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{completedOrders.length}</div>
            <div className="mt-2 text-sm text-green-600">
              Revenue: ${completedRevenue.toLocaleString()}
            </div>
            <div className="mt-1 text-xs text-green-600">
              {((completedOrders.length / orderCount) * 100).toFixed(1)}% of total orders
            </div>
            <Button 
              onClick={() => setStatusFilter('Completed')}
              variant="outline"
              className="mt-4 w-full"
            >
              View Completed Orders
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-red-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cancelled Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{cancelledOrders.length}</div>
            <div className="mt-2 text-sm text-red-600">
              Revenue Lost: ${cancelledRevenue.toLocaleString()}
            </div>
            <div className="mt-1 text-xs text-red-600">
              {((cancelledOrders.length / orderCount) * 100).toFixed(1)}% of total orders
            </div>
            <Button 
              onClick={() => setStatusFilter('Cancelled')}
              variant="outline"
              className="mt-4 w-full"
            >
              View Cancelled Orders
            </Button>
          </CardContent>
        </Card>
      </div>

      {statusFilter && (
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {statusFilter} Orders ({filteredOrders?.length || 0})
          </h2>
          <Button 
            variant="ghost"
            onClick={() => setStatusFilter(null)}
          >
            View All Orders
          </Button>
        </div>
      )}

      <TrendCharts monthlyData={[]} />

      <OrdersTable 
        orders={filteredOrders} 
        isLoading={isLoadingOrders} 
        onOrderUpdated={handleOrderUpdated}
      />
    </div>
  );
};

export default AnalyticsPage;