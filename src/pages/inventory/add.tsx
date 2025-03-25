import { VehicleInventory } from "@/components/inventory/VehicleInventory";
import { Box } from "lucide-react";

const AddInventoryPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Box className="h-6 w-6 text-purple-600" />
        <h1 className="text-2xl font-bold text-purple-900">Add Inventory Item</h1>
      </div>
      <VehicleInventory />
    </div>
  );
};

export default AddInventoryPage;