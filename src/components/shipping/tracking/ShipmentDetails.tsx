import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface ShipmentDetailsProps {
  shipment: any;
}

export const ShipmentDetails = ({ shipment }: ShipmentDetailsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Shipment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Tracking Number</p>
            <p className="text-lg">{shipment.stock_number}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Status</p>
            <Badge variant={shipment.status === "Delivered" ? "success" : "warning"}>
              {shipment.status || 'Pending'}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium">Destination Country</p>
            <p className="text-lg">{shipment.country || '-'}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Estimated Delivery Date</p>
            <p className="text-lg">
              {shipment.etd ? format(new Date(shipment.etd), 'PPP') : '-'}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Shipping Cost</p>
            <p className="text-lg">{formatCurrency(shipment.shipping_cost || 0)}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Insurance</p>
            <p className="text-lg">{formatCurrency(shipment.insurance || 0)}</p>
          </div>
          {shipment.freight_forwarder && (
            <div className="col-span-2">
              <p className="text-sm font-medium">Freight Forwarder</p>
              <p className="text-lg">{shipment.freight_forwarder.name || '-'}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};