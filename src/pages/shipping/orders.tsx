import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getShippingOrders } from "@/services/shippingService";
import { ShippingOrderList } from "@/components/shipping/ShippingOrderList";
import { ShippingOrderForm } from "@/components/shipping/ShippingOrderForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ShippingOrder } from "@/types/shipping";

const ITEMS_PER_PAGE = 10;

const ShippingOrdersPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const { data: allShippingOrders, isLoading } = useQuery({
    queryKey: ['shipping-orders'],
    queryFn: getShippingOrders,
    meta: {
      onError: (error: Error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    }
  });

  // Calculate metrics
  const calculateMetrics = (orders: ShippingOrder[] = []) => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === "Pending").length;
    const confirmedOrders = orders.filter(order => order.status === "Confirmed").length;
    const totalCost = orders.reduce((sum, order) => sum + (order.shipping_cost || 0), 0);
    const averageCost = totalOrders > 0 ? totalCost / totalOrders : 0;
    const uniqueCountries = new Set(orders.map(order => order.country)).size;

    return {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      averageCost,
      uniqueCountries
    };
  };

  const metrics = calculateMetrics(allShippingOrders);

  // Client-side pagination
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOrders = allShippingOrders ? allShippingOrders.slice(startIndex, endIndex) : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil((allShippingOrders?.length || 0) / ITEMS_PER_PAGE);
  const canGoNext = currentPage < totalPages;
  const canGoPrevious = currentPage > 1;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-900">Shipping Orders</h1>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Shipping Order
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.pendingOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.confirmedOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.averageCost)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.uniqueCountries}</div>
          </CardContent>
        </Card>
      </div>

      {showAddForm && (
        <ShippingOrderForm 
          onClose={() => setShowAddForm(false)}
        />
      )}

      <ShippingOrderList 
        orders={currentOrders}
        isLoading={isLoading}
      />

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {canGoPrevious ? (
              <PaginationPrevious 
                onClick={() => handlePageChange(currentPage - 1)}
                href="#"
              />
            ) : (
              <PaginationPrevious 
                className="pointer-events-none opacity-50"
                href="#"
              />
            )}
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive href="#">{currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            {canGoNext ? (
              <PaginationNext 
                onClick={() => handlePageChange(currentPage + 1)}
                href="#"
              />
            ) : (
              <PaginationNext 
                className="pointer-events-none opacity-50"
                href="#"
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ShippingOrdersPage;