import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getShippingOrders, getShipmentLocations } from "@/services/shippingService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShipmentUpdateForm } from "@/components/shipping/ShipmentUpdateForm";
import { ShipmentLocationHistory } from "@/components/shipping/ShipmentLocationHistory";
import { TrackingSearch } from "@/components/shipping/tracking/TrackingSearch";
import { ShipmentDetails } from "@/components/shipping/tracking/ShipmentDetails";
import { ShipmentMetrics } from "@/components/shipping/tracking/ShipmentMetrics";

const TrackingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searchedShipment, setSearchedShipment] = useState<any>(null);
  const { toast } = useToast();

  const { data: shipments = [] } = useQuery({
    queryKey: ['shipping-orders'],
    queryFn: getShippingOrders,
  });

  const { data: locations = [] } = useQuery({
    queryKey: ['shipment-locations', searchedShipment?.id],
    queryFn: () => searchedShipment ? getShipmentLocations(searchedShipment.id) : Promise.resolve([]),
    enabled: !!searchedShipment,
  });

  const handleTrackingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a tracking number",
      });
      return;
    }

    const foundShipment = shipments.find(s => s.stock_number === trackingNumber);
    if (foundShipment) {
      setSearchedShipment(foundShipment);
      toast({
        title: "Success",
        description: "Shipment found",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Not Found",
        description: "No shipment found with this tracking number",
      });
      setSearchedShipment(null);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900 dark:text-white">
        Shipment Tracking
      </h1>
      
      <TrackingSearch
        trackingNumber={trackingNumber}
        setTrackingNumber={setTrackingNumber}
        handleTrackingSearch={handleTrackingSearch}
      />

      {searchedShipment && (
        <>
          <ShipmentDetails shipment={searchedShipment} />

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Location History</CardTitle>
            </CardHeader>
            <CardContent>
              <ShipmentLocationHistory locations={locations} />
            </CardContent>
          </Card>
        </>
      )}

      <ShipmentUpdateForm />
      <ShipmentMetrics shipments={shipments} />
    </div>
  );
};

export default TrackingPage;