import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReportsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">System Reports</h1>
      <Tabs defaultValue="performance" className="w-full">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
        </TabsList>
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p>System performance metrics and analytics will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="usage">
            <Card>
              <CardHeader>
                <CardTitle>Usage Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p>System usage statistics and trends will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="audit">
            <Card>
              <CardHeader>
                <CardTitle>Audit Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p>System audit logs and compliance reports will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}