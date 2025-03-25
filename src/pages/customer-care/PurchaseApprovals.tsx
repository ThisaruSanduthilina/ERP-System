import { PurchaseApprovals } from "@/components/customer-care/PurchaseApprovals";
import { Card } from "@/components/ui/card";

const PurchaseApprovalsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Purchase Approvals</h1>
      <Card className="p-4">
        <PurchaseApprovals />
      </Card>
    </div>
  );
};

export default PurchaseApprovalsPage;