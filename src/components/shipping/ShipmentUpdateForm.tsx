import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export const ShipmentUpdateForm = () => {
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleUpdateShipment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber || !location || !status) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    try {
      console.log('Updating shipment status with:', {
        stock_number: trackingNumber,
        current_location: location,
        status: status
      });

      // First update shipment status
      const updateResponse = await fetch(`${process.env.VITE_API_URL}/shipments/update-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          stock_number: trackingNumber,
          current_location: location,
          status: status
        }),
      });

      const updateData = await updateResponse.json();
      
      if (!updateResponse.ok) {
        console.error('Update response error:', updateData);
        throw new Error(updateData.detail || 'Failed to update shipment status');
      }

      console.log('Successfully updated shipment status:', updateData);

      // Then create shipment location history
      const locationResponse = await fetch(`${process.env.VITE_API_URL}/shipment_locations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          shipment_id: trackingNumber,
          location: location,
          date: new Date().toISOString(),
          status: status
        }),
      });

      const locationData = await locationResponse.json();

      if (!locationResponse.ok) {
        console.error('Location response error:', locationData);
        throw new Error(locationData.detail || 'Failed to create location history');
      }

      console.log('Successfully created location history:', locationData);

      // Invalidate and refetch shipping orders query
      await queryClient.invalidateQueries({ queryKey: ['shipping-orders'] });
      await queryClient.invalidateQueries({ queryKey: ['shipment-locations'] });

      toast({
        title: "Success",
        description: "Shipment details and location updated successfully",
      });

      // Reset form
      setTrackingNumber("");
      setLocation("");
      setStatus("");
    } catch (error) {
      console.error('Error updating shipment:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update shipment details",
      });
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Update Shipment Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdateShipment} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tracking Number</label>
            <Input
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Location</label>
            <Input
              placeholder="Enter current location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select onValueChange={setStatus} value={status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Update Shipment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};