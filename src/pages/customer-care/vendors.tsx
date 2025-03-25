import { VendorManagement } from "@/components/customer-care/VendorManagement";
import { Card } from "@/components/ui/card";

const VendorManagementPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Vendor Management</h1>
      <Card className="p-4">
        <VendorManagement />
      </Card>
    </div>
  );
};

export default VendorManagementPage;