import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoiceManagement } from "@/components/backoffice/InvoiceManagement";
import { CostCalculator } from "@/components/backoffice/CostCalculator";
import { BackofficeReports } from "@/components/backoffice/BackofficeReports";

const BackOfficePage = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">BackOffice Management</h1>
      
      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="costs">Cost Calculator</TabsTrigger>
          <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <InvoiceManagement />
        </TabsContent>

        <TabsContent value="costs">
          <CostCalculator />
        </TabsContent>

        <TabsContent value="reports">
          <BackofficeReports />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackOfficePage;