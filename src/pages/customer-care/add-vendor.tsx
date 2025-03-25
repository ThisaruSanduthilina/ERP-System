import { Card } from "@/components/ui/card";
import { AddVendorForm } from "@/components/customer-care/AddVendorForm";

const AddVendorPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Add New Vendor</h1>
      <Card className="p-4">
        <AddVendorForm />
      </Card>
    </div>
  );
};

export default AddVendorPage;