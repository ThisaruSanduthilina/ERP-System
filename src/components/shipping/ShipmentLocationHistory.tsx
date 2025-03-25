import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface ShipmentLocation {
  id: number;
  shipment_id: number;
  location: string;
  date: string;
  status: string;
}

interface ShipmentLocationHistoryProps {
  locations: ShipmentLocation[];
}

export const ShipmentLocationHistory = ({ locations }: ShipmentLocationHistoryProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editLocation, setEditLocation] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleEdit = (location: ShipmentLocation) => {
    setEditingId(location.id);
    setEditLocation(location.location);
    setEditStatus(location.status);
  };

  const handleUpdate = async (locationId: number) => {
    try {
      const response = await fetch(`${process.env.VITE_API_URL}/shipment_locations/${locationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          location: editLocation,
          status: editStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update location');
      }

      await queryClient.invalidateQueries({ queryKey: ['shipment-locations'] });
      
      toast({
        title: "Success",
        description: "Location updated successfully",
      });

      setEditingId(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update location",
      });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditLocation("");
    setEditStatus("");
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2">Location History</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map((location) => (
            <TableRow key={location.id}>
              <TableCell>{format(new Date(location.date), 'PPP')}</TableCell>
              <TableCell>
                {editingId === location.id ? (
                  <Input
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full"
                  />
                ) : (
                  location.location
                )}
              </TableCell>
              <TableCell>
                {editingId === location.id ? (
                  <Select value={editStatus} onValueChange={setEditStatus}>
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
                ) : (
                  location.status
                )}
              </TableCell>
              <TableCell>
                {editingId === location.id ? (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleUpdate(location.id)}
                      variant="default"
                      size="sm"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => handleEdit(location)}
                    variant="outline"
                    size="sm"
                  >
                    Edit
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
          {locations.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                No location history found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};