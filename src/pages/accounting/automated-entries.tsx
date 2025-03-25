import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { FileText, AlertTriangle } from "lucide-react";

export default function AutomatedEntriesPage() {
  const { toast } = useToast();

  const handleValidation = () => {
    toast({
      title: "Validation Complete",
      description: "All entries have been validated successfully.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Automated Cost Entries</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Automated Entry Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Rule Name</Label>
              <Input placeholder="Enter rule name" />
            </div>
            <div className="space-y-2">
              <Label>Matching Criteria</Label>
              <Input placeholder="Define criteria" />
            </div>
            <Button className="w-full">Add Rule</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Validation Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Validation Threshold (%)</Label>
              <Input type="number" placeholder="Enter threshold" />
            </div>
            <Button onClick={handleValidation} className="w-full">
              Run Validation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}