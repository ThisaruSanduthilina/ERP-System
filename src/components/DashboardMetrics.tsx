import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, Users, ShoppingBag, Warehouse } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "@/services/customerService";
import { getInventoryItems } from "@/services/inventoryService";
import { getFreightForwarders } from "@/services/freightForwarderService";
import { getOrders } from "@/services/orderService";
import { Skeleton } from "@/components/ui/skeleton";

export const DashboardMetrics = () => {
  const { data: customers, isLoading: isLoadingCustomers, error: customerError } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers({ skip: 0, limit: 100 }),
  });

  const { data: inventory, isLoading: isLoadingInventory, error: inventoryError } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => getInventoryItems(0, 100),
  });

  const { data: forwarders, isLoading: isLoadingForwarders, error: forwardersError } = useQuery({
    queryKey: ['freight-forwarders'],
    queryFn: () => getFreightForwarders(),
  });

  const { data: orders, isLoading: isLoadingOrders, error: ordersError } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(0, 100),
  });

  const renderCustomerCount = () => {
    if (isLoadingCustomers) {
      return (
        <>
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-32 mt-1" />
        </>
      );
    }

    if (customerError) {
      return (
        <>
          <div className="text-2xl font-heading font-bold text-gray-800">Error</div>
          <p className="text-xs font-sans text-red-500 mt-1">Failed to load customers</p>
        </>
      );
    }

    const customerCount = customers?.length || 0;
    return (
      <>
        <div className="text-2xl font-heading font-bold text-gray-800 animate-scale-in">
          {customerCount}
        </div>
        <p className="text-xs font-sans text-emerald-500 mt-1 animate-fade-in">
          +12% from last month
        </p>
      </>
    );
  };

  const renderInventoryCount = () => {
    if (isLoadingInventory) {
      return (
        <>
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-32 mt-1" />
        </>
      );
    }

    if (inventoryError) {
      return (
        <>
          <div className="text-2xl font-heading font-bold text-gray-800">Error</div>
          <p className="text-xs font-sans text-red-500 mt-1">Failed to load inventory</p>
        </>
      );
    }

    const inventoryCount = inventory?.length || 0;
    return (
      <>
        <div className="text-2xl font-heading font-bold text-gray-800 animate-scale-in">
          {inventoryCount}
        </div>
        <p className="text-xs font-sans text-emerald-500 mt-1 animate-fade-in">
          +3 new this week
        </p>
      </>
    );
  };

  const renderForwardersCount = () => {
    if (isLoadingForwarders) {
      return (
        <>
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-32 mt-1" />
        </>
      );
    }

    if (forwardersError) {
      return (
        <>
          <div className="text-2xl font-heading font-bold text-gray-800">Error</div>
          <p className="text-xs font-sans text-red-500 mt-1">Failed to load forwarders</p>
        </>
      );
    }

    const forwardersCount = forwarders?.length || 0;
    return (
      <>
        <div className="text-2xl font-heading font-bold text-gray-800 animate-scale-in">
          {forwardersCount}
        </div>
        <p className="text-xs font-sans text-emerald-500 mt-1 animate-fade-in">
          Active partnerships
        </p>
      </>
    );
  };

  const renderSalesCount = () => {
    if (isLoadingOrders) {
      return (
        <>
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-32 mt-1" />
        </>
      );
    }

    if (ordersError) {
      return (
        <>
          <div className="text-2xl font-heading font-bold text-gray-800">Error</div>
          <p className="text-xs font-sans text-red-500 mt-1">Failed to load orders</p>
        </>
      );
    }

    const orderCount = orders?.length || 0;
    const totalRevenue = orders?.reduce((sum, order) => sum + order.total, 0) || 0;
    const formattedRevenue = (totalRevenue / 1000000).toFixed(2);

    return (
      <>
        <div className="text-2xl font-heading font-bold text-gray-800 animate-scale-in">
          ${formattedRevenue}M
        </div>
        <p className="text-xs font-sans text-emerald-500 mt-1 animate-fade-in">
          From {orderCount} orders
        </p>
      </>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-none shadow-sm rounded-2xl transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-2 animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-heading font-semibold text-gray-700">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-violet-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            {renderCustomerCount()}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-100 to-fuchsia-50 border-none shadow-sm rounded-2xl transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-heading font-semibold text-gray-700">Total Products</CardTitle>
            <ShoppingBag className="h-4 w-4 text-violet-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            {renderInventoryCount()}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-none shadow-sm rounded-2xl transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-heading font-semibold text-gray-700">Total Suppliers</CardTitle>
            <Warehouse className="h-4 w-4 text-violet-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            {renderForwardersCount()}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-none shadow-sm rounded-2xl transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-heading font-semibold text-gray-700">Total Sales</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-violet-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            {renderSalesCount()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
