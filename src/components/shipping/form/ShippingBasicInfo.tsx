import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShipType, Forwarder, FreightType, ShippingStatus } from "@/types/shipping";
import { getFreightForwarders } from "@/services/freightForwarderService";

interface ShippingBasicInfoProps {
  formData: {
    soNumber: string;
    stockNumber: string;
    shipType: ShipType;
    forwarder: Forwarder;
    freightType: FreightType;
    freightForwarderId?: number;
    bookingStatus: ShippingStatus;
  };
  setFormData: (data: any) => void;
}

export const ShippingBasicInfo = ({ formData, setFormData }: ShippingBasicInfoProps) => {
  const { data: forwarders } = useQuery({
    queryKey: ['freight-forwarders'],
    queryFn: () => getFreightForwarders(),
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="soNumber">Tracking Number</Label>
        <Input
          id="soNumber"
          value={formData.soNumber}
          onChange={(e) => setFormData({ ...formData, soNumber: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="stockNumber">Stock Number</Label>
        <Input
          id="stockNumber"
          value={formData.stockNumber}
          onChange={(e) => setFormData({ ...formData, stockNumber: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bookingStatus">Status</Label>
        <Select
          value={formData.bookingStatus}
          onValueChange={(value: ShippingStatus) => setFormData({ ...formData, bookingStatus: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Asking">Asking</SelectItem>
            <SelectItem value="Booking Waiting">Booking Waiting</SelectItem>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="Canceled">Canceled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="shipType">Ship Type</Label>
        <Select
          value={formData.shipType}
          onValueChange={(value: ShipType) => setFormData({ ...formData, shipType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select ship type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="RoRo">RoRo</SelectItem>
            <SelectItem value="Container">Container</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="freightForwarder">Freight Forwarder</Label>
        <Select
          value={formData.freightForwarderId?.toString()}
          onValueChange={(value) => setFormData({ ...formData, freightForwarderId: parseInt(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select freight forwarder" />
          </SelectTrigger>
          <SelectContent>
            {forwarders?.map((forwarder) => (
              <SelectItem key={forwarder.id} value={forwarder.id.toString()}>
                {forwarder.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="freightType">Freight Type</Label>
        <Select
          value={formData.freightType}
          onValueChange={(value: FreightType) => setFormData({ ...formData, freightType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select freight type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Prepaid">Prepaid</SelectItem>
            <SelectItem value="Collect">Collect</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};