import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VendorManagement } from "@/components/customer-care/VendorManagement";
import { PurchaseApprovals } from "@/components/customer-care/PurchaseApprovals";
import { RealTimeMetrics } from "@/components/customer-care/RealTimeMetrics";
import { PurchaseHistory } from "@/components/customer-care/PurchaseHistory";

const CustomerCareDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Customer Care Dashboard</h1>
      
      <RealTimeMetrics />
      
      <Tabs defaultValue="history" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="approvals">Purchase Approvals</TabsTrigger>
          <TabsTrigger value="vendors">Vendor Management</TabsTrigger>
          <TabsTrigger value="history">Purchase History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="approvals">
          <Card className="p-4">
            <PurchaseApprovals />
          </Card>
        </TabsContent>
        
        <TabsContent value="vendors">
          <Card className="p-4">
            <VendorManagement />
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="p-4">
            <PurchaseHistory />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerCareDashboard;