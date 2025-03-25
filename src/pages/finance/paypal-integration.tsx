import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PayPalIntegrationPage() {
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "PayPal integration settings have been updated successfully.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">PayPal Integration</h1>
      
      <Tabs defaultValue="settings" className="w-full">
        <TabsList>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="sync">Data Sync</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>PayPal API Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-20rem)]">
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="clientId">Client ID</Label>
                      <Input 
                        id="clientId" 
                        placeholder="Enter your PayPal Client ID"
                        className="bg-white"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="secretKey">Secret Key</Label>
                      <Input 
                        id="secretKey" 
                        type="password"
                        placeholder="Enter your PayPal Secret Key"
                        className="bg-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="environment">Environment</Label>
                      <select 
                        id="environment" 
                        className="w-full rounded-md border border-input bg-white px-3 py-2"
                      >
                        <option value="sandbox">Sandbox (Testing)</option>
                        <option value="production">Production (Live)</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="webhookUrl">Webhook URL</Label>
                      <Input 
                        id="webhookUrl" 
                        readOnly
                        value="https://your-domain.com/api/paypal/webhook"
                        className="bg-gray-50"
                      />
                    </div>
                  </div>

                  <Button 
                    type="button"
                    onClick={handleSaveSettings}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Save Settings
                  </Button>
                </form>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Sync</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-medium text-purple-900">Last Sync Status</h3>
                  <p className="text-sm text-purple-600">Last successful sync: Never</p>
                </div>

                <Button className="bg-purple-600 hover:bg-purple-700">
                  Sync Transactions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync">
          <Card>
            <CardHeader>
              <CardTitle>Data Synchronization Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="autoSync" className="rounded border-gray-300" />
                  <Label htmlFor="autoSync">Enable Automatic Sync</Label>
                </div>

                <div>
                  <Label htmlFor="syncInterval">Sync Interval</Label>
                  <select 
                    id="syncInterval" 
                    className="w-full rounded-md border border-input bg-white px-3 py-2"
                    disabled
                  >
                    <option value="15">Every 15 minutes</option>
                    <option value="30">Every 30 minutes</option>
                    <option value="60">Every hour</option>
                    <option value="daily">Once a day</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}