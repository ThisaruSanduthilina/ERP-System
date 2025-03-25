import { DashboardMetrics } from "@/components/DashboardMetrics";
import { DashboardCharts } from "@/components/DashboardCharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleInventory } from "@/components/VehicleInventory";
import { SalesManagement } from "@/components/SalesManagement";
import { Button } from "@/components/ui/button";
import { Users, PhoneCall, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomerSection } from "@/components/dashboard/CustomerSection";
import { ServiceSection } from "@/components/dashboard/ServiceSection";
import { FinanceSection } from "@/components/dashboard/FinanceSection";
import { AccountingSection } from "@/components/dashboard/AccountingSection";
import { FinancialGoals } from "@/components/dashboard/FinancialGoals";
import { useAuth } from "@/contexts/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { createOrder, OrderData } from "@/services/orderService";
import { useToast } from "@/hooks/use-toast";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isAccountingUser = user?.role === "accounting" || user?.role === "admin";

  const handleCreateOrder = async (orderData: OrderData) => {
    try {
      setIsSubmitting(true);
      await createOrder(orderData);
      toast({
        title: "Success",
        description: "Order created successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create order",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 w-full md:w-auto"
            onClick={() => navigate("/service")}
          >
            <PhoneCall className="h-4 w-4" />
            Service Center
          </Button>
          <h1 className="text-2xl font-bold text-purple-900">Dashboard</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 w-full md:w-auto"
            onClick={() => navigate("/customers/database")}
          >
            <Users className="h-4 w-4" />
            Customer Relations
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 w-full md:w-auto"
            onClick={() => navigate("/finance")}
          >
            <DollarSign className="h-4 w-4" />
            Finance
          </Button>
        </div>
      </div>
      
      <DashboardMetrics />
      <DashboardCharts />
      <FinancialGoals />

      <ScrollArea className="w-full">
        <Tabs defaultValue="service" className="space-y-4">
          <TabsList className="bg-white/50 backdrop-blur-sm flex flex-wrap md:flex-nowrap">
            <TabsTrigger value="service">Service Center</TabsTrigger>
            <TabsTrigger value="inventory">Vehicle Inventory</TabsTrigger>
            <TabsTrigger value="sales">Sales Management</TabsTrigger>
            <TabsTrigger value="customers">Customer Relations</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
            {isAccountingUser && <TabsTrigger value="accounting">Accounting</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="service" className="space-y-4">
            <ServiceSection />
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <VehicleInventory />
          </TabsContent>
          
          <TabsContent value="sales" className="space-y-4">
            <SalesManagement onSubmit={handleCreateOrder} isSubmitting={isSubmitting} />
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <CustomerSection />
          </TabsContent>

          <TabsContent value="finance" className="space-y-4">
            <FinanceSection />
          </TabsContent>

          {isAccountingUser && (
            <TabsContent value="accounting" className="space-y-4">
              <AccountingSection />
            </TabsContent>
          )}
        </Tabs>
      </ScrollArea>
    </div>
  );
};

export default DashboardPage;
