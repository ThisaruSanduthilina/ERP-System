import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Calendar, AlertCircle, Clock } from "lucide-react";

interface MaintenanceStatsProps {
  records: {
    status: string;
  }[];
}

export const MaintenanceStats = ({ records }: MaintenanceStatsProps) => {
  // Count records by status
  const getStatusCount = (status: string) => {
    return records.filter(r => r.status.toLowerCase() === status.toLowerCase()).length;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="h-[140px]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-500 flex items-center gap-2">
            <Check className="h-4 w-4" />
            Completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {getStatusCount("completed")}
          </p>
        </CardContent>
      </Card>

      <Card className="h-[140px]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-500 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            In Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {getStatusCount("in progress")}
          </p>
        </CardContent>
      </Card>

      <Card className="h-[140px]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-yellow-500 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Pending
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {getStatusCount("pending")}
          </p>
        </CardContent>
      </Card>

      <Card className="h-[140px]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-red-500 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Overdue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {getStatusCount("overdue")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};