import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getShippingOrders } from "@/services/shippingService";
import { ShippingOrderList } from "@/components/shipping/ShippingOrderList";
import { ShippingOrderForm } from "@/components/shipping/ShippingOrderForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ShippingPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  const { data: shippingOrders, isLoading, error } = useQuery({
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

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-900">Shipping Management</h1>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Shipping Order
        </Button>
      </div>

      {showAddForm && (
        <ShippingOrderForm 
          onClose={() => setShowAddForm(false)}
        />
      )}

      <ShippingOrderList 
        orders={shippingOrders || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ShippingPage;