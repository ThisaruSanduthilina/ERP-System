import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MaintenanceRecord } from "@/services/maintenanceService";
import { useState } from "react";
import { VehicleSelectionModal } from "@/components/sales/VehicleSelectionModal";
import { Search } from "lucide-react";

interface MaintenanceFormFieldsProps {
  formData: Partial<MaintenanceRecord>;
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
}

export const MaintenanceFormFields = ({ formData, errors, onChange }: MaintenanceFormFieldsProps) => {
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const handleVehicleSelect = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    onChange("inventory_item_id", parseInt(vehicle.stockNo));
  };

  return (
    <>
      <div className="space-y-2">
        <Label>Vehicle</Label>
        <div className="flex gap-2">
          <Input
            value={selectedVehicle ? `${selectedVehicle.make} ${selectedVehicle.model} (${selectedVehicle.stockNo})` : ''}
            placeholder="Select a vehicle"
            readOnly
            className="bg-gray-50"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsVehicleModalOpen(true)}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
        {errors.inventory_item_id && (
          <p className="text-sm text-red-500">{errors.inventory_item_id}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Date</Label>
        <Input
          type="date"
          value={formData.date?.split('T')[0]}
          onChange={(e) => onChange("date", e.target.value)}
        />
        {errors.date && (
          <p className="text-sm text-red-500">{errors.date}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Cost</Label>
        <Input
          type="number"
          value={formData.cost || ''}
          onChange={(e) => onChange("cost", parseFloat(e.target.value))}
          placeholder="Enter maintenance cost"
        />
        {errors.cost && (
          <p className="text-sm text-red-500">{errors.cost}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value: "Pending" | "In Progress" | "Completed") => onChange("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          placeholder="Enter maintenance description..."
          className="h-32"
          onChange={(e) => onChange("description", e.target.value)}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <VehicleSelectionModal
        open={isVehicleModalOpen}
        onClose={() => setIsVehicleModalOpen(false)}
        onSelect={handleVehicleSelect}
      />
    </>
  );
};