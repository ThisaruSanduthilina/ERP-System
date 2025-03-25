import { Box, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InventoryList } from "@/components/inventory/InventoryList";

const inventory = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Box className="h-6 w-6 text-purple-600" />
          <h1 className="text-2xl font-bold text-purple-900">Inventory List</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
            <Input placeholder="Search inventory..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>
      <InventoryList />
    </div>
  );
};

export default inventory;