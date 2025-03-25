import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createShippingOrder } from "@/services/shippingService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShipType, Forwarder, FreightType, ShippingStatus } from "@/types/shipping";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShippingBasicInfo } from "./form/ShippingBasicInfo";
import { ShippingPortInfo } from "./form/ShippingPortInfo";
import { ShippingPartyInfo } from "./form/ShippingPartyInfo";
import { ShippingCostInfo } from "./form/ShippingCostInfo";

interface ShippingOrderFormProps {
  onClose: () => void;
}

export const ShippingOrderForm = ({ onClose }: ShippingOrderFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    soNumber: "",
    stockNumber: "",
    bookingStatus: "Pending" as ShippingStatus,
    shipType: "RoRo" as ShipType,
    forwarder: "FWT" as Forwarder,
    freightType: "Prepaid" as FreightType,
    freightForwarderId: undefined as number | undefined,
    pol: "",
    pod: "",
    etd: "",
    eta: "",
    consignor: "",
    consignee: "",
    notify: "",
    vessel: "",
    voyageNo: "",
    shippingCost: 0,
    insurance: 0,
    country: ""
  });

  const createMutation = useMutation({
    mutationFn: createShippingOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipping-orders'] });
      toast({
        title: "Success",
        description: "Shipping order created successfully",
      });
      onClose();
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.freightForwarderId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a freight forwarder",
      });
      return;
    }

    createMutation.mutate({
      stock_number: formData.stockNumber,
      status: formData.bookingStatus,
      country: formData.country,
      etd: formData.etd,
      shipping_cost: formData.shippingCost,
      insurance: formData.insurance,
      freight_forwarder_id: formData.freightForwarderId,
    });
  };

  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Create Shipping Order</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ShippingBasicInfo formData={formData} setFormData={setFormData} />
              <ShippingPortInfo formData={formData} setFormData={setFormData} />
              <ShippingPartyInfo formData={formData} setFormData={setFormData} />
              <ShippingCostInfo formData={formData} setFormData={setFormData} />
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-purple-600 hover:bg-purple-700"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? "Creating..." : "Create Order"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};