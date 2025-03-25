import { useState } from "react";
import { SalesManagement } from "@/components/SalesManagement";
import { OrdersTable } from "@/components/sales/OrdersTable";
import { createOrder, OrderData, getOrders } from "@/services/orderService";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

const SalesOrdersPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      try {
        const data = await getOrders(0, 100);
        console.log('Fetched orders:', data);
        return data;
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch orders. Please try again later.",
        });
        return []; // Return empty array instead of throwing
      }
    },
  });

  const handleCreateOrder = async (orderData: OrderData) => {
    try {
      setIsSubmitting(true);
      const response = await createOrder(orderData);
      console.log('Created order:', response);
      toast({
        title: "Success",
        description: "Order created successfully",
      });
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create order",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Sales Orders</h1>
      <SalesManagement onSubmit={handleCreateOrder} isSubmitting={isSubmitting} />
      <div className="mt-8">
        <OrdersTable orders={orders} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default SalesOrdersPage;