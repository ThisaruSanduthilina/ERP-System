import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Brain, AlertCircle } from "lucide-react";

export default function DiscrepancyDetectionPage() {
  const { toast } = useToast();

  const handleScan = () => {
    toast({
      title: "AI Scan Initiated",
      description: "Scanning transactions for discrepancies...",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">AI Discrepancy Detection</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Our AI system analyzes transaction patterns and flags potential discrepancies
              based on historical data and defined rules.
            </p>
            <Button onClick={handleScan} className="w-full">
              Start AI Scan
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Detected Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">
              No discrepancies detected in recent transactions.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}