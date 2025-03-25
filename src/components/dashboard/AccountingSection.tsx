import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, FileText, AlertTriangle, DollarSign, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const AccountingSection = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-purple-900">Accounting Overview</h2>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => navigate("/accounting/automated-entries")}
        >
          <FileText className="h-4 w-4" />
          View All Entries
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Automated Entries</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">24</div>
            <p className="text-xs text-blue-600 mt-1">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">AI Detections</CardTitle>
            <Brain className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">3</div>
            <p className="text-xs text-purple-600 mt-1">Discrepancies found</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Pending Reviews</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">7</div>
            <p className="text-xs text-amber-600 mt-1">Require attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Monthly Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">$45,892</div>
            <p className="text-xs text-emerald-600 mt-1">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 p-4"
          onClick={() => navigate("/accounting/automated-entries")}
        >
          <FileText className="h-4 w-4" />
          Manage Automated Entries
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 p-4"
          onClick={() => navigate("/accounting/discrepancy-detection")}
        >
          <Brain className="h-4 w-4" />
          View AI Discrepancy Detection
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 p-4"
          onClick={() => navigate("/accounting/chart-of-accounts")}
        >
          <BookOpen className="h-4 w-4" />
          Chart of Accounts
        </Button>
      </div>
    </div>
  );
};
