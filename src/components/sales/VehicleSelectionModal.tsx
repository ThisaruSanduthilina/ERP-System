import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getInventoryItems } from "@/services/inventoryService";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface VehicleSelectionModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (vehicle: any) => void;
}

export const VehicleSelectionModal = ({ open, onClose, onSelect }: VehicleSelectionModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: vehicles = [], isLoading, error } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => getInventoryItems(0, 100),
    enabled: open,
    retry: 1,
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching inventory:', error);
      },
    },
  });

  const filteredVehicles = vehicles.filter(vehicle =>
    Object.values({
      make: vehicle.make,
      model: vehicle.model,
      stock_no: vehicle.stock_no,
      colour: vehicle.colour,
      registration_year: vehicle.registration_year,
    }).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Vehicle from Inventory</DialogTitle>
          <DialogDescription>
            Choose a vehicle from the available inventory
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by make, model, stock number..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-auto flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            </div>
          ) : error ? (
            <Alert variant="destructive" className="mx-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error instanceof Error ? error.message : 'Failed to load inventory items'}
              </AlertDescription>
            </Alert>
          ) : filteredVehicles.length === 0 ? (
            <div className="text-center p-8 text-gray-500">
              No vehicles found matching your search
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stock No.</TableHead>
                  <TableHead>Make</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>VIN</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow 
                    key={vehicle.id}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      onSelect({
                        stockNo: vehicle.stock_no,
                        make: vehicle.make,
                        model: vehicle.model,
                        year: vehicle.registration_year,
                        color: vehicle.colour,
                        price: vehicle.price,
                        vin: vehicle.chassis_number,
                        image_url: vehicle.image_url
                      });
                      onClose();
                    }}
                  >
                    <TableCell>{vehicle.stock_no}</TableCell>
                    <TableCell>{vehicle.make}</TableCell>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell>{vehicle.registration_year}</TableCell>
                    <TableCell>{vehicle.colour}</TableCell>
                    <TableCell>${vehicle.price?.toLocaleString()}</TableCell>
                    <TableCell className="font-mono">{vehicle.chassis_number}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};